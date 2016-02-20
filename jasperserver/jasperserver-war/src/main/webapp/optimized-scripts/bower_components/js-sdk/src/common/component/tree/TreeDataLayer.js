define(["require","jquery.ui","underscore","jquery","common/util/classUtil","./TreeLevel","request"],function(t){"use strict";function e(t,e){return r.call(this,a.call(this,t),e)}function a(t){for(var e=0,a=t.length;a>e;e++)t[e]={id:this.extractId(t[e]),value:t[e]};return t}function r(t,e){var a,r;if(this.processors&&this.processors.length)for(var i=0,s=this.processors.length;s>i;i++){a=[];for(var n=0,o=t.length;o>n;n++)r=this.processors[i].processItem(t[n],e,this),r&&a.push(r);t=a}return t}t("jquery.ui");var i=t("underscore"),s=t("jquery"),n=t("common/util/classUtil"),o=(t("./TreeLevel"),t("request"));return n.extend({constructor:function(t){this.requestType=t.requestType?t.requestType:"GET",t.getDataUri&&(this.getDataUri=t.getDataUri),this.getDataUri||(this.getDataUri=i.template(t.dataUriTemplate)),t.getDataArray&&(this.getDataArray=t.getDataArray),t.getDataSize&&(this.getDataSize=t.getDataSize),t.extractId&&(this.extractId=t.extractId),this.levelDataId=t.levelDataId?t.levelDataId:"id",this.processors=t.processors||[],this.initialize(t)},initialize:function(t){},extractId:function(t){return t[this.levelDataId]},getDataSize:function(t,e,a){return this.getDataArray(t,e,a).length},getDataArray:function(t,e,a){return t},obtainData:function(t,a){var r=new s.Deferred,i=this;return this.predefinedData&&this.predefinedData[t.id]?r.resolve({total:this.predefinedData[t.id].length,data:this.predefinedData[t.id]}):o({type:this.requestType,dataType:this.dataType||"json",headers:{Accept:this.accept||"application/json","Content-Type":this.contentType||void 0},data:this.data||void 0,url:this.getDataUri(t)}).done(function(){i.dataSize=i.getDataSize.call(i,arguments[0],t,arguments[2]),r.resolve({total:i.dataSize,data:e.call(i,i.getDataArray.call(i,arguments[0],t,arguments[2]),t)})}).fail(function(t){r.reject(t.status,t.responseText)}),r},_process:e})});