define(["require","exports","module","jquery","underscore","common/util/eventAutomation","logger","stdnav"],function(t,e,n){"use strict";var r=t("jquery"),i=(t("underscore"),t("common/util/eventAutomation")),o=t("logger").register(n),s=t("stdnav"),u=0,a=function(){u++,this.serial=u};r.extend(a.prototype,{zinit:function(t){return o.debug("stdnavPluginAnchor.init("+t+")\n"),this},activate:function(){this.behavior={ariaprep:[this,this._ariaPrep,null],ariarefresh:[this,this._ariaRefresh,null],down:[this,this._onLeftOrUp,null],enter:[this,this._onEnterOrEntered,null],entered:[this,this._onEnterOrEntered,null],inherit:!1,inheritable:!0,left:[this,this._onLeftOrUp,null],right:[this,this._onRightOrDown,null],up:[this,this._onRightOrDown,null]},s.registerNavtype(this.navtype,this.behavior,this.navtype_tags)},deactivate:function(){s.unregisterNavtype("anchor",this.behavior)},_ariaPrep:function(t){return r(t).attr("role","link"),null},_ariaRefresh:function(t){return r(t).attr("role","link"),null},_fixSubfocus:function(t){var e,n=r(t);if(n.is("A"))e=n;else if(e=r(t).closest("A"),void 0===e)return void 0;return e.find(".ghostfocus").removeClass(".ghostfocus"),e.children().find(".subfocus").removeClass(".subfocus"),e},_onFocusIn:function(t){var e,n=r(t).children(".ghostfocus");if(n.length>0)n.removeClass("ghostfocus"),e=this._fixSubfocus(n[0]);else{var i=r(t).children('li[js-navigable!="false"]');e=i.length>0?this._fixSubfocus(i[0]):t}return e},_onLeftOrUp:function(t){var e=r(t).prev("a");return e.length<1?t:e[0]},_onRightOrDown:function(t){var e=r(t).next("a");return e.length<1?t:e[0]},_onSubfocusIn:function(t){if("A"!=r(t).prop("nodeName")){var e=this._fixSubfocus(t);s.setSubfocus(e,!1)}},_onEnterOrEntered:function(t){var e=r(t);return e.is("a")&&i.simulateClickSequence(t),t}}),r.extend(a.prototype,{navtype:"anchor",navtype_tags:["A"]});var h=new a;return h});