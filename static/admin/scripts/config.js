/**
 * Mr. Main Street
 * version 1.0
 *
 */

function configState($stateProvider, $urlRouterProvider, $compileProvider) {

    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);

    // Set default state
    $urlRouterProvider.otherwise("/login");
    $stateProvider        
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "/static/admin/views/dashboard.html",
            data: {
                pageTitle: 'Dashboard'
            }
        })
        .state('login', {
            url: "/login",
            templateUrl: "/static/admin/views/common_view/login.html",
            data: {
                pageTitle: 'Login page',
                specialClass: 'blank'
            }
        })
        .state('common', {
            abstract: true,
            url: "/common",
            templateUrl: "/static/admin/views/common/content_empty.html",
            data: {
                pageTitle: 'Common'
            }
        })
         .state('common.reset-password', {
            url: "/reset-password",
            templateUrl: "/static/admin/views/common_view/reset-password.html",
            data: {
                pageTitle: 'Forgot Password',
                specialClass: 'blank'
            }
        })
         .state('users', {
            abstract: true,
            url: "/users",
            templateUrl: "/static/admin/views/common/content.html",
            data: {
                pageTitle: 'Users'
            }
        })
         .state('users.list', {
            url: "/list",
            templateUrl: "/static/admin/views/users/list.html",
            data: {
                pageTitle: 'Users'
            }
        })

         .state('lenders', {
            abstract: true,
            url: "/lenders",
            templateUrl: "/static/admin/views/common/content.html",
            data: {
                pageTitle: 'Lenders'
            }
        })

         .state('lenders.list', {
            url: "/list",
            templateUrl: "/static/admin/views/manage_lenders/list.html",
            data: {
                pageTitle: 'Manage Lenders'
            }
        })
         .state('lenders.create', {
            url: "/add-lender",
            templateUrl: "/static/admin/views/manage_lenders/manage.html",
            data: {
                pageTitle: 'Add Lender'
            }
        })
          .state('questions', {
            abstract: true,
            url: "/questions",
            templateUrl: "/static/admin/views/common/content.html",
            data: {
                pageTitle: 'Questions'
            }
        })
         .state('questions.list', {
            url: "/list",
            templateUrl: "/static/admin/views/manage_questions/list.html",
            data: {
                pageTitle: 'Manage Questions'
            }
        })
         .state('questions.create', {
            url: "/add-questions",
            templateUrl: "/static/admin/views/manage_questions/manage.html",
            data: {
                pageTitle: 'Add Questions'
            }
        })
         .state('reporting', {
            abstract: true,
            url: "/reporting",
            templateUrl: "/static/admin/views/common/content.html",
            data: {
                pageTitle: 'Reporting'
            }
        })
         .state('reporting.list', {
            url: "/list",
            templateUrl: "/static/admin/views/reporting/list.html",
            data: {
                pageTitle: 'Reporting'                
            }
        });        
}

angular
    .module('mmstreet')
    .config(configState)
    .config(commonHeaders)
    .constant("CONST", {
        CONFIG: {
//        BASE_URL: 'http://mmstreet.local.com/'
        BASE_URL: 'http://10.10.10.54:8000/'

    },

    /*Common messages for whole application*/
    MSG: {
        COMMON_ERROR: 'Something is wrong. Please try again later.',
        CONFIRM_RECORD_DELETE: 'Are you sure you want to delete this?',
        SUCCESS_RECORD_ADDED: 'The record has successfully added.',
        SUCCESS_RECORD_UPDATED: 'The record has been updated successfully.',
        SUCCESS_RECORD_DELETED: 'The record has been successfully deleted.',
        WAITING_REQUEST: 'Please wait, your request is being processed.',
        WAITING_DATA_RETRIEVAL: 'Please wait, data is being retrieved.'
    }
    })
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });

    /**
 * @name commonHeaders
 * @desc Set common headers to passed with every angular request
 * @param $httpProvider
 */
function commonHeaders($httpProvider,$base64) {
//dGVzdGluZ0BnbWFpbC5jb210ZXN0
    //Headers to detect ajax request
//    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
       var auth = $base64.encode("admin@admin.com:admin");
        $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + auth;
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

}