function invokeAction(e){var r=repositorySearch.Action["create"+e].call();r.invokeAction()}function invokeFolderAction(e,r){var o=r?r:repositorySearch.model.getContextFolder(),t=repositorySearch.folderActionFactory[e](o);t.invokeAction()}function invokeResourceAction(e,r,o){var t=r?r:repositorySearch.model.getSelectedResources()[0],i=repositorySearch.resourceActionFactory[e](t,o);i.invokeAction()}function invokeBulkAction(e){var r=repositorySearch.model.getSelectedResources(),o=repositorySearch.bulkActionFactory[e](r);o.invokeAction()}function invokeRedirectAction(e){var r=repositorySearch.RedirectAction["create"+e].call();r.invokeAction()}function invokeCreate(e,r){var o=repositorySearch.RedirectAction.createCreateResourceAction(e,r);o.invokeAction()}function isCopyOrMove(){return repositorySearch.CopyMoveController.isCopy()||repositorySearch.CopyMoveController.isMove()}function isFolderCopyOrMove(){return repositorySearch.CopyMoveController.isCopyFolder()||repositorySearch.CopyMoveController.isMoveFolder()}function isResourceCopyOrMove(){return repositorySearch.CopyMoveController.isCopyResource()||repositorySearch.CopyMoveController.isMoveResource()}function canCreateFolder(){var e=repositorySearch.model.getContextFolder();return e&&!e.isOrganizationsRoot()&&e.isEditable()}function canFolderBeDeleted(){var e=repositorySearch.model.getContextFolder();return!(!e||e.isOrganization()||e.isRoot()||e.isPublic()||e.isTemp()||e.isOrganizationsRoot()||!e.isRemovable()||e.isActiveThemeFolder()||e.isThemeRootFolder())}function canFolderBeEdited(e){return e=e?e:repositorySearch.model.getContextFolder(),e&&e.isEditable()}function canFolderBeCopied(e){return e=e?e:repositorySearch.model.getContextFolder(),e&&!e.isOrganization()&&!e.isRoot()&&!e.isOrganizationsRoot()&&e.isReadable()}function canFolderBeCopiedOrMovedToFolder(e){var r=e?e:repositorySearch.model.getContextFolder(),o=isFolderCopyOrMove()&&!r.isOrganizationsRoot()&&canFolderBeEdited(r);if(!o)return!1;var t=repositorySearch.CopyMoveController.object;return r.URI!==t.URI}function canFolderBeMoved(e){return e=e?e:repositorySearch.model.getContextFolder(),!(!e||e.isOrganization()||e.isRoot()||e.isPublic()||e.isTemp()||e.isOrganizationsRoot()||!e.isRemovable()||e.isActiveThemeFolder()||e.isThemeRootFolder())}function canFolderBeExported(e){e=e?e:repositorySearch.model.getContextFolder();var r=e.URI.split("/");return!(r.length>2&&"organizations"===r[r.length-2]&&"org_template"!==r[r.length-1])}function canFolderPermissionsBeAssigned(){var e=repositorySearch.model.getContextFolder();return e&&e.isAdministrable()}function canFolderPropertiesBeShowed(){var e=repositorySearch.model.getContextFolder();return e&&e.isReadable()&&!canFolderPropertiesBeEdited()}function canFolderPropertiesBeEdited(){var e=repositorySearch.model.getContextFolder();return e&&e.isEditable()&&!e.isOrganization()&&!e.isOrganizationsRoot()&&!e.isRoot()}function canResourceBeCreated(e){var r=repositorySearch.model.getContextFolder();return r&&!r.isOrganization()&&!r.isRoot()&&!r.isOrganizationsRoot()&&r.isEditable()}function canBeRun(e){return e=e?e:repositorySearch.model.getSelectedResources()[0],e&&e.isReadable()&&repositorySearch.runActionFactory[e.typeSuffix()]&&!repositorySearch.isflowRedirectRunning}function canBeGenerated(e){return!1}function canBeConverted(e){return!1}function canResourceBeEdited(e){e=e?e:repositorySearch.model.getSelectedResources()[0];var r=repositorySearch.editActionFactory[e.typeSuffix()]||ResourcesUtils.isCustomDataSource(e),o=e&&e.isEditable()&&r;return["DashboardResource"].include(e.typeSuffix())?!1:o}function canBeOpenedInDesigner(e){return e=e?e:repositorySearch.model.getSelectedResources()[0],e&&e.isEditable()&&repositorySearch.openActionFactory[e.typeSuffix()]&&"ContentResource"!==e.typeSuffix()}function canBeOpened(e){return e=e?e:repositorySearch.model.getSelectedResources()[0],e&&e.isEditable()&&repositorySearch.openActionFactory[e.typeSuffix()]&&"ContentResource"===e.typeSuffix()}function canBeRunInBackground(e){return canBeScheduled(e)}function canBeScheduled(e){return e=e?e:repositorySearch.model.getSelectedResources()[0],e&&e.isReadable()&&[repositorySearch.ResourceType.REPORT_UNIT,repositorySearch.ResourceType.ADHOC_REPORT_UNIT,repositorySearch.ResourceType.REPORT_OPTIONS].include(e.resourceType)}function canResourceBeCopied(e){return e=e?e:repositorySearch.model.getSelectedResources()[0],e&&e.isReadable()}function canResourceBeMoved(e){return e=e?e:repositorySearch.model.getSelectedResources()[0],e&&e.isRemovable()}function canResourceBeDeleted(e){return e=repositorySearch.model.getSelectedResources()[0],e&&e.isRemovable()}function canResourcePropertiesBeShowed(){var e=repositorySearch.model.getSelectedResources()[0];return e&&e.isReadable()&&!e.isEditable()}function canResourcePropertiesBeEdited(e){return e=e?e:repositorySearch.model.getSelectedResources()[0],e&&e.isEditable()}function canResourcePermissionsBeAssigned(){var e=repositorySearch.model.getSelectedResources()[0];return e&&e.isAdministrable()}function canAllBeRun(){var e=repositorySearch.model.getSelectedResources(),r=e.detect(function(e){return!canBeRun(e)});return e.length>0&&void 0===r}function canAllBeEdited(){var e=repositorySearch.model.getSelectedResources(),r=e.detect(function(e){return!canResourceBeEdited(e)});return e.length>0&&void 0===r&&!isIPad()}function canAllBeOpened(){var e=repositorySearch.model.getSelectedResources(),r=e.detect(function(e){return!canBeOpenedInDesigner(e)&&!canBeOpened(e)});return e.length>0&&void 0===r}function canAllBeCopied(){var e=repositorySearch.model.getSelectedResources(),r=e.detect(function(e){return!canResourceBeCopied(e)});return e.length>0&&void 0===r}function canAllBeMoved(){var e=repositorySearch.model.getSelectedResources(),r=e.detect(function(e){return!canResourceBeMoved(e)});return e.length>0&&void 0===r}function canAllBeCopiedOrMovedToFolder(e){e=e?e:repositorySearch.model.getContextFolder();var r=isResourceCopyOrMove()&&!e.isOrganizationsRoot()&&canFolderBeEdited(e);if(!r)return!1;var o=repositorySearch.CopyMoveController.isBulkAction()?repositorySearch.CopyMoveController.object:[repositorySearch.CopyMoveController.object],t=o.collect(function(e){return e.parentFolder}),i=!t.uniq().include(e.URI),n=!1;if(e.isThemeRootFolder()||e.isThemeFolder()){var s=null==o.detect(function(e){return!e.resourceType.endsWith(".FileResource")});n=i&&s}else n=i;return n}function canAllBePasted(){return canAllBeCopiedOrMovedToFolder(repositorySearch.model.getSelectedFolder())}function canAllPropertiesBeShowed(){var e=repositorySearch.model.getSelectedResources(),r=e.detect(function(e){return!canResourcePropertiesBeShowed(e)});return e.length>0&&void 0===r}function canAllPropertiesBeEdited(){var e=repositorySearch.model.getSelectedResources(),r=e.detect(function(e){return!canResourcePropertiesBeEdited(e)});return e.length>0&&void 0===r}function canAllBeDeleted(){var e=repositorySearch.model.getSelectedResources(),r=e.detect(function(e){return!canResourceBeDeleted(e)});return e.length>0&&void 0===r}function isThemeFolder(){var e=repositorySearch.model.getContextFolder();return e&&e.isThemeFolder()}function isNonActiveThemeFolder(){var e=repositorySearch.model.getContextFolder();return isThemeFolder()&&!e.isActiveThemeFolder()}function isThemeRootFolder(){var e=repositorySearch.model.getContextFolder();return e&&e.isThemeRootFolder()}function canThemeBeReuploaded(){var e=repositorySearch.model.getContextFolder();return e&&e.isThemeFolder()&&canFolderBeEdited(e)}function isPermissionsChanged(){var e=repositorySearch.dialogsPool.getAllPermissionsDialogs();return e.detect(function(e){return e.isChanged()})}function isPropertiesChanged(){var e=repositorySearch.dialogsPool.getAllPropertiesDialogs();return e.detect(function(e){return e.isChanged()})}var repositorySearch={_container:null,mode:null,isFlowRedirectRunning:!1,flowExecutionKey:"",messages:[],Mode:{SEARCH:"search",BROWSE:"browse",LIBRARY:"library"},ResourceType:{REPORT_UNIT:"com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.ReportUnit",ADHOC_REPORT_UNIT:"com.jaspersoft.ji.adhoc.AdhocReportUnit",OLAP_UNIT:"com.jaspersoft.jasperserver.api.metadata.olap.domain.OlapUnit",DASHBOARD_RESOURCE:"com.jaspersoft.ji.adhoc.DashboardResource",REPORT_OPTIONS:"com.jaspersoft.ji.report.options.metadata.ReportOptions",REPORT_DATA_SOURCE:"com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.ReportDataSource",JDBC_REPORT_DATA_SOURCE:"com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.JdbcReportDataSource",JNDI_JDBC_REPORT_DATA_SOURCE:"com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.JndiJdbcReportDataSource",VIRTUAL_REPORT_DATA_SOURCE:"com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.VirtualReportDataSource",CUSTOM_REPORT_DATA_SOURCE:"com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.CustomReportDataSource",BEAN_REPORT_DATA_SOURCE:"com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.BeanReportDataSource",OLAP_DATA_SOURCE:"com.jaspersoft.jasperserver.api.metadata.olap.domain.OlapDataSource",OLAP_CLIENT_CONNECTION:"com.jaspersoft.jasperserver.api.metadata.olap.domain.OlapClientConnection",QUERY:"com.jaspersoft.jasperserver.api.metadata.common.domain.Query",INPUT_CONTROL:"com.jaspersoft.jasperserver.api.metadata.common.domain.InputControl",LIST_OF_VALUES:"com.jaspersoft.jasperserver.api.metadata.common.domain.ListOfValues",LIST_OF_VALUES_ITEM:"com.jaspersoft.jasperserver.api.metadata.common.domain.ListOfValuesItem",DATA_TYPE:"com.jaspersoft.jasperserver.api.metadata.common.domain.DataType",MONDRIAN_CONNECTION:"com.jaspersoft.jasperserver.api.metadata.olap.domain.MondrianConnection",SECURE_MONDRIAN_CONNECTION:"com.jaspersoft.ji.ja.security.domain.SecureMondrianConnection",XMLA_CONNECTION:"com.jaspersoft.jasperserver.api.metadata.olap.domain.XMLAConnection",MONDRIAN_XMLA_DEFINITION:"com.jaspersoft.jasperserver.api.metadata.olap.domain.MondrianXMLADefinition",CONTENT_RESOURCE:"com.jaspersoft.jasperserver.api.metadata.common.domain.ContentResource",FILE_RESOURCE:"com.jaspersoft.jasperserver.api.metadata.common.domain.FileResource",SEMANTIC_LAYER_DATA_SOURCE:"com.jaspersoft.commons.semantic.datasource.SemanticLayerDataSource",DATA_DEFINER_UNIT:"com.jaspersoft.commons.semantic.DataDefinerUnit"},SearchAction:{NEXT:"next",GET_RESOURCE_CHILDREN:"getResourceChildren"},Event:{SEARCH_RUN:"search:run",SEARCH_BROWSE:"search:browse",SEARCH_FILTER:"search:filter",SEARCH_SORT:"search:sort",SEARCH_NEXT:"search:next",SEARCH_ROLLBACK:"search:rollback",SEARCH_SEARCH:"search:search",SEARCH_CHILDREN:"search:children",STATE_CHANGED:"state:changed",FILTER_PATH_CHANGED:"filterPath:changed",RESULT_CHANGED:"result:changed",CHILDREN_LOADED:"resourceChildren:loaded",RESULT_NEXT:"result:next",RESULT_ERROR:"result:error",REDIRECT_ERROR:"redirect:error",FLOW_REDIRECT_RUNNING:"flowRedirect:running"},InfoAction:{GET_DISPLAY_PATH:"getDisplayPath"},PermissionAction:{BROWSE:"permissionBrowse",SEARCH:"permissionSearch",NEXT:"permissionNext",UPDATE:"permissionsUpdate"},PermissionEvent:{BROWSE:"permission:browse",SEARCH:"permission:search",NEXT:"permission:next",UPDATE:"permission:update",LOADED:"permission:loaded",UPDATED:"permission:updated",ERROR:"permission:error"},FolderAction:{CREATE:"createFolder",COPY:"copyFolder",MOVE:"moveFolder",UPDATE:"updateFolder",DELETE:"deleteFolder"},FolderEvent:{DELETED:"folder:deleted",DELETE_ERROR:"folder:deleteError",CREATED:"folder:created",CREATE_ERROR:"folder:createError",COPIED:"folder:copied",COPY_ERROR:"folder:copyError",MOVED:"folder:moved",MOVE_ERROR:"folder:moveError",UPDATED:"folder:updated",UPDATE_ERROR:"folder:updateError"},ResourceAction:{DELETE:"deleteResources",COPY:"copyResources",MOVE:"moveResources",UPDATE:"updateResource",GENERATE:"generate",CONVERT:"convert"},ResourceEvent:{DELETED:"resource:deleted",DELETE_ERROR:"resource:deleteError",COPIED:"resource:copied",COPY_ERROR:"resource:copyError",MOVED:"resource:moved",MOVE_ERROR:"resource:moveError",UPDATED:"resource:updated",UPDATE_ERROR:"resource:updateError",GENERATED:"resource:generated",GENERATE_ERROR:"resource:generateError",CONVERTED:"resource:converted",CONVERT_ERROR:"resource:convertError"},RedirectType:{FLOW_REDIRECT:0,LOCATION_REDIRECT:1,WINDOW_REDIRECT:2},ThemeAction:{SETTHEME:"setActiveTheme",DOWNLOAD_THEME:"downloadTheme",REUPLOAD:"reuploadTheme"},ThemeEvent:{UPDATED:"theme:updated",REUPLOADED:"theme:reuploaded",THEME_ERROR:"theme:error"},initialize:function(e){function r(e,r){if(e){var o="USER"==r?orgModule.User:orgModule.Role;return e.collect(function(e){return new o(e)})}return[]}var o=e.rsInitOptions;repositorySearch.mode=o.mode,repositorySearch.flowExecutionKey=o.flowExecutionKey,layoutModule.resizeOnClient("repoSearch"==document.body.id?"searchFilters":"folders","results"),webHelpModule.setCurrentContext(repositorySearch.mode===repositorySearch.Mode.SEARCH?"search":"repo"),o.enableDnD=repositorySearch.mode==repositorySearch.Mode.BROWSE&&!isIPad(),repositorySearch.model.setPublicFolderUri(o.publicFolderUri),repositorySearch.model.setTempFolderUri(o.tempFolderUri),repositorySearch.model.setRootFolderUri(o.rootFolderUri),repositorySearch.model.setOrganizationsFolderUri(o.organizationsFolderUri),repositorySearch.model.setFolderSeparator(o.folderSeparator),repositorySearch.model.setAdministrator(o.isAdministrator),repositorySearch.model.setConfiguration(o.configuration),repositorySearch.model.setServerState(o.state),repositorySearch.CursorManager.initialize(),repositorySearch.actionModel.initialize(),repositorySearch.mode==repositorySearch.Mode.BROWSE?(repositorySearch.toolbar.initialize(repositorySearch.actionModel.bulkActions),repositorySearch.foldersPanel.initialize(o)):(repositorySearch.filtersPanel.initialize(repositorySearch.model.getFiltersConfiguration(),repositorySearch.model.getFiltersState()),repositorySearch.secondarySearchBox.initialize(repositorySearch.model.getTextState()),repositorySearch.filterPath.initialize()),repositorySearch.resultsPanel.initialize(o),repositorySearch.sortersPanel.initialize(repositorySearch.model.getSortersConfiguration(),repositorySearch.model.getSortState()),repositorySearch.initFolderEvents(),repositorySearch.initResourceEvents(),repositorySearch.initThemeEvents(),repositorySearch.observe("search:filter",function(e){var r=new repositorySearch.ServerAction.createSearchAction("filter",{filterId:e.memo.filterId,filterOption:e.memo.optionId});r.invokeAction()}),repositorySearch.observe("search:sort",function(e){var r=new repositorySearch.ServerAction.createSearchAction("sort",{sortBy:e.memo.sorterId});r.invokeAction()}),repositorySearch.observe("search:browse",function(e){var r=new repositorySearch.ServerAction.createSearchAction("browse",{folderUri:e.memo.uri});r.invokeAction(),repositorySearch.actionModel.refreshToolbar()}),repositorySearch.observe("search:search",function(e){var r=new repositorySearch.ServerAction.createSearchAction("search",{text:e.memo.text});r.invokeAction()}),repositorySearch.observe("search:next",function(e){var r=new this.ServerAction.createSearchAction(this.SearchAction.NEXT,{});r.invokeAction()}.bindAsEventListener(repositorySearch)),repositorySearch.observe("search:rollback",function(e){var r=new repositorySearch.ServerAction.createSearchAction("rollback",{position:e.memo.position});r.invokeAction()}),repositorySearch.observe("search:children",function(e){var r=e.memo.resource,o=e.memo.item,t=new this.ServerAction.createSearchAction(this.SearchAction.GET_RESOURCE_CHILDREN,{resourceUri:r.URIString,resourceType:r.resourceType,item:o});t.invokeAction()}.bindAsEventListener(repositorySearch)),repositorySearch.observe("permission:browse",function(e){var r=new repositorySearch.ServerAction.createPermissionAction(this.PermissionAction.BROWSE,e.memo);r.invokeAction()}.bindAsEventListener(repositorySearch)),repositorySearch.observe("permission:search",function(e){var r=new repositorySearch.ServerAction.createPermissionAction(this.PermissionAction.SEARCH,e.memo);r.invokeAction()}.bindAsEventListener(repositorySearch)),repositorySearch.observe("permission:next",function(e){var r=new repositorySearch.ServerAction.createPermissionAction(this.PermissionAction.NEXT,e.memo);r.invokeAction()}.bindAsEventListener(repositorySearch)),repositorySearch.observe("permission:update",function(e){var r=e.memo.uri,o=e.memo.entities,t=e.memo.finishEdit;if(o.length>0){var i=o.collect(function(e){return e.toPermissionData()}),n=new repositorySearch.ServerAction.createPermissionAction(this.PermissionAction.UPDATE,{uri:r,entitiesWithPermission:Object.toJSON(i),finishEdit:t});n.invokeAction()}else{var s=repositorySearch.dialogsPool.getPermissionsDialog(r);t&&s.hide()}}.bindAsEventListener(repositorySearch)),repositorySearch.observe("permission:loaded",function(e){var o=e.memo.responseData,t=repositorySearch.dialogsPool.getPermissionsDialog(e.memo.inputData.uri);t.stopWaiting(),o&&(e.memo.doSet?t.setEntities(r(o.entities,o.type)):t.addEntities(r(o.entities,o.type)),"USER"===o.type?(buttonManager.select(t._byUsersButton.parentNode),buttonManager.unSelect(t._byRolesButton.parentNode)):(buttonManager.unSelect(t._byUsersButton.parentNode),buttonManager.select(t._byRolesButton.parentNode)))}.bindAsEventListener(repositorySearch)),repositorySearch.observe("permission:updated",function(e){var o=e.memo.inputData.uri,t=e.memo.inputData.finishEdit,i=repositorySearch.dialogsPool.getPermissionsDialog(o);if(i.enable(),t)i.hide();else{var n=e.memo.responseData;n&&i.updateEntities(r(n.entities,n.type))}}.bindAsEventListener(repositorySearch)),repositorySearch.observe("permission:error",function(e){alert(Object.toJSON(e.memo))}.bindAsEventListener(repositorySearch)),repositorySearch.observe("resourceChildren:loaded",function(e){var r=e.memo.inputData.item,o=r.getValue(),t=e.memo.responseData;if(Object.isArray(t)){var i=[];t.each(function(e){var r=new Resource(e);o.addChild(r),i.push(r)}),repositorySearch.resultsPanel.setResources(i,r),o.isLoaded()&&r.isLoading&&r.setLoading(!1)}}.bindAsEventListener(repositorySearch)),repositorySearch.observe("state:changed",function(e){repositorySearch.updateUI(e.memo.state)}),repositorySearch.observe("filterPath:changed",function(e){repositorySearch.filterPath.setPathItems(e.memo.filterPath)}),repositorySearch.observe("result:changed",function(e){var r=e.memo.resources,o=r.collect(function(e){return new Resource(e)});repositorySearch.resultsPanel.setResources(o)}),repositorySearch.observe("result:next",function(e){var r=e.memo.resources,o=r.collect(function(e){return new Resource(e)});repositorySearch.resultsPanel.addResources(o)}),repositorySearch.observe("result:error",this.defaultErrorHandler),repositorySearch.observe("redirect:error",this.defaultErrorHandler),repositorySearch.observe("flowRedirect:running",function(){repositorySearch.isflowRedirectRunning=!0,repositorySearch.toolbar.refresh()}),repositorySearch.Mode.BROWSE!=o.mode&&repositorySearch.fire(repositorySearch.Event.SEARCH_SEARCH,{text:repositorySearch.model.getTextState()}),e.rsInitOptions.systemConfirm.blank()||dialogs.systemConfirm.show(e.rsInitOptions.systemConfirm),JRS.reportExecutionCounter&&JRS.reportExecutionCounter.check(),e.rsInitOptions.errorPopupMessage.blank()||dialogs.errorPopup.show(e.rsInitOptions.errorPopupMessage)},showContextMenu:function(e){var r=e.memo.targetEvent;if(repositorySearch.mode==repositorySearch.Mode.BROWSE&&repositorySearch.foldersPanel.isFolderContextMenu(r)&&repositorySearch.actionModel.showFolderMenu(r),repositorySearch.resultsPanel.isResourceContextMenu(r)){var o=repositorySearch.model.getSelectedResources();o.length>1?repositorySearch.actionModel.showResourceBulkMenu(r):repositorySearch.actionModel.showResourceMenu(r)}},updateUI:function(e){e.sortBy!=repositorySearch.model.getSortState()&&repositorySearch.sortersPanel.select(e.sortBy,!0),e.text!=repositorySearch.model.getTextState()&&repositorySearch.mode!=repositorySearch.Mode.BROWSE&&repositorySearch.secondarySearchBox.setText(e.text);for(var r in e.customFilters)e.customFilters[r]!=repositorySearch.model.getFiltersState()[r]&&repositorySearch.filtersPanel.select(r,e.customFilters[r],!0);e.folderUri!=repositorySearch.model.getFolderUriState(),repositorySearch.model.setServerState(e)},initFolderEvents:function(){this.observe("folder:deleted",function(e){var r=e.memo.inputData.folder,o=r.getParentFolder(),t=repositorySearch.foldersPanel;t.refreshFolder(o),"/"===o.URI&&t.tree._selectOrEditNode(void 0,o.node,!1)}),this.observe("folder:deleteError",this.defaultErrorHandler),this.observe("folder:created",function(e){var r=e.memo.inputData.toFolder;repositorySearch.foldersPanel.refreshFolder(r)}),this.observe("folder:createError",this.defaultErrorHandler),this.observe("folder:copied",function(e){var r=e.memo.inputData.folder,o=e.memo.inputData.toFolder;repositorySearch.CopyMoveController.cancel(),repositorySearch.foldersPanel.moveOrCopyFolder(r,o,!0)}),this.observe("folder:copyError",this.defaultErrorHandler),this.observe("folder:moved",function(e){var r=e.memo.inputData.folder,o=e.memo.inputData.toFolder;repositorySearch.CopyMoveController.cancel(),repositorySearch.foldersPanel.moveOrCopyFolder(r,o)}),this.observe("folder:moveError",this.defaultErrorHandler),this.observe("folder:updated",function(e){var r=e.memo.inputData.folder,o=e.memo.responseData.label,t=e.memo.responseData.desc;repositorySearch.foldersPanel.updateFolder(r,o,t)}),this.observe("folder:updateError",this.defaultErrorHandler)},initResourceEvents:function(){this.observe("resource:deleted",function(e){var r=e.memo.inputData.resources,o=e.memo.responseData;if(o.dependentResources)dialogs.dependentResources.show(o.dependentResources,null,{okOnly:!0,canSave:!1,topMessage:repositorySearch.messages["dialog.dependencies.resources.message"],bottomMessage:repositorySearch.messages["dialog.dependencies.resources.deleteMessage"]});else{repositorySearch.model.getSelectedFolder();repositorySearch.resultsPanel.removeResources(r)}}),this.observe("resource:deleteError",this.defaultErrorHandler),this.observe("resource:copied",function(e){var r=e.memo.inputData.folder;repositorySearch.foldersPanel.reselectFolder(r)}),this.observe("resource:copyError",this.defaultErrorHandler),this.observe("resource:moved",function(e){var r=e.memo.inputData.folder,o=repositorySearch.model.getSelectedFolder();repositorySearch.foldersPanel.reselectFolder(r),repositorySearch.foldersPanel.reselectFolder(o)}),this.observe("resource:moveError",this.defaultErrorHandler),this.observe("resource:updated",function(e){repositorySearch.resultsPanel.updateResource(new Resource(e.memo.responseData))}),this.observe("resource:updateError",this.defaultErrorHandler),this.observe("resource:generated",function(e){var r=e.memo.inputData,o=e.memo.responseData,t=new Resource(o);if(r.run){var i=repositorySearch.RedirectAction.createRunResourceAction(t,!1);i.invokeAction()}else repositorySearch.mode==repositorySearch.Mode.BROWSE?r.location==repositorySearch.foldersPanel.getSelectedUri()&&repositorySearch.foldersPanel.doBrowse():repositorySearch.fire(repositorySearch.Event.SEARCH_SEARCH,{text:repositorySearch.model.getTextState()});dialogs.systemConfirm.show(repositorySearch.messages.RM_REPORT_CREATED,5e3)}),this.observe("resource:generateError",function(e){var r,o=(e.memo.inputData,e.memo.responseData),t=o.msg,i=o.data;if(t&&t.indexOf("SYSTEM_CONFIRM_REQUIRED")>-1){var n=Utils.restOfString(t,"SYSTEM_CONFIRM_REQUIRED:");if(i&&confirm(n)){i.overwrite=!0;var s=repositorySearch.ResourceAction.GENERATE;r=new repositorySearch.ServerAction.createGenerateAction(s,i),r.invokeAction()}}else repositorySearch.defaultErrorHandler(e)}),this.observe("resource:converted",function(e){dialogs.systemConfirm.show(e.memo.responseData||e.memo,5e3),repositorySearch.mode==repositorySearch.Mode.BROWSE?repositorySearch.foldersPanel.doBrowse():repositorySearch.fire(repositorySearch.Event.SEARCH_SEARCH,{text:repositorySearch.model.getTextState()})}),this.observe("resource:convertError",this.defaultErrorHandler)},defaultErrorHandler:function(e){require(["common/component/dialog/AlertDialog","bundle!jasperserver_messages"],function(r,o){var t=new r({title:o["dialog.dependencies.title"]});t.setMessage(e.memo.responseData||e.memo),t.open()})},initThemeEvents:function(){this.observe("theme:updated",function(e){var r=e.memo.responseData;if(r&&r.refresh)document.body.style.cursor="wait",window.location.reload(!0);else{var o=repositorySearch&&repositorySearch.model&&repositorySearch.model.getContextFolder()&&repositorySearch.model.getContextFolder().getParentFolder();o&&repositorySearch.foldersPanel&&repositorySearch.foldersPanel.refreshFolder&&repositorySearch.foldersPanel.refreshFolder(o)}}),this.observe("theme:reuploaded",function(e){if(e.memo.responseData.isActiveTheme){var r=e.memo.responseData.themeUri,o=new repositorySearch.ServerAction.createFolderAction(repositorySearch.ThemeAction.SETTHEME,{folderUri:r});o.invokeAction()}}),this.observe("theme:error",function(e){var r=e.memo.responseData;r&&alert(r)})},getMessage:function(e,r){var o=repositorySearch.messages[e];return o?new Template(o).evaluate(r?r:{}):""},_createAction:function(e,r){var o;if(r.endsWith("FolderAction")){var t=repositorySearch.model.getContextFolder();o=e["create"+r].call(null,t)}else if(r.endsWith("ResourceAction")||r.endsWith("RunAction")){var i=repositorySearch.model.getContextResource();o=e["create"+r].call(null,i)}else o=e["create"+r].call();return o},observe:function(e,r){this._getContainer().observe(e,r)},stopObserving:function(e,r){this._getContainer().stopObserving(e,r)},fire:function(e,r){this._getContainer().fire(e,r)},_getContainer:function(){return this._container||(this._container=document.body),this._container}};repositorySearch.model={_organizationsFolderUri:null,_rootFolderUri:null,_tempFolderUri:null,_publicFolderUri:null,_folderSeparator:null,_configuration:{},_serverState:{},_uiState:{selectedFolder:null,contextFolder:null,contextResource:null,selectedResources:[]},_isAdministrator:!1,setOrganizationsFolderUri:function(e){this._organizationsFolderUri=e},getOrganizationsFolderUri:function(){return this._organizationsFolderUri},setRootFolderUri:function(e){this._rootFolderUri=e},getRootFolderUri:function(){return this._rootFolderUri},setTempFolderUri:function(e){this._tempFolderUri=e},getTempFolderUri:function(){return this._tempFolderUri},setPublicFolderUri:function(e){this._publicFolderUri=e},getPublicFolderUri:function(){return this._publicFolderUri},setFolderSeparator:function(e){this._folderSeparator=e},getFolderSeparator:function(){return this._folderSeparator},setConfiguration:function(e){this._configuration=e},getConfiguration:function(){return this._configuration},getFiltersConfiguration:function(){return this.getConfiguration().filters},getSortersConfiguration:function(){return this.getConfiguration().sorters},setServerState:function(e){this._serverState=e},getServerState:function(){return this._serverState},getUIState:function(){return this._uiState},setAdministrator:function(e){this._isAdministrator=e},isAdministrator:function(){return this._isAdministrator},getFiltersState:function(){return this.getServerState().customFilters},getSortState:function(){return this.getServerState().sortBy},getTextState:function(){return this.getServerState().text},getFolderUriState:function(){return this.getServerState().folderUri},setSelectedFolder:function(e){return this.getUIState().selectedFolder=e},getSelectedFolder:function(){return this.getUIState().selectedFolder},setContextFolder:function(e){return this.getUIState().contextFolder=e},getContextFolder:function(){return this.getUIState().contextFolder},setSelectedResources:function(e){return this.getUIState().selectedResources=e},getSelectedResources:function(){return this.getUIState().selectedResources}},repositorySearch.actionModel={bulkActions:{RUN:{buttonId:"run",action:invokeBulkAction,actionArgs:"Run",test:canAllBeRun},EDIT:{buttonId:"edit",action:invokeBulkAction,actionArgs:"Edit",test:canAllBeEdited},OPEN:{buttonId:"open",action:invokeBulkAction,actionArgs:"Open",test:canAllBeOpened},COPY:{buttonId:"copy",action:invokeBulkAction,actionArgs:"Copy",test:canAllBeCopied},CUT:{buttonId:"cut",action:invokeBulkAction,actionArgs:"Move",test:canAllBeMoved},PASTE:{buttonId:"paste",action:invokeFolderAction,actionArgs:"PasteResources",test:canAllBePasted},REMOVE:{buttonId:"remove",action:invokeBulkAction,actionArgs:"Delete",test:canAllBeDeleted}},_holderId:"searchActionModel",_folderMenu:"folder_mutton",_resourceMenu:"resource_menu",_resourceBulkMenu:"resource_bulk_menu",initialize:function(){var e=$(layoutModule.PAGE_BODY_ID);e&&e.observe(isSupportsTouch()?"touchstart":"click",function(e){isIPad()?!isRightClick(e)&&1==e.touches.length&&actionModel.hideMenu():!isRightClick(e)&&actionModel.hideMenu()})},showFolderMenu:function(e,r){actionModel.showDynamicMenu(this._folderMenu,e,null,r,this._holderId)},showResourceBulkMenu:function(e,r){actionModel.showDynamicMenu(this._resourceBulkMenu,e,null,r,this._holderId)},showResourceMenu:function(e,r){actionModel.showDynamicMenu(this._resourceMenu,e,null,r,this._holderId)},refreshToolbar:function(e){repositorySearch.toolbar.refresh()}},repositorySearch.CopyMoveController={object:null,_move:!1,_copy:!1,_dndMode:!1,onMove:function(){repositorySearch.CursorManager.move(),repositorySearch.actionModel.refreshToolbar()},onCopy:function(){repositorySearch.CursorManager.copy(),repositorySearch.actionModel.refreshToolbar()},onCancel:function(){repositorySearch.CursorManager.none(),repositorySearch.actionModel.refreshToolbar()},isObjectInstanceOf:function(e){var r=this.object;return r?this.isBulkAction()?r.length==r.findAll(function(r){return r instanceof e}).length:r instanceof e:!1},isMoveResource:function(){return this._move&&this.isObjectInstanceOf(Resource)},isMoveFolder:function(){return this._move&&this.isObjectInstanceOf(Folder)},isCopyResource:function(){return this._copy&&this.isObjectInstanceOf(Resource)},isCopyFolder:function(){return this._copy&&this.isObjectInstanceOf(Folder)},isBulkAction:function(){return Object.isArray(this.object)},move:function(e,r){this.cancel(),this.object=e,this._move=!0,this._copy=!1,this._dndMode=r,this.onMove()},copy:function(e,r){this.cancel(),this.object=e,this._move=!1,this._copy=!0,this._dndMode=r,this.onCopy()},cancel:function(){this.object=null,this._move=!1,this._copy=!1,this.onCancel()},isMove:function(){return this._move},isCopy:function(){return this._copy},isDnd:function(){return this._dndMode}},repositorySearch.CursorManager={container:null,className:["copy_cursor","move_cursor"],initialize:function(){this.container=$("display")},copy:function(){this.none(),this.container.addClassName(this.className[0])},move:function(){this.none(),this.container.addClassName(this.className[1])},none:function(){this.className.each(function(e,r){this.container.removeClassName(this.className[r])}.bind(this))}};var Resource=function(e){this._json=e,this.name=e.name,this.label=e.label,this.description=e.description,this.date=e.date,this.dateTimestamp=e.dateTimestamp,this.dateTime=e.dateTime,this.updateDate=e.updateDate,this.updateDateTimestamp=e.updateDateTimestamp,this.updateDateTime=e.updateDateTime,this.URI=e.URI,this.URIString=e.URIString,this.parentUri=e.parentUri,this.parentFolder=e.parentFolder,this.resourceType=e.resourceType,this.type=e.type,this.isScheduled=e.scheduled,this._permissions=e.permissions,this.hasChildren=e.hasChildren,this.isChild=!1,this.parentResource=null,this.isOpen=!1,this._children=[]};Resource.addMethod("clone",function(){return new Resource(this._json)}),Resource.addMethod("isReadable",function(){return this._permissions.include("r")}),Resource.addMethod("isEditable",function(){return this._permissions.include("e")}),Resource.addMethod("isRemovable",function(){return this._permissions.include("d")}),Resource.addMethod("isAdministrable",function(){
return this._permissions.include("a")}),Resource.addMethod("typeEquals",function(e){return this.resourceType===e}),Resource.addMethod("typeSuffix",function(){return this.resourceType.split(".").last()}),Resource.addMethod("isLoaded",function(){return this._children.size()>0}),Resource.addMethod("isFolder",function(){return!1}),Resource.addMethod("getChildren",function(e){return this._children}),Resource.addMethod("addChild",function(e){e.isChild=!0,e.parentResource=this,this._children.push(e)}),Resource.addMethod("updateChild",function(e){e.isChild=!0,e.parentResource=this;var r=-1;this._children.each(function(o,t){o.URIString==e.URIString&&(r=t)}),r>-1?this._children[r]=e:this._children.push(e)}),Resource.addMethod("permissionsToString",function(){var e="";return e+=this.isEditable()?repositorySearch.messages["permission.modify"]:repositorySearch.messages["permission.readOnly"],this.isRemovable()&&(e+=", "+repositorySearch.messages["permission.delete"]),this.isAdministrable()&&(e+=", "+repositorySearch.messages["permission.administer"]),e});var Folder=function(e){this.node=e,this.name=e.param.id,this.label=xssUtil.unescape(e.name),this.desc=e.param.extra.desc?xssUtil.unescape(e.param.extra.desc):"",this.description=xssUtil.unescape(this.desc),this.date=e.param.extra.date?xssUtil.unescape(e.param.extra.date):"",this.URI=e.param.uri,this.URIString=e.param.uri};Folder.prototype=deepClone(Resource.prototype),Folder.addMethod("clone",function(){return new Folder(this.node)}),Folder.addMethod("getParentFolder",function(){return this.isRoot()?null:new Folder(this.node.parent)}),Folder.addMethod("getReadableUri",function(){return this.isRoot()?"":this.getParentFolder().getReadableUri()+repositorySearch.model.getFolderSeparator()+this.label}),Folder.addMethod("isRoot",function(){return this.URI==repositorySearch.model.getRootFolderUri()||null==this.node.parent}),Folder.addMethod("isPublic",function(){return this.URI==repositorySearch.model.getPublicFolderUri()}),Folder.addMethod("isTemp",function(){return this.URI==repositorySearch.model.getTempFolderUri()}),Folder.addMethod("isOrganization",function(){return this.URI.match(repositorySearch.model.getOrganizationsFolderUri()+"/[^/]+$")}),Folder.addMethod("isOrganizationsRoot",function(){return this.URI.match(repositorySearch.model.getOrganizationsFolderUri()+"$")}),Folder.addMethod("isReadable",function(){return!0}),Folder.addMethod("isEditable",function(){return this.node.param.extra.isWritable}),Folder.addMethod("isRemovable",function(){return this.node.param.extra.isRemovable}),Folder.addMethod("isAdministrable",function(){return this.node.param.extra.isAdministrable}),Folder.addMethod("isSelected",function(){return this.node.isSelected()}),Folder.addMethod("equals",function(e){return e&&this.URI==e.URI}),Folder.addMethod("isThemeFolder",function(){return this.node.param.extra&&this.node.param.extra.isThemeFolder}),Folder.addMethod("isThemeRootFolder",function(){return this.node.param.extra&&this.node.param.extra.isThemeRootFolder}),Folder.addMethod("isActiveThemeFolder",function(){return this.node.param.extra&&this.node.param.extra.isActiveThemeFolder}),Folder.addMethod("isFolder",function(){return!0});var ResourcesUtils={getResourceUris:function(e){var r=[];return e.each(function(e){r.push(e.URIString?e.URIString:e.URI)}),r},getResourceUriAndTypeList:function(e){var r=[];return e.each(function(e){var o=e.URIString?e.URIString:e.URI;r.push({URIString:o,type:e.type})}),r},checkNameLength:function(e){return!e.blank()&&e.length<=repositorySearch.model.getConfiguration().resourceNameMaxLength},checkDescriptionLength:function(e){return e.length<=repositorySearch.model.getConfiguration().resourceDescriptionMaxLength},labelValidator:function(e){var r=!0,o="";return e.blank()?(o=repositorySearch.messages.RE_INVALID_NAME_SIZE.replace("{0}",repositorySearch.model.getConfiguration().resourceLabelMaxLength),r=!1):e.length>repositorySearch.model.getConfiguration().resourceLabelMaxLength&&(o=repositorySearch.messages.RE_INVALID_NAME_SIZE.replace("{0}",repositorySearch.model.getConfiguration().resourceLabelMaxLength),r=!1),{isValid:r,errorMessage:o}},descriptionValidator:function(e){var r=!0,o="";return e.length>repositorySearch.model.getConfiguration().resourceDescriptionMaxLength&&(o=repositorySearch.messages.RE_INVALID_DESC_SIZE.replace("{0}",repositorySearch.model.getConfiguration().resourceDescriptionMaxLength),r=!1),{isValid:r,errorMessage:o}},_fileTypeValidatorTemplate:function(e,r){var o=!0,t="";return!e||e.blank()?(t=repositorySearch.messages.RE_ENTER_FILE_NAME,o=!1):e.toLowerCase().endsWith(r)||(t=repositorySearch.messages.RE_INVALID_FILE_TYPE.replace("{0}",r),o=!1),{isValid:o,errorMessage:t}},zipFileTypeValidator:function(e){return ResourcesUtils._fileTypeValidatorTemplate(e,".zip")},isCustomDataSource:function(e){return _.contains(Utils.getInitConfiguration().customDataSources,e.resourceType)}},Utils={restOfString:function(e,r){var o=e.lastIndexOf(r)+r.length;return e.substring(o,e.length).trim()},getInitOptions:function(){return localContext.rsInitOptions||__jrsConfigs__.repositorySearch.localContext.rsInitOptions},getInitConfiguration:function(){return Utils.getInitOptions().configuration}};document.observe("element:contextmenu",repositorySearch.showContextMenu.bindAsEventListener(repositorySearch)),document.observe("key:escape",function(e){actionModel.hideMenu(),Event.stop(e)}),document.observe("key:delete",function(e){e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||canAllBeDeleted()&&invokeBulkAction("Delete")}),designerBase=void 0;