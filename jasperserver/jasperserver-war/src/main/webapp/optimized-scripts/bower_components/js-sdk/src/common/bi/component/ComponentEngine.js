define(["require","underscore","jquery","json3","backbone","../error/biComponentErrorFactory","./util/biComponentUtil"],function(e){"use strict";function t(e,t,i){return function(a,c,s){var u=new r.Deferred;a&&n.isFunction(a)&&u.done(a),c&&n.isFunction(c)&&u.fail(c),s&&n.isFunction(s)&&u.always(s);try{var d=e.validate();d?u.reject(o.validationError(d)):i(t,u)}catch(p){u.reject(o.javaScriptException(p))}return u}}var n=e("underscore"),r=e("jquery"),i=e("json3"),a=e("backbone"),o=e("../error/biComponentErrorFactory"),c=e("./util/biComponentUtil"),s=function(e,t){this.instanceData={properties:n.extend({},t),data:null},this.schema=i.parse(e)};return s.prototype.decorateComponent=function(e,r){c.createInstancePropertiesAndFields(e,this.instanceData,n.keys(this.schema.properties),["properties"],["data"],new a.Model),n.extend(e,{validate:c.createValidateAction(this.instanceData,this.schema),run:t(e,this.instanceData,r)})},{newInstance:function(e,t){return new s(e,t)}}});