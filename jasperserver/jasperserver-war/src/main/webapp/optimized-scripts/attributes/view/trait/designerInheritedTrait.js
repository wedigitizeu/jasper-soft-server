define(["require","underscore"],function(e){var i=e("underscore");return{_findOriginallyInheritedModelByName:function(e,t){return i.find(e,function(e){return e.isOriginallyInherited()&&e.get("name")===t})},_filterInheritedViews:function(e){this.filteredInheriteds=this.collection.filterInheritedAttributes(e)},_findInheriteds:function(e){return this._findModelsWhere({name:e,inherited:!0})},_revertInheritedRemoval:function(e){if(!this._findInheriteds(e)){var i=this._findOriginallyInheritedModelByName(this.changedModels,e);i&&this.revertViewRemoval(i)}},_searchForInherited:function(e){var i=this;return this.collection.search(e).done(function(e){i._filterInheritedViews(e),i.collection.addItemsToCollection(i.filteredInheriteds)})},_removeInheritedView:function(e){var i=this._findInheriteds(e.get("name"));i&&this.removeView(i)},_addInheritedView:function(e){this.filteredInheriteds&&this.filteredInheriteds.length&&(e.resetField("id"),this.collection.addItemsToCollection(this.filteredInheriteds))}}});