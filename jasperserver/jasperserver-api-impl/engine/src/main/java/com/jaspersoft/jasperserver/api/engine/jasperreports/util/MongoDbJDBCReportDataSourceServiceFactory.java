/*
 * Copyright (C) 2005 - 2014 Jaspersoft Corporation. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased  a commercial license agreement from Jaspersoft,
 * the following license terms  apply:
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License  as
 * published by the Free Software Foundation, either version 3 of  the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero  General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public  License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package com.jaspersoft.jasperserver.api.engine.jasperreports.util;

import com.jaspersoft.jasperserver.api.JSException;
import com.jaspersoft.jasperserver.api.metadata.common.domain.client.FileResourceImpl;
import com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.CustomJdbcReportDataSourceProvider;
import com.jaspersoft.jasperserver.api.engine.jasperreports.service.impl.JdbcDataSourceService;
import com.jaspersoft.jasperserver.api.engine.jasperreports.service.impl.JdbcReportDataSourceServiceFactory;
import com.jaspersoft.jasperserver.api.metadata.common.domain.FileResource;
import com.jaspersoft.jasperserver.api.metadata.common.domain.FileResourceData;
import com.jaspersoft.jasperserver.api.metadata.common.domain.ResourceReference;
import com.jaspersoft.jasperserver.api.metadata.common.service.RepositoryService;
import com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.CustomReportDataSource;
import com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.JdbcReportDataSource;
import com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.ReportDataSource;
import com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.client.JdbcReportDataSourceImpl;
import com.jaspersoft.jasperserver.api.metadata.jasperreports.service.ReportDataSourceService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.sql.DataSource;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.sql.DriverManager;
import java.util.*;

/**
 * Created by IntelliJ IDEA.
 * User: ichan
 * Date: 1/15/15
 * Time: 3:47 PM
 * To change this template use File | Settings | File Templates.
 */
public class MongoDbJDBCReportDataSourceServiceFactory extends JdbcReportDataSourceServiceFactory implements CustomDelegatedDataSourceServiceFactory, CustomJdbcReportDataSourceProvider {

	private static final Log log = LogFactory.getLog(MongoDbJDBCReportDataSourceServiceFactory.class);
    private RepositoryService repositoryService;

    private String schemaDefinitionDirectory;
    private PooledObjectCache jdbcSchemaCache = new PooledObjectCache();
    private int mongoDBJDBCSchemaDefinitionTimeoutInMinute;

    public void setCustomDataSourceDefinition(CustomDataSourceDefinition dsDef) {
        // do nothing
    }

	public ReportDataSourceService createService(ReportDataSource reportDataSource) {
		if (!(reportDataSource instanceof CustomReportDataSource)) {
			throw new JSException("jsexception.invalid.jdbc.datasource", new Object[] {reportDataSource.getClass()});
		}
        JdbcReportDataSource jdbcReportDataSource = getJdbcReportDataSource((CustomReportDataSource) reportDataSource);

		DataSource dataSource = getPoolDataSource(jdbcReportDataSource.getDriverClass(), jdbcReportDataSource.getConnectionUrl(),
                jdbcReportDataSource.getUsername(), jdbcReportDataSource.getPassword());

        String timeZone = ((String) ((CustomReportDataSource) reportDataSource).getPropertyMap().get("timeZone"));
        return new JdbcDataSourceService(dataSource, getTimeZoneByDataSourceTimeZone(timeZone));

	}


