!function(e){e.Report={_messages:{},_scroll:null,pageActions:{},viewReportForm:null,pageIndex:0,lastPageIndex:0,pageTimestamp:null,checkPageUpdatedTimeoutId:null,emptyReport:!0,reportForceControls:!1,hasInputControls:!1,reportControlsLayout:null,refreshReportCanceled:!1,reportParameterValues:null,allRequestParameters:null,requestedInputParameters:{},parametersWithoutDefaultValues:null,isLoaded:!1,EXPORT_ACTION_FORM:"exportActionForm",TOOLBAR_SUBMENU:"toolbarText",PAGINATION_CONTAINER:"pagination",PAGINATION_PAGE_FIRST:"page_first",PAGINATION_PAGE_PREV:"page_prev",PAGINATION_PAGE_CURRENT:"page_current",PAGINATION_PAGE_NEXT:"page_next",PAGINATION_PAGE_LAST:"page_last",PAGINATION_PAGE_TOTAL:"page_total",DATA_TIMESTAMP_SPAN:"dataTimestampMessage",DATA_REFRESH_BUTTON:"dataRefreshButton",ASYNC_CANCEL_BUTTON:"asyncCancel",getMessage:function(e,t){var r=this._messages[e];return r?new Template(r).evaluate(t?t:{}):""},commonInit:function(e){var t=jQuery("#"+ajax.LOADING_ID);t.length>0&&(t.addClass(layoutModule.CANCELLABLE_CLASS),t.find("#cancel").click(function(){Report.cancelReportExecution()})),document.location.href.indexOf("frame=0")>0&&(jQuery("#reportViewFrame > .content > .header").hide(),jQuery("#reportViewFrame").css("margin",0),jQuery("#innerPagination").css("margin","none"),jQuery("#reportViewFrame > .content > .body").css({top:0,"margin-top":0}))},navigateToReportPage:function(e,t,r){viewer.jive&&viewer.jive.hide(),viewer.reportInstance.gotoPage(e)},goToPage:function(e){parseInt(e,10)&&parseInt(e,10)>0&&(null==Report.lastPageIndex||parseInt(e,10)<=Report.lastPageIndex+1)?Report.navigateToReportPage(parseInt(e,10)-1):doNothing()},reportExecutionKey:function(){return Report.flowExecutionKeyOutput?Report.flowExecutionKeyOutput:window.dashboardViewFrame?dashboardViewFrame.flowExecutionKey:Report.flowExecutionKey},refreshReport:function(e,t,r){var o=/(\?|&)output=([^&]*)/.exec(location.href),a=o&&3===o.length?o[2]:"";dialogs.popup.show($(ajax.LOADING_ID),!0),e=e||{},e._flowExecutionKey=e._flowExecutionKey?e._flowExecutionKey:Report.reportExecutionKey(),e._eventId=e._eventId?e._eventId:"refreshReport",e.decorate="no",e.confirm="true",e.decorator="empty",e.ajax||(e.ajax="true");var n="flow.html?"+Object.toQueryString(e);return Report.requestedInputParameters=r?r:this.getParametersFromRequest(),e.freshData&&(Report.requestedInputParameters+="&freshData=true"),""===a||"html"===a?Report.isLoaded?(viewer.reportInstance.eventManager.triggerEvent("beforeAction",{name:"beforeAction",type:"reportRefresh"}),viewer.reportInstance.refreshPage(0)):viewer.loadReport().always(function(){Report.isLoaded=!0}):"pdf"===a||"swf"===a?Report.exportReport(a,n):void(window.location.href=n+"&"+Report.requestedInputParameters)},cancelReportExecution:function(){document.body.style.cursor="default",dialogs.popup.hide($(ajax.LOADING_ID)),viewer.reportInstance?viewer.reportInstance.cancelExecution().then(function(){Report.isLoaded||Report.goBack()},function(){}):Report.goBack()},getParametersFromRequest:function(){return ControlsBase.buildParams(Report.getAllRequestParameters())},getAllRequestParameters:function(){return _.isObject(Report.allRequestParameters)?Report.allRequestParameters:{}},canSaveReport:function(){return!Report.isReportReadOnly},confirmExit:function(){return!0},confirmAndLeave:function(){return Report.confirmExit()?Report.closeViewerOnExit:!1},closeViewerOnExit:function(e){viewer.exit().then(function(){e()})},showAjaxDialog:function(){dialogs.popup.show($(ajax.LOADING_ID),!0)},hideAjaxDialog:function(){dialogs.popup.hide($(ajax.LOADING_ID))}}}(window);