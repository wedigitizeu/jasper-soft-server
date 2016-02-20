define(["require","jquery","underscore","bundle!all","backbone","!domReady","jrs.configs","scheduler/util/schedulerUtils","scheduler/view/jobsView","scheduler/view/jobEditorView"],function(e){"use strict";var t=e("jquery"),i=e("underscore"),o=(e("bundle!all"),e("backbone")),s=e("!domReady"),r=e("jrs.configs"),n=e("scheduler/util/schedulerUtils"),a=e("scheduler/view/jobsView"),d=e("scheduler/view/jobEditorView");return s(function(){i.extend(ControlsBase,r.inputControlsConstants)}),o.View.extend({className:"schedulerApp",jobsView:!1,initialize:function(e){this.options=i.extend({},e),this.runInBackgroundMode=0===document.location.hash.indexOf("#runInBackground@"),n.saveCurrentLocation(),this.schedulerStartupParams=n.getParamsFromUri(),this.masterViewMode=!this.schedulerStartupParams.reportUnitURI,this.childViewInitParams={runInBackgroundMode:this.runInBackgroundMode,masterViewMode:this.masterViewMode,reportUri:this.schedulerStartupParams.reportUnitURI,parentReportURI:this.schedulerStartupParams.parentReportURI||null},t.ajaxSetup({headers:{"X-Suppress-Basic":!0}}),t(document).on("ajaxError",function(e,t,i,o){(401===t.status||"Unauthorized"===o)&&location.reload()}),this.runInBackgroundMode?this.runNowRequest():this.openJobsListInterface()},prepareJobsView:function(){this.jobsView||(this.jobsView=new a(this.childViewInitParams),this.listenTo(this.jobsView,"createNewJobRequest",this.createNewJobRequest),this.listenTo(this.jobsView,"runNowRequest",this.runNowRequest),this.listenTo(this.jobsView,"backButtonPressed",this.backButtonPressed),this.listenTo(this.jobsView,"editJobPressed",this.openEditJobInterface))},prepareJobEditorView:function(){this.jobEditorView&&this.jobEditorView.remove(),this.jobEditorView=new d(this.childViewInitParams),this.listenTo(this.jobEditorView,"errorEditingJob",this.errorEditingJob),this.listenTo(this.jobEditorView,"cancelJobCreation",this.cancelJobCreation),this.listenTo(this.jobEditorView,"jobHasBeenCreated",this.jobHasBeenCreated)},openJobsListInterface:function(){this.prepareJobsView(),this.$el.empty(),this.jobsView.render(),this.$el.append(this.jobsView.$el),this.jobsView.refresh()},createNewJobRequest:function(){this._openNewJobInterface(!1)},runNowRequest:function(){this._openNewJobInterface(!0)},editJob:function(e){this.openEditJobInterface(e)},_openNewJobInterface:function(e){this.prepareJobEditorView(),this.jobEditorView.setRunNowMode(e),this.$el.empty(),this.jobEditorView.renderCreateNewJobInterface(),this.$el.append(this.jobEditorView.$el),this.jobEditorView.prepareModelForCreatingNewJob()},openEditJobInterface:function(e){this.prepareJobEditorView(),this.$el.empty(),this.jobEditorView.editExistingJob(e),this.$el.append(this.jobEditorView.$el)},backButtonPressed:function(){n.getBackToPreviousLocation()},errorEditingJob:function(){this.openJobsListInterface()},cancelJobCreation:function(){this.runInBackgroundMode?n.getBackToPreviousLocation():this.openJobsListInterface()},jobHasBeenCreated:function(){this.runInBackgroundMode?n.getBackToPreviousLocation():this.openJobsListInterface()}})});