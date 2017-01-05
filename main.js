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
	
	function getPaneHeaderHeight(pane){
		var header = pane.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.pane-header');
		return header.offsetHeight;
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
			// var currentScroll = getScrollAmount(pane);
			// var currentOffset = getOffset(pane);
			var newOffset = newHeight - getLineHeight(pane) * 2 - getPaneHeaderHeight(pane);
			
			setOffset(pane, newOffset);
			
			// BUG: we have some issues with calculating top
			// the pane isn't the only one, which has a top, plus brackets
			// messes around with the height
			// setScrollAmount(pane, currentScroll - currentOffset + newOffset);
		});
	});
});