	public JdbcReportDataSource getJdbcReportDataSource(CustomReportDataSource customReportDataSource) {
        String driverClass = "tibcosoftware.jdbc.mongodb.MongoDBDriver";
        String url = "jdbc:tibcosoftware:mongodb://";
        String serverAddress = ((String) customReportDataSource.getPropertyMap().get("serverAddress"));
        if (serverAddress != null) serverAddress.trim();
        String portNumber = ((String) customReportDataSource.getPropertyMap().get("portNumber"));
        if (portNumber != null) portNumber.trim();
        url = url + serverAddress + ":"  + portNumber + ";TransactionMode=ignore";

        String userName = ((String) customReportDataSource.getPropertyMap().get("username"));
        String password = ((String) customReportDataSource.getPropertyMap().get("password"));
        String database = ((String) customReportDataSource.getPropertyMap().get("database"));
        String connectionOptions = ((String) customReportDataSource.getPropertyMap().get("connectionOptions"));
        String schemaDefinition = null;

        // read resource from repo
        if ((customReportDataSource.getResources() != null) && (customReportDataSource.getResources().size() >= 1)) {
            ResourceReference resourceReference = customReportDataSource.getResources().get(MongoDbJDBCDataSourceDefinition.DATA_FILE_RESOURCE_ALIAS);

            if (resourceReference.isLocal()) {
                FileResource fileResource = (FileResource) resourceReference.getLocalResource();

                // custom data source has changed.  need to reset local resource
                Date cdsLastUpdateDate = customReportDataSource.getUpdateDate();
                Date fileResourceUpdateDate = fileResource.getUpdateDate();
                if (cdsLastUpdateDate != null && cdsLastUpdateDate.toString() != null && fileResourceUpdateDate != null && fileResourceUpdateDate.toString() != null && cdsLastUpdateDate.after(fileResourceUpdateDate)) resourceReference = null;

            }
            if (resourceReference != null) {
                debug("REPO RESOURCE = " + resourceReference.getReferenceURI());
                debug("MongoDB JDBC directory = " + schemaDefinitionDirectory);
                schemaDefinition = saveResourceToDisk(resourceReference);

            }
        }
        boolean uploadSchemaToRepo = false;
        if (schemaDefinition == null) {
            schemaDefinition = ((String) customReportDataSource.getPropertyMap().get(MongoDbJDBCDataSourceDefinition.FILE_NAME_PROP));
            // reset schemaDefinition for testing
            // schemaDefinition = null;
            // schema file doesn't exist.  create new schema file
            if ((schemaDefinition == null) || schemaDefinition.equals("")) {
                String schemaKey = customReportDataSource.getURIString() + "_" + customReportDataSource.getCreationDate() + "_" + customReportDataSource.getUpdateDate();
                debug("Create MongoDB JBDC Key = " + schemaKey);
                String schemaPrefix = "mongodbJDBC-" + schemaKey.hashCode() + ".";
                File outputLocation = new File(schemaDefinitionDirectory, schemaPrefix + "config");
                schemaDefinition = outputLocation.getAbsolutePath();
                debug("New schema definition location = " + schemaDefinition);
                // bug 44062, upload the mapping file only if it's datasource already in the repo
                uploadSchemaToRepo = isDatasourceInRepo(customReportDataSource);
            }
        }
        debug("Schema Definition on disk = " + schemaDefinition);
        if (userName != null && password != null) url = url + ";User=" + userName + ";Password=" + password;
        if (database != null) url = url + ";DatabaseName=" + database;
        if (schemaDefinition != null) url = url + ";SchemaDefinition=" + schemaDefinition;
        if (connectionOptions != null) url = url + ";" + connectionOptions;

        debug("CONNECT URL = " + url);
        JdbcReportDataSourceImpl jdbcReportDataSource = new JdbcReportDataSourceImpl();
        jdbcReportDataSource.setConnectionUrl(url);
        jdbcReportDataSource.setDriverClass(driverClass);
        jdbcReportDataSource.setPassword(password);
        jdbcReportDataSource.setUsername(userName);
        jdbcReportDataSource.setName(customReportDataSource.getName());

        if (uploadSchemaToRepo) {
            createAndUploadSchemaToRepo(customReportDataSource, jdbcReportDataSource);
        }

		return jdbcReportDataSource;
	}

	/**
	 * Tests if the datasource exists in the repo.
	 */
    private boolean isDatasourceInRepo(CustomReportDataSource customReportDataSource) {
        return customReportDataSource.getCreationDate() != null;
    }

    private void createAndUploadSchemaToRepo(CustomReportDataSource customReportDataSource, JdbcReportDataSourceImpl jdbcReportDataSource) {
        try {
            Class.forName(jdbcReportDataSource.getDriverClass());
            DriverManager.getConnection(jdbcReportDataSource.getConnectionUrl(), jdbcReportDataSource.getUsername(), jdbcReportDataSource.getPassword());
            saveFileToResource(customReportDataSource, jdbcReportDataSource);
        } catch (Exception ex) {
            ex.getStackTrace();
        }

    }


