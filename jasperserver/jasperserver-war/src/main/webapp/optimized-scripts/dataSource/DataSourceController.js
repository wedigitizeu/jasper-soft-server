define(["require","backbone","underscore","jquery","bundle!all","dataSource/model/BaseDataSourceModel","touchcontroller","common/util/featureDetection","util/historyHelper","dataSource/factory/dataSourceViewFactory","dataSource/enum/dataSourceResourceTypes","dataSource/factory/saveDialogViewFactory","text!dataSource/template/dataSourceMainTemplate.htm","jrs.configs","dataSource/collection/CustomDataSourceCollection","settings!awsSettings","dataSource/util/settingsUtility"],function(e){"use strict";var t=e("backbone"),a=e("underscore"),o=e("jquery"),r=e("bundle!all"),i=e("dataSource/model/BaseDataSourceModel"),s=e("touchcontroller"),n=e("common/util/featureDetection"),c=e("util/historyHelper"),u=e("dataSource/factory/dataSourceViewFactory"),d=e("dataSource/enum/dataSourceResourceTypes"),l=e("dataSource/factory/saveDialogViewFactory"),h=e("text!dataSource/template/dataSourceMainTemplate.htm"),S=e("jrs.configs"),p=e("dataSource/collection/CustomDataSourceCollection"),v=e("settings!awsSettings"),f=e("dataSource/util/settingsUtility");return t.View.extend({dataSourceType:!1,dataSourceView:!1,saveDialog:!1,events:{"change select[name='dataSourceType']":"onDataSourceTypeChange","click #saveBtn":"onSaveClick","click #cancelBtn":"onCancelClick"},historyBackToken:"DataSourceControllerHistory",constructor:function(e){e=o.extend(!0,{},e),arguments[0]=e,this.isEditMode=e.isEditMode,t.View.apply(this,arguments)},initialize:function(e){this.options=e,this.dataSourceType=void 0,n.supportsTouch&&this.initSwipeScroll(),c.saveReferrer(this.historyBackToken),this.fetchingCustomDataSourcesDeferred=o.Deferred(),this.fetchingTheModelDeferred=o.Deferred(),this.customDataSourceCollection=new p,this.customDataSourceCollection.fetch().done(a.bind(function(){this.renderDataSourceContainer()},this));var t=f.deepDefaults(e,{awsSettings:v});if(this.options.resourceUri){var r=this,s=new i({uri:this.options.resourceUri});s.fetch().then(function(e,t,a){r.dataSource=s.attributes,r.dataSourceType=u.getViewType(a.getResponseHeader("Content-Type"),r.dataSource),r.fetchingTheModelDeferred.resolve()})}else this.options.dataSource&&this.options.dataSourceClientType?(this.dataSource=this.options.dataSource,this.dataSourceType=u.getViewType(this.options.dataSourceClientType,this.options.dataSource),this.fetchingTheModelDeferred.resolve()):(t.awsSettings.productTypeIsEc2&&(this.dataSourceType=u.getViewType(d.AWS,null)),this.fetchingTheModelDeferred.resolve())},renderDataSourceContainer:function(){var e={AWS:"Aws",BEAN:"Bean",JDBC:"JDBC",JNDI:"JNDI",VIRTUAL:"Virtual"},t=a.chain(e).map(function(e,t){return{value:d[t].toLowerCase(),label:r["resource.dataSource.dstype"+e]}}).value();this.customDataSourceCollection.forEach(function(e){var a=e.get("id");a in{xlsDataSource:1,xlsxDataSource:1,textDataSource:1}||t.push({value:a,label:r[a+".name"]?r[a+".name"]:a})}),t=a.sortBy(t,function(e){return e.label.toLowerCase()}),this.$el.append(a.template(h,{dataSourceTypeOptions:t,i18n:r,supportsTouch:n.supportsTouch,isEditMode:this.isEditMode})),this.fetchingCustomDataSourcesDeferred.resolve()},initSwipeScroll:function(){var e=this.$("#stepDisplay");e.length&&new s(e.parent()[0],e.parent().parent()[0],{})},render:function(){o.when(this.fetchingCustomDataSourcesDeferred,this.fetchingTheModelDeferred).done(a.bind(function(){this._render()},this))},_render:function(){var e={};return this.dataSourceView&&(e={label:this.dataSourceView.model.get("label"),name:this.dataSourceView.model.get("name"),description:this.dataSourceView.model.get("description")}),this.dataSourceView&&this.dataSourceView.remove(),delete this.dataSourceView,0===this.$(".row.inputs .body:eq(0)").length&&this.$(".row.inputs > .column > .content").append("<div class='body dataSourceBody'></div>"),this.dataSourceType||(this.dataSourceType=d.JDBC.toLowerCase()),this.dataSourceView=u.getView(a.extend(this.options,{dataSourceType:this.dataSourceType,dataSource:a.extend({},this.dataSource,e),el:this.$(".row.inputs .body:eq(0)")})),this.$(".dataSourceBody").attr("dstype",this.dataSourceType.toLowerCase()),this.$("select[name='dataSourceType']").val(this.dataSourceType),this},onDataSourceTypeChange:function(e){var t=o(e.target).val();this.dataSourceType!=t&&(this.dataSourceType=t,this.render())},_prepareSaveDialog:function(){this.saveDialog&&this.saveDialog.remove();var e=l.getView(this.dataSourceType);this.saveDialog=new e(a.extend({},this.options,{model:this.dataSourceView.model,saveFn:this.options.saveFn,success:a.bind(this._onSaveDone,this),error:a.bind(this._onSaveFail,this)}))},onSaveClick:function(){if(this.dataSourceView.model.isValid(!0)){var e=this,t=function(){e._prepareSaveDialog(),e.saveDialog.startSaveDialog()};return a.isUndefined(this.dataSourceView.model.validationMethodOnSaveClick)?a.isUndefined(this.dataSourceView.validationMethodOnSaveClick)?void t():void this.dataSourceView.validationMethodOnSaveClick(t):void this.dataSourceView.model.validationMethodOnSaveClick(t)}},_onSaveDone:function(){redirectToUrl(S.contextPath+"/flow.html?_flowId=repositoryConfirmFlow&resourceType=dataSource")},_onSaveFail:function(e,t){this.saveDialog&&(this.saveDialog.close(),this.saveDialog.remove());var o,i=this,s=!1,n=!1;try{s=JSON.parse(t.responseText)}catch(c){}a.isArray(s)||(s=[s]),a.each(s,function(e){var t=!1,a=!1;e&&("mandatory.parameter.error"===e.errorCode?e.parameters&&e.parameters[0]&&(a=r["resource.datasource.saveDialog.parameterIsMissing"],t=e.parameters[0].substr(e.parameters[0].indexOf(".")+1)):"illegal.parameter.value.error"===e.errorCode&&e.parameters&&e.parameters[0]&&(t=e.parameters[0].substr(e.parameters[0].indexOf(".")+1),a=r["resource.datasource.saveDialog.parameterIsWrong"]),"ConnectionUrl"===t&&(t="connectionUrl"),a&&t&&(i.dataSourceView.invalidField("[name="+t+"]",a),n=!0))}),n===!1&&(o="Failed to save data source.",s[0]&&s[0].errorCode?o+="<br/>The reason is: "+s[0].errorCode:s.message&&(o+="<br/>The reason is: "+s.message),o+="<br/><br/>The full response from the server is: "+t.responseText,dialogs.errorPopup.show(o))},onCancelClick:function(){this.options.cancelFn?this.options.cancelFn():c.restore(this.historyBackToken)}})});