/*jslint vars: true, plusplus: true, devel: true, regexp: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $ */

define(function (require, exports, module) {
    "use strict";
    
    var AppInit = brackets.getModule("utils/AppInit");
    
    // Initialize extension
    AppInit.appReady(function () {
	    $("<style>.CodeMirror-sizer { margin-bottom: 1000px !important }</style>").appendTo("head");
    });
});
