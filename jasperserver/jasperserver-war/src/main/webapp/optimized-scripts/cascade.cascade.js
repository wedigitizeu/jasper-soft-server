function Map(){this.keyArray=new Array,this.valArray=new Array,this.put=put,this.get=get,this.size=size,this.clear=clear,this.keySet=keySet,this.valSet=valSet,this.showMe=showMe,this.findIt=findIt,this.remove=remove}function put(e,t){var o=this.findIt(e);-1==o?(this.keyArray.push(e),this.valArray.push(t)):this.valArray[o]=t}function get(e){var t=null,o=this.findIt(e);return-1!=o&&(t=this.valArray[o]),t}function remove(e){var t=this.findIt(e);-1!=t&&(this.keyArray=this.keyArray.removeAt(t),this.valArray=this.valArray.removeAt(t))}function size(){return this.keyArray.length}function clear(){for(;this.keyArray.length>0;)this.keyArray.pop(),this.valArray.pop()}function keySet(){return this.keyArray}function valSet(){return this.valArray}function showMe(){for(var e="",t=0;t<this.keyArray.length;t++)e+="Key: "+this.keyArray[t]+"	Values: "+this.valArray[t]+"\n";return e}function findIt(e){for(var t=-1,o=0;o<this.keyArray.length;o++)if(this.keyArray[o]==e){t=o;break}return t}function removeAt(e){var t=this.slice(0,e),o=this.slice(e+1);return t.concat(o)}function initAggregate(e,t,o,r,l){}function initCascade(e){}function fireCascade(e,t,o,r,l){clearTimeout(updateCascadeTimer),null!=updateCascadeTimer&&(cancelProgressDialog(),updateCascadeTimer=null),controlClicked=o,controlClickedControlType=r,updateCascadeTimer=setTimeout("showProgressDialog()",1e3),controlMap.put(o,populateEnvelope(t,o,r,l));var a=function(e,t){"java.lang.SecurityException"==t.javaClassName&&(document.location=".")};dwr.engine.setErrorHandler(a),RemoteCascadeDirector.handleEvents(e,getControlsWithSelectedOptionsOnly(controlMap.valSet()),refreshAllControls),resetReportOptionsSelect(),setTimeout("updateCascadeTimer",0)}function resetReportOptionsSelect(){var e=$("savedValues");e&&(e.selectedIndex=0)}function autoCascade(e,t){clearTimeout(updateCascadeTimer),null!=updateCascadeTimer&&(cancelProgressDialog(),updateCascadeTimer=null),controlClicked=null,controlClickedControlType=null,reportOptionsClicked=!0,updateCascadeTimer=setTimeout("showProgressDialog()",1e3),RemoteCascadeDirector.autoPopulate(e,getControlsWithSelectedOptionsOnly(controlMap.valSet()),t,refreshAllControls),setTimeout("updateCascadeTimer",0)}function refreshAllControls(e){if(void 0!=e)for(var t=0;t<e.length;t++){var o=e[t];if((8==o.controlType||9==o.controlType||10==o.controlType||11==o.controlType)&&o.controlName==controlClicked){var r=document.getElementsByName(o.controlName).length;if(r>0)continue}if(6==o.controlType||7==o.controlType){var l=document.getElementById(o.controlName).options;if(o.controlName==controlClicked&&l.length>0)continue;var a=o.options;if(!reportOptionsClicked&&l.length==a.length){for(var n=!1,i=0;i<l.length;i++)if(l[i].value!=a[i].value||l[i].selected!=a[i].selected){n=!0;break}if(!n)continue}}refreshControl(o)}if(isItDashboard()&&controlClicked){designerBase=window.designerBase;var c=null;if(8==controlClickedControlType||9==controlClickedControlType||10==controlClickedControlType||11==controlClickedControlType){var s=null;s=8==controlClickedControlType||9==controlClickedControlType?$$("input[type=radio][name='"+controlClicked+"']"):$$("input[type=checkbox][name='"+controlClicked+"']"),controlClicked=s[0]}if($(controlClicked)){var u=$(controlClicked).readAttribute("data-frameName");u&&(localContext.getMode()==designerBase.DASHBOARD?(c=localContext._getFrameByNameAndType(localContext.CONTROL_FRAME,u),c&&localContext.updateInputControlParams(c)):(c=localContext._getControlFrameObjectByName(u),localContext._controlParamsUpdated(c)))}controlClicked=null,controlClickedControlType=null}clearTimeout(updateCascadeTimer),null!=updateCascadeTimer&&(cancelProgressDialog(),updateCascadeTimer=null),reportOptionsClicked=!1}function isItDashboard(){return localContext&&window.designerBase&&localContext.getMode&&(localContext.getMode()==window.designerBase.DASHBOARD||localContext.getMode()==window.designerBase.DASHBOARD_RUNTIME)}function refreshControl(e){var t=e.controlName;if(3==e.controlType||4==e.controlType||6==e.controlType||7==e.controlType){if(e.permanent||(dwr.util.removeAllOptions(t),dwr.util.addOptions(t,e.options,"value","label")),(6==e.controlType||7==e.controlType)&&maxMultiSelectSize){var o=document.getElementById(e.controlName),r=document.getElementById(e.controlName).options;o.size=Math.min(r.length,maxMultiSelectSize)}3==e.controlType||4==e.controlType?dwr.util.setValue(t,e.controlValue):dwr.util.setValue(t,e.selections);var l=document.getElementById(t);l.disabled=e.disabled}else if(1==e.controlType)dwr.util.setValue(e.controlName,"true"==e.controlValue);else if(2==e.controlType)dwr.util.setValue(e.controlName,e.controlValue);else if(8==e.controlType||9==e.controlType||10==e.controlType||11==e.controlType)if(e.permanent)8==e.controlType||9==e.controlType?dwr.util.setValue(t,e.controlValue):dwr.util.setValue(t,e.selections);else if(isItDashboard())updateRadiosAndCheckboxes(e,getParamsForDashboardCheckBoxOrRadioCreation,createDashboardCheckBoxOrRadioElement,dashboardResetOnclick,localContext.resetButton);else{var a=function(e){resetRadio(this.form[e.controlName])&&fireCascade($F("reportUnitURI"),e.resourceUriPrefix,e.controlName,e.controlType,e.disabled)}.curry(e);updateRadiosAndCheckboxes(e,getParamsForRuntimeCheckBoxOrRadioCreation,createRuntimeCheckBoxOrRadioElement,a,resetButtonLabel)}var n=$("jsCtrl_"+t);if(n){var i=$(n).select("button.picker");i.each(function(t){e.disabled?t.addClassName(layoutModule.HIDDEN_CLASS):t.removeClassName(layoutModule.HIDDEN_CLASS)}),e.visible?$(n).removeClassName(layoutModule.HIDDEN_CLASS):$(n).addClassName(layoutModule.HIDDEN_CLASS)}var c=controlMap.get(e.controlName);c.controlValue=dwr.util.getValue(e.controlName),c.options=getSelections(e.controlName,e.controlType);var s=$(t);s&&s.show()}function createRuntimeCheckBoxOrRadioElement(e,t){var o=new Element("input",{style:"position: relative","class":"",name:e.controlName,type:8==e.controlType||9==e.controlType?"radio":"checkbox",value:t.value});t.selected&&o.writeAttribute("checked","checked"),e.disabled&&o.writeAttribute("disabled","disabled"),o.observe(isIE()?"click":"change",function(){fireCascade($("reportUnitURI").value,e.resourceUriPrefix,e.controlName,e.controlType,e.disabled)});var r=new Element("label",{"class":"control "+e.controlType==8||9==e.controlType?"radio":"checkBox"}),l=new Element("span",{"class":""}).update(t.label);r.insert(o),r.insert(l);var a=new Element("li",{"class":""});return a.insert(r),a}function getParamsForRuntimeCheckBoxOrRadioCreation(e){var t=$("jsCtrl_"+e.controlName).select("ul")[0];return t?{parentElement:t}:null}function dashboardResetOnclick(){var e,t=this.up("div"),o=t.select("div");o.each(function(t){var o=t.readAttribute("data-frameName");o&&(e=o)});var r=this.up("ul").select("input");resetRadio(r)&&r.length>0&&e&&(controlClicked=r[0],localContext._inputControlOnChange("controlFrameOverlay_"+e))}function createDashboardCheckBoxOrRadioElement(e,t,o){var r=new Element("input",{"class":"dynamicInputControl","data-frameName":o.frameName,"data-frameType":"controlFrame",name:e.controlName,type:8==e.controlType||9==e.controlType?"radio":"checkBox",value:t.value});t.selected&&r.writeAttribute("checked","checked"),o.readOnly&&r.writeAttribute("disabled","disabled"),r.observe("click",function(){return localContext._inputControlOnChange("controlFrameOverlay_"+o.frameName)});var l=new Element("label",{"class":"control "+e.controlType==8||9==e.controlType?"radio":"checkBox"}),a=new Element("span",{"class":"wrap"}).update(t.label);l.insert(r),l.insert(a);var n=new Element("li",{"class":"leaf"});return n.insert(l),n}function getParamsForDashboardCheckBoxOrRadioCreation(e){var t=$$("div[data-inputControlName='"+e.controlName+"']");if(0==t.length)return null;var o=t[0].up();if(!o)return null;var r=o.select("ul");return{frame:o,frameName:t[0].readAttribute("data-frameName"),readOnly:"true"===t[0].readAttribute("data-isReadOnly"),parentElement:r.first()}}function updateRadiosAndCheckboxes(e,t,o,r,l){var a=t(e);if(a&&a.parentElement&&(a.parentElement.update(""),e.options.each(function(t){var r=o(e,t,a);a.parentElement.insert(r)}),e.options.first()&&!e.mandatory&&(8==e.controlType||9==e.controlType))){var n=a.parentElement.select("li"),i=new Element("li",{"class":"leaf"}),c=new Element("button",{"class":"button action up",type:"button"});c.observe("click",r);var s=new Element("span",{"class":"wrap"}).update(l);n[0].insert({before:i.insert(c.insert(s))})}}function getSelections(e,t){var o=[];if(3==t||4==t||6==t||7==t)for(var r=document.getElementById(e),l=0;void 0!=r&&l<r.options.length;l++){var a={selected:r.options[l].selected,label:r.options[l].text,value:r.options[l].value};o.push(a)}else if(t>=8&&11>=t){var n=document.getElementsByName(e);if(void 0==n)return o;if(n[0])for(l=0;l<n.length;l++){var a={selected:n[l].checked,label:n[l].value,value:n[l].value};o.push(a)}else{var a={selected:n.checked,label:n.value,value:n.value};o.push(a)}}return o}function populateEnvelope(e,t,o,r){var l=getSelections(t,o),a={controlName:t,controlValue:dwr.util.getValue(t),resourceUriPrefix:e,controlType:o,options:l,visible:!0,disabled:r,wrappersUUID:wrappersUUID};return a}function refreshControlsMap(){for(var e=0;e<controlMap.valArray.length;e++){var t=controlMap.valArray[e];controlMap.put(t.controlName,populateEnvelope(t.resourceUriPrefix,t.controlName,t.controlType,t.disabled))}}function initializeEnvelope(e,t,o,r,l){var a=populateEnvelope(e,t,o,r),n="";if(6==o||7==o||10==o||11==o){var i=new Map;if(l.length>2){for(var c=l.substring(1,l.length-1),s=c.split("=true,"),u=0;u<s.length;u++){var d=s[u];if(d=d.replace(/^\s+|\s+$/g,""),d.lastIndexOf("=true")>-1&&(d=d.substring(0,d.length-5)),d.length>0){var p={selected:!0,label:d,value:d};i.put(d,p)}}a.options=i.valSet()}}else n=l;return a.controlValue=n,a}function getControlsWithSelectedOptionsOnly(e){for(var t=new Array,o=0;o<e.length;o++){var r=e[o],l={controlName:r.controlName,controlValue:r.controlValue,resourceUriPrefix:r.resourceUriPrefix,controlType:r.controlType,options:new Array,visible:r.visible,disabled:r.disabled,wrappersUUID:wrappersUUID};if(r.options)for(var a=0;a<r.options.length;a++){var n=r.options[a];if(n.selected){var i={selected:n.selected,label:n.label,value:n.value};l.options.push(i)}}t.push(l)}return t}function showProgressDialog(){showProgressTimeout=null,dialogs.popup.show($(ajax.LOADING_ID),!0)}function cancelProgressDialog(){var e=showProgressTimeout;null!=e?(showProgressTimeout=null,clearTimeout(e)):hideProgressDialog()}function hideProgressDialog(){dialogs.popup.hide($(ajax.LOADING_ID))}var showProgressTimeout=null,updateCascadeTimer=null,controlClicked=null,controlClickedControlType=null,wrappersUUID=null,resetButtonLabel=null,maxMultiSelectSize=null,reportOptionsClicked=!1;Array.prototype.removeAt=removeAt;var controlMap=new Map;