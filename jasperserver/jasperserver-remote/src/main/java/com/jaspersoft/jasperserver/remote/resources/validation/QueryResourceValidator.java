/*
 * Copyright (C) 2005 - 2014 TIBCO Software Inc. All rights reserved.
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

package com.jaspersoft.jasperserver.remote.resources.validation;

import com.jaspersoft.jasperserver.api.common.domain.ValidationErrors;
import com.jaspersoft.jasperserver.api.metadata.common.domain.Query;
import com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.AwsReportDataSource;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

import static com.jaspersoft.jasperserver.remote.resources.validation.ValidationHelper.addIllegalParameterValueError;
import static com.jaspersoft.jasperserver.remote.resources.validation.ValidationHelper.addMandatoryParameterNotFoundError;
import static com.jaspersoft.jasperserver.remote.resources.validation.ValidationHelper.empty;

/**
 * <p></p>
 *
 * @author Zakhar.Tomchenco
 * @version $Id$
 */
@Component
public class QueryResourceValidator extends GenericResourceValidator<Query> {
    @Resource(name = "queryLanguages")
    private List<String> queryLanguages;

    @Override
    protected void internalValidate(Query resource, ValidationErrors errors) {
        if (empty(resource.getSql())){
            addMandatoryParameterNotFoundError(errors, "QueryValue");
        }
        if (empty(resource.getLanguage())){
            addMandatoryParameterNotFoundError(errors, "Language");
        } else {
            if (!queryLanguages.contains(resource.getLanguage())){
                addIllegalParameterValueError(errors, "Language", resource.getLanguage(), "The language " + resource.getLanguage() + " isn't supported");
            }
        }
    }
}
