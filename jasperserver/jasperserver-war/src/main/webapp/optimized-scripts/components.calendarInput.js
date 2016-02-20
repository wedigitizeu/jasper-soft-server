define(["require","jquery","underscore","settings!dateTimeSettings","utils.common","config/timepickerSettings"],function(e){"use strict";var t=e("jquery"),i=e("underscore"),n=e("settings!dateTimeSettings");e("utils.common"),e("config/timepickerSettings");var a=function(e){this.container=null,"undefined"!=typeof e.container&&(this.container="undefined"==typeof e.container.jquery?t(e.container):e.container),this.name=e.name,this.id=e.name.replace(".","_"),this.value=e.value,this.onChange=e.onchange||null,this.isReadOnly="undefined"==typeof e.readOnly?!1:e.readOnly,this.hasDate="undefined"!=typeof e.date&&""!==e.date&&"true"===e.date,this.hasTime="undefined"!=typeof e.time&&""!==e.time&&"true"===e.time,this.pickerOptions=i.extend({},this.defaultPickerOptions),this.hasDate&&i.extend(this.pickerOptions,n.datepicker),this.hasTime&&i.extend(this.pickerOptions,n.timepicker),"undefined"!=typeof e.picker&&i.isObject(e.picker)&&i.extend(this.pickerOptions,e.picker),this.field=null};return a.prototype.defaultPickerOptions={showOn:"button",buttonText:"",changeYear:!0,changeMonth:!0,showButtonPanel:!0,onChangeMonthYear:null,beforeShow:t.datepicker.movePickerRelativelyToTriggerIcon},a.prototype.create=function(){var e=t("<input type='text'/>").attr({name:this.name,id:this.id,value:this.value});if(e.on("mousedown",cancelEventBubbling),this.onChange&&e.on("change",this.onChange),this.isReadOnly&&e.attr("disabled","disabled"),this.field=e,this.container.append(this.field),!this.isReadOnly){var i=this.hasDate?"date":"";i+=this.hasTime?"time":"",i+="picker",t.fn[i].call(e,this.pickerOptions).next().addClass("button").addClass("picker"),e[0].getValue=function(){return t(this).val()}}},a});