    private void saveFileToResource(CustomReportDataSource customReportDataSource, JdbcReportDataSource jdbcReportDataSource) {
        if ((customReportDataSource.getResources() != null) && (customReportDataSource.getResources().size() >= 1)) return;
        debug("SAVE FILE TO RESOURCE...");
        String diskFile = getPropertyValue(jdbcReportDataSource.getConnectionUrl(), "SchemaDefinition");
        FileResourceImpl fileResourceImpl = new FileResourceImpl();
        fileResourceImpl.setFileType(".config");
        fileResourceImpl.setName(customReportDataSource.getName() + "_SCHEMA");
        fileResourceImpl.setLabel(customReportDataSource.getName() + "_SCHEMA");
        fileResourceImpl.setParentFolder(customReportDataSource.getParentFolder());

        try {
            FileInputStream data = new FileInputStream(diskFile);
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            byte [] buffer = new byte[256];
            int bytesRead = 0;
            while((bytesRead = data.read(buffer)) != -1)
            {
                output.write(buffer, 0, bytesRead);
            }
            output.close();
            data.close();
            fileResourceImpl.setData(output.toByteArray());

        /***
            repositoryService.saveResource(null, fileResourceImpl);
            ResourceReference resourceReference = new ResourceReference(fileResourceImpl.getURI());
        **/
            ResourceReference resourceReference = new ResourceReference(fileResourceImpl);
            HashMap<String, ResourceReference> resources = new HashMap<String, ResourceReference>();
            resources.put(MongoDbJDBCDataSourceDefinition.DATA_FILE_RESOURCE_ALIAS, resourceReference);
            customReportDataSource.setResources(resources);

            repositoryService.saveResource(null, customReportDataSource);
            debug("Custom DS IS SAVED...");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private String saveResourceToDisk(ResourceReference resourceReference) {
        long now = System.currentTimeMillis();
        try {
            String absoluteFileLocation = null;
            InputStream data;

            FileResource fileResource = null;
            if(resourceReference == null) {
                return null;
            }
            if (resourceReference.isLocal()) {
                fileResource = (FileResource) resourceReference.getLocalResource();
            } else {
                fileResource = (FileResource) repositoryService.getResource(null, resourceReference.getReferenceURI(), com.jaspersoft.jasperserver.api.metadata.common.domain.FileResource.class);
            }
            String schemaKey = fileResource.getURIString() + "_" + fileResource.getCreationDate() + "_" + fileResource.getUpdateDate();
            debug("Create MongoDB JBDC Key = " + schemaKey);
            String schemaPrefix = "mongodbJDBC-" + schemaKey.hashCode() + ".";

            File outputLocation = new File(schemaDefinitionDirectory, schemaPrefix + "config");


            // mark virtual data source is in used
            markJDBCSchemaUsed(schemaPrefix, now);

            // if file exists, return existing schema
            if (outputLocation.exists()) return outputLocation.getAbsolutePath();

            debug("Write MongoDB JDBC schema definition = " + outputLocation.getAbsolutePath());

            if (fileResource.hasData()) {
                data = fileResource.getDataStream();
            } else {
                FileResourceData resourceData = repositoryService.getResourceData(null, fileResource.getURIString());
                data = resourceData.getDataStream();
            }

            try {
                FileOutputStream output = new FileOutputStream(outputLocation);

                byte [] buffer = new byte[256];
                int bytesRead = 0;
                while((bytesRead = data.read(buffer)) != -1)
                {
                    output.write(buffer, 0, bytesRead);
                }
                output.close();
                data.close();
                outputLocation.deleteOnExit();
                return outputLocation.getAbsolutePath();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return absoluteFileLocation;
        } finally {
            releaseExpiredPools(now);
        }

    }

    public RepositoryService getRepositoryService() {
        return repositoryService;
    }

    public void setRepositoryService(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }

    public String getSchemaDefinitionDirectory() {
        return schemaDefinitionDirectory;
    }

    public void setSchemaDefinitionDirectory(String schemaDefinitionDirectory) {
        this.schemaDefinitionDirectory = schemaDefinitionDirectory;
    }

    public int getMongoDBJDBCSchemaDefinitionTimeoutInMinute() {
        return mongoDBJDBCSchemaDefinitionTimeoutInMinute;
    }

    public void setMongoDBJDBCSchemaDefinitionTimeoutInMinute(int mongoDBJDBCSchemaDefinitionTimeoutInMinute) {
        this.mongoDBJDBCSchemaDefinitionTimeoutInMinute = mongoDBJDBCSchemaDefinitionTimeoutInMinute;
    }

    // mark JDBC schema is in used and update last used time
    protected void markJDBCSchemaUsed(String schemaPrefix, long now) {
        if (getMongoDBJDBCSchemaDefinitionTimeoutInMinute() <= 0) return;
        synchronized (jdbcSchemaCache) {
            PooledObjectEntry pooledObjectEntry = jdbcSchemaCache.get(schemaPrefix, now);
            if (pooledObjectEntry == null) {
                jdbcSchemaCache.put(schemaPrefix, new PooledMongoDBJDBCSchemaEntry(schemaPrefix), now);
                debug("Acquire MongoDB JDBC schema definition: " + schemaPrefix + ".config");
            } else {
                debug("Update MongoDB JDBC schema definition: " + schemaPrefix + ".config");
            }
        }
    }

    // release expired jdbc schema and remove from disk
    protected void releaseExpiredPools(long now) {
        if (getMongoDBJDBCSchemaDefinitionTimeoutInMinute() <= 0) return;
        List expired = null;
        synchronized (jdbcSchemaCache) {
            expired = jdbcSchemaCache.removeExpired(now, getMongoDBJDBCSchemaDefinitionTimeoutInMinute() * 60);
        }

        if (expired != null && !expired.isEmpty()) {
            CleanupThread cleanupThread = new CleanupThread(expired);
            cleanupThread.start();

        }
    }

    class PooledMongoDBJDBCSchemaEntry extends PooledObjectEntry {

        private String schemaPrefix;

        public PooledMongoDBJDBCSchemaEntry(String schemaPrefix) {
            super(schemaPrefix);
            this.schemaPrefix = schemaPrefix;
        }

        public void release() throws Exception {
            File schemaDirectory = new File(schemaDefinitionDirectory);
            File[] deleteFileList = schemaDirectory.listFiles(new FileNameFilterImpl(schemaPrefix));
            for (File deleteFile : deleteFileList) {
                try {
                    deleteFile.delete();
                } catch (Exception ex) {
                    debug("Fail to delete Mongodb JDBC schema: " + deleteFile.getAbsolutePath(), ex);
                }
            }
        }
    }

    protected boolean isDebugEnabled() {
        return log.isDebugEnabled();
    }

    protected void debug(Object debugMessage) {
        if (log.isDebugEnabled()) log.debug(debugMessage);
    }

    protected void debug(Object debugMessage, Throwable throwable) {
        if (log.isDebugEnabled()) log.debug(debugMessage, throwable);
    }

    class FileNameFilterImpl implements FilenameFilter {

        private String schemaPrefix;

        public FileNameFilterImpl(String schemaPrefix) {
            this.schemaPrefix = schemaPrefix.toLowerCase();
        }

        public boolean accept(File dir, String name) {
            return (name.toLowerCase().startsWith(schemaPrefix));
        }
    }

    class CleanupThread extends Thread {

        private List expiredItems;

        public CleanupThread(List expiredItems) {
            this.expiredItems = expiredItems;
        }

        public void run() {
            for (Iterator it = expiredItems.iterator(); it.hasNext();) {
                PooledMongoDBJDBCSchemaEntry ds = (PooledMongoDBJDBCSchemaEntry) it.next();
                try {
                    // delete schema file
                    ds.release();
                } catch (Exception e) {
                    log.error("Error while releasing mongodb JDBC schema definition Pool Key.", e);
                    // ignore
                }
            }
        }
    }

    private String getPropertyValue(String url, String propertyKey) {
        String[] allProperties = url.split(";");
        Map<String, String> jrsPropertiesMap = new HashMap<String, String>();
        for (String prop : allProperties) {
            if (prop.toLowerCase().startsWith(propertyKey.toLowerCase())) {
                String[] propParts = prop.split("=");
                return propParts[1];
            }
        }
        return null;
    }

}
