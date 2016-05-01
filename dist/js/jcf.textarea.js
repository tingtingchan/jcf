/*!
 * JavaScript Custom Forms : Textarea Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.1
 */
!function(e){e.addModule(function(t){"use strict";return{name:"Textarea",selector:"textarea",options:{resize:!0,resizerStructure:'<span class="jcf-resize"></span>',fakeStructure:'<span class="jcf-textarea"></span>'},matchElement:function(e){return e.is("textarea")},init:function(){this.initStructure(),this.attachEvents(),this.refresh()},initStructure:function(){this.doc=t(document),this.realElement=t(this.options.element),this.fakeElement=t(this.options.fakeStructure).insertAfter(this.realElement),this.resizer=t(this.options.resizerStructure).appendTo(this.fakeElement),e.modules.Scrollable&&(this.realElement.prependTo(this.fakeElement).addClass().css({overflow:"hidden",resize:"none"}),this.scrollable=new e.modules.Scrollable({element:this.realElement,alwaysShowScrollbars:!0}),this.scrollable.setScrollBarEdge(this.resizer.outerHeight()))},attachEvents:function(){this.realElement.on({focus:this.onFocus,keyup:this.onChange,change:this.onChange}),this.resizer.on("jcf-pointerdown",this.onResizePress)},onResizePress:function(e){var t=this.resizer.offset(),s=this.fakeElement.offset();e.preventDefault(),this.dragData={areaOffset:s,innerOffsetLeft:e.pageX-t.left,innerOffsetTop:e.pageY-t.top},this.doc.on({"jcf-pointermove":this.onResizeMove,"jcf-pointerup":this.onResizeRelease}),this.isFocused&&(this.focusedDrag=!0,this.realElement.focus())},onResizeMove:function(e){var t=e.pageX+this.dragData.innerOffsetLeft-this.dragData.areaOffset.left,s=e.pageY+this.dragData.innerOffsetTop-this.dragData.areaOffset.top,i=this.fakeElement.innerWidth()-this.realElement.innerWidth();e.preventDefault(),this.realElement.innerWidth(t-i).innerHeight(s),this.scrollable&&this.scrollable.rebuildScrollbars(),this.focusedDrag&&this.realElement.focus()},onResizeRelease:function(){this.doc.off({"jcf-pointermove":this.onResizeMove,"jcf-pointerup":this.onResizeRelease}),delete this.focusedDrag},onFocus:function(){this.isFocused=!0,this.fakeElement.addClass(this.options.focusClass),this.realElement.on("blur",this.onBlur)},onBlur:function(){this.isFocused=!1,this.fakeElement.removeClass(this.options.focusClass),this.realElement.off("blur",this.onBlur)},onChange:function(){this.refreshCustomScrollbars()},refreshCustomScrollbars:function(){this.scrollable&&(this.isFocused?this.scrollable.redrawScrollbars():this.scrollable.rebuildScrollbars())},refresh:function(){var e=this.realElement.is(":disabled");this.fakeElement.toggleClass(this.options.disabledClass,e),this.refreshCustomScrollbars()},destroy:function(){this.scrollable.destroy(),this.realElement.css({overflow:"",resize:""}).insertBefore(this.fakeElement).off({focus:this.onFocus,blur:this.onBlur}),this.fakeElement.remove()}}})}(jcf);