'use strict';
//var BASE_PATH  = 'http://' + window.location.hostname + '/';
 var BASE_PATH  = 'http://10.10.10.54:8000/';

(function() {
    angular.module('mrmainstreet', [
        'ui.router', // Angular flexible routing
        'ngResource', // Angular Resource
        'jcs-autoValidate', // Form validation
        'ngSanitize', // ng-bind html
        'ngNotify', // ng notification'
        'ng-sweet-alert',
        'ngDialog',
        'ui.utils.masks',
        'base64'
        
    ], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    }).config(function(ngDialogProvider) {
        ngDialogProvider.setForceHtmlReload(true);
        ngDialogProvider.setForceBodyReload(true);
        ngDialogProvider.setOpenOnePerName(true);
    })
})();