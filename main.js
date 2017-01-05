/*jslint vars: true, plusplus: true, devel: true, regexp: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $ */

define(function (require, exports, module) {
	'use strict';
    
	function getAllPanes(){
		return Array.from(document.querySelectorAll('#editor-holder .CodeMirror-wrap .CodeMirror-sizer>div'));
	}
	
	function getLineHeight(pane){
		var measure = pane.querySelector('.CodeMirror-measure:first-child>pre>span');
		return parseFloat(window.getComputedStyle(measure).lineHeight);
	}
	
	/*
	function getScrollAmount(pane){
		return parseFloat(pane.style.top);
	}
	function setScrollAmount(pane, amount){
		pane.style.top = amount + 'px';
	}
	
	function getOffset(pane){
		return parseFloat(pane.style.paddingBottom);
	}
	*/
	function setOffset(pane, amount){
		pane.style.paddingBottom = amount + 'px';
	}
	
	var WorkspaceManager = brackets.getModule('view/WorkspaceManager');
	
	WorkspaceManager.on('workspaceUpdateLayout', function(event, newHeight){
		getAllPanes().forEach(function(pane){
			var lineHeight = getLineHeight(pane);
			// var currentScroll = getScrollAmount(pane);
			// var currentOffset = getOffset(pane);
			var newOffset = (newHeight - lineHeight * 2);
			
			setOffset(pane, newOffset);
			
			// BUG: if we go from smaller screen to larger, then the editor 
			// seemingly cannot remember the scroll position
			// for example: we scrolled down as far as we can, top line on page
			// is 132, if we upscale the window it will change to ~104
			// the below line didn't work, I'm leaving it here for reference
			// setScrollAmount(pane, currentScroll - currentOffset + newOffset);
		});
	});
});
