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
package com.jaspersoft.jasperserver.war.common;


/**
 * @author Lucian Chirita
 * @version $Id: HeartbeatCustomDSInfo.java 55164 2015-05-06 20:54:37Z mchan $
 */
public class HeartbeatCustomDSInfo extends HeartbeatInfo {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String serviceClass = null;

	public String getServiceClass() {
		return serviceClass;
	}

	public void setServiceClass(String serviceClass) {
		this.serviceClass = serviceClass;
	}

	public void contributeToHttpCall(HeartbeatCall call) {
		call.addParameter("customDSClass[]", getServiceClass() == null ? "" : getServiceClass());
		call.addParameter("customDSCount[]", String.valueOf(getCount()));
	}

	public String getKey() {
		return getServiceClass();
	}

}
