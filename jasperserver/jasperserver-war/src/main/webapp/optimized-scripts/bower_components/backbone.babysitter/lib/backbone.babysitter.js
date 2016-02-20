!function(i,e){if("function"==typeof define&&define.amd)define(["backbone","underscore"],function(i,t){return e(i,t)});else if("undefined"!=typeof exports){var t=require("backbone"),n=require("underscore");module.exports=e(t,n)}else e(i.Backbone,i._)}(this,function(i,e){"use strict";var t=i.ChildViewContainer;return i.ChildViewContainer=function(i,e){var t=function(i){this._views={},this._indexByModel={},this._indexByCustom={},this._updateLength(),e.each(i,this.add,this)};e.extend(t.prototype,{add:function(i,e){var t=i.cid;return this._views[t]=i,i.model&&(this._indexByModel[i.model.cid]=t),e&&(this._indexByCustom[e]=t),this._updateLength(),this},findByModel:function(i){return this.findByModelCid(i.cid)},findByModelCid:function(i){var e=this._indexByModel[i];return this.findByCid(e)},findByCustom:function(i){var e=this._indexByCustom[i];return this.findByCid(e)},findByIndex:function(i){return e.values(this._views)[i]},findByCid:function(i){return this._views[i]},remove:function(i){var t=i.cid;return i.model&&delete this._indexByModel[i.model.cid],e.any(this._indexByCustom,function(i,e){return i===t?(delete this._indexByCustom[e],!0):void 0},this),delete this._views[t],this._updateLength(),this},call:function(i){this.apply(i,e.tail(arguments))},apply:function(i,t){e.each(this._views,function(n){e.isFunction(n[i])&&n[i].apply(n,t||[])})},_updateLength:function(){this.length=e.size(this._views)}});var n=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck","reduce"];return e.each(n,function(i){t.prototype[i]=function(){var t=e.values(this._views),n=[t].concat(e.toArray(arguments));return e[i].apply(e,n)}}),t}(i,e),i.ChildViewContainer.VERSION="0.1.10",i.ChildViewContainer.noConflict=function(){return i.ChildViewContainer=t,this},i.ChildViewContainer});