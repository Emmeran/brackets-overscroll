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
	
	var WorkspaceManager = brackets.getModule('view/WorkspaceManager');
	
	WorkspaceManager.on('workspaceUpdateLayout', function(event, newHeight){
		getAllPanes().forEach(function(pane){
			pane.style.paddingBottom = (newHeight - getLineHeight(pane) * 2) + 'px';
		});
	});
});
