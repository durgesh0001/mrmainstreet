/**
 * HOMER - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 */


angular
        .module('mrmainstreet')
        .directive('validNumber', validNumber)
        .directive('validUserName', validUserName)
        .directive('checkDomain', checkDomain)
        .directive('checkConfirmPassword', checkConfirmPassword)
        .directive('pageTitle', pageTitle)
        .directive('checkUniqueEmail', checkUniqueEmail)
        .directive('checkUniqueEmailAgent', checkUniqueEmailAgent)
        .directive('checkUniqueUsername', checkUniqueUsername)
        .directive('customMimetype', customMimetype)
        .directive('requiredOnSelect', requiredOnSelect)
        .directive('loading', loading)
        .directive('validEmail', validEmail)
        .directive('allowPattern', [allowPatternDirective]);




/*
 * @name validNumber
 * @desc Check numeric value should be positive
 * @param defaultErrorMessageResolver
 * @return Boolean
 */
validNumber.$inject = ["defaultErrorMessageResolver"];
function validNumber(defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
        errorMessages['validNumber'] = 'The value should be positive numeric value';
    });
    return {
        require: 'ngModel',
        link: function(scope, element, attributes, ctrl) {
            ctrl.$validators.validNumber = function(modelValue, viewValue) {
                if (modelValue < 0) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    };
}

/*
 * @name allowPatternDirective
 * @desc allowPatternDirective
 * @param defaultErrorMessageResolver
 * @return Boolean
 */
function allowPatternDirective() {
	return {
		restrict: "A",
		compile: function(tElement, tAttrs) {
			return function(scope, element, attrs) {
        // I handle key events
				element.bind("keypress", function(event) {
					var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
					var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.

          // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
					if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
            event.preventDefault();
						return false;
					}

				});
			};
		}
	};
}


/*
 * @name validUserName
 * @desc Check user first/last name value should be alphabatics
 * @param defaultErrorMessageResolver
 * @return Boolean
 */
validUserName.$inject = ["defaultErrorMessageResolver"];
function validUserName(defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
        errorMessages['validUserName'] = 'The value should have only alphabets.';
    });
    return {
        require: 'ngModel',
        link: function(scope, element, attributes, ctrl) {
            ctrl.$validators.validUserName = function(modelValue, viewValue) {
                if (typeof modelValue != 'undefined') {
                    //var letters = /^[A-Za-z]+$/;
                    var letters = /^[a-zA-Z ]*$/;
                    if (modelValue == '' || modelValue.match(letters)) {
                        return true;
                    } else {
                        return false;
                    }
                }

            }
        }
    };
}


/*
 * @name validEmail
 * @desc Checking valid email address
 * @param defaultErrorMessageResolver
 * @return Boolean
 */
validEmail.$inject = ["defaultErrorMessageResolver"];
function validEmail(defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
        errorMessages['validEmail'] = 'Please enter a valid email address';
    });
    return {
        require: 'ngModel',
        link: function(scope, element, attributes, ctrl) {
            ctrl.$validators.validEmail = function(modelValue, viewValue) {
                if (typeof modelValue != 'undefined' && modelValue != null) {
                    var letters = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                    if (modelValue == '' || modelValue.match(letters)) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            }
        }
    };
}



/*
 * @name loading
 * @desc Show loader
 * @param $http
 * @return Boolean
 */
loading.$inject = ["$http", "$httpBackend", "$rootScope"];
function loading($http, $httpBackend, $rootScope) {
    return {
        restrict: 'A',
        template: '<div class="loader-wrapper" ng-show="show"><div class="loader"><img src="static/public/images/loader.gif"/></div></div>',
        link: function(scope, elm, attrs)
        {

            scope.isLoading = function() {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function(v)
            {
                /* If have internal request */
                if (typeof $rootScope.internalRequest != 'undefined' && $rootScope.internalRequest == 1) {
                    return false;
                } else {
                    if (v) {
                        scope.show = true;
                    } else {
                        scope.show = false;
                    }
                }
            });
        }
    };
}


/*
 * @name checkDomain
 * @desc Check domian is exist 
 * @param defaultErrorMessageResolver
 * @return Boolean
 */
checkDomain.$inject = ["defaultErrorMessageResolver", "$http", "$q", "CONST", '$rootScope'];
function checkDomain(defaultErrorMessageResolver, $http, $q, CONST, $rootScope) {
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
        errorMessages['domainError'] = 'The selected domain already exists. Please choose someone.';
    });
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$asyncValidators.domainError = function(modelValue, viewValue) {
                var def = $q.defer();
                $rootScope.internalRequest = 1;
                $http.get(CONST.CONFIG.BASE_URL + 'admin/check-subdomain', {params: {sub_domain: modelValue, id: scope.cvCtrl.clientDetails.id}})
                        .success(function(response) {
                    $rootScope.internalRequest = 0;
                    if (response.status) {
                        def.reject();
                    } else {
                        def.resolve();
                    }
                })
                return def.promise;
            };
        }
    };
}

/*
 * @name checkUniqueEmailAgent
 * @desc Check unique email of agent
 * @param defaultErrorMessageResolver
 * @return Boolean
 */
checkUniqueEmailAgent.$inject = ["defaultErrorMessageResolver", "$http", "$q", "CONST", '$rootScope'];
function checkUniqueEmailAgent(defaultErrorMessageResolver, $http, $q, CONST, $rootScope) {
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
        errorMessages['uniqueEmailError'] = 'This email address is already associated with agent.';
    });
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: "=checkUniqueEmailAgent" /* Get userid value in edit case */
        },
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$asyncValidators.uniqueEmailError = function(modelValue, viewValue) {
                var def = $q.defer();
                $rootScope.internalRequest = 1;
                $http.get(CONST.CONFIG.BASE_URL + 'admin/check-email', {params: {email: modelValue, id: scope.otherModelValue,isAgent:1}})
                    .success(function(response) {
                        $rootScope.internalRequest = 0;
                        if (response.status) {
                            def.reject();
                        } else {
                            def.resolve();
                        }
                    })
                return def.promise;
            };
        }
    };
}

/*
 * @name checkUniqueEmail
 * @desc Check unique email 
 * @param defaultErrorMessageResolver
 * @return Boolean
 */
checkUniqueEmail.$inject = ["defaultErrorMessageResolver", "$http", "$q", "CONST", '$rootScope'];
function checkUniqueEmail(defaultErrorMessageResolver, $http, $q, CONST, $rootScope) {
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
        errorMessages['uniqueEmailError'] = 'This email address is already associated with this company.';
    });
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: "=checkUniqueEmail" /* Get userid value in edit case */
        },
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$asyncValidators.uniqueEmailError = function(modelValue, viewValue) {
                var def = $q.defer();
                $rootScope.internalRequest = 1;
                $http.get(CONST.CONFIG.BASE_URL + 'user/check-email', {params: {email: modelValue, id: scope.otherModelValue}})
                        .success(function(response) {
                    $rootScope.internalRequest = 0;
                    if (response.status) {
                        def.reject();
                    } else {
                        def.resolve();
                    }
                })
                return def.promise;
            };
        }
    };
}
/*
 * @name checkUniqueUsername
 * @desc Check unique username
 * @param defaultErrorMessageResolver
 * @return Boolean
 */
checkUniqueUsername.$inject = ["defaultErrorMessageResolver", "$http", "$q", "CONST", '$rootScope'];
function checkUniqueUsername(defaultErrorMessageResolver, $http, $q, CONST, $rootScope) {
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
        errorMessages['uniqueEmailError'] = 'This username is already associated with this company.';
    });
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: "=checkUniqueUsername" /* Get userid value in edit case */
        },
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$asyncValidators.uniqueEmailError = function(modelValue, viewValue) {
                var def = $q.defer();
                $rootScope.internalRequest = 1;
                $http.get(CONST.CONFIG.BASE_URL + 'user/check-username', {params: {username: modelValue, id: scope.otherModelValue}})
                    .success(function(response) {
                        $rootScope.internalRequest = 0;
                        if (response.status) {
                            def.reject();
                        } else {
                            def.resolve();
                        }
                    })
                return def.promise;
            };
        }
    };
}


/*
 * @name checkConfirmPassword
 * @desc Check password and confirm password
 * @param defaultErrorMessageResolver
 * @return Boolean
 */
checkConfirmPassword.$inject = ["defaultErrorMessageResolver"];
function checkConfirmPassword(defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
        errorMessages['cPassword'] = 'Password and confirm password should be match.';
    });
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: "=checkConfirmPassword"
        },
        link: function(scope, element, attributes, ctrl) {
            ctrl.$validators.cPassword = function(modelValue, viewValue) {
                return modelValue == scope.otherModelValue;
            }
            scope.$watch("otherModelValue", function() {
                ctrl.$validate();
            });
        }
    };
}


/*
 * @name pageTitle
 * @desc Display dynamic page title
 * @param $rootScope
 * @pram $timeout
 * @return Boolean
 */
pageTitle.$inject = ["$rootScope", "$timeout"];
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title
                var title = 'mrmainstreet';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle)
                    title = toState.data.pageTitle + ' - mrmainstreet';
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}

/*
 * @name customMimetype
 * @desc Custom mime type for check file validation
 * @return Boolean
 */
customMimetype.$inject = [];
function customMimetype() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ctrl) {
            if (!ctrl) {
                return;
            }
            var givenMimeTypes;
            attrs.$observe('customMimetype', function(value) {
                givenMimeTypes = value.split(',');
                ctrl.$validate();
            });
            ctrl.$validators.mimetype = function(modelValue, viewValue) {
                if (modelValue.length == 0) {
                    return true;
                }
                var boolValid = false;
                modelValue.every(function(obj, idx) {
                    if (givenMimeTypes.length > 0) {
                        givenMimeTypes.forEach(function(val) {
                            var reg = new RegExp(val, "i");
                            if (obj.lfFile.type.match(reg) && boolValid == false) {
                                boolValid = true;
                            }
                             if(obj.lfFileName.split('.').pop() == 'zip'){
                                    boolValid = true;
                                }
                        })
                    }
                });
                return boolValid;
            };
        }
    }
}

/*
 * @name requiredOnSelect
 * @desc Add custom required validation for md-select 
 * @param defaultErrorMessageResolver
 * @return Boolean
 */
requiredOnSelect.$inject = ["defaultErrorMessageResolver"];
function requiredOnSelect(defaultErrorMessageResolver, $http, $q, CONST) {
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
        errorMessages['selectRequired'] = 'The select field is required.';
    });
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.selectRequired = function(modelValue, viewValue) {
                if (modelValue == '')
                    return false
                else
                    return true;
            }
        }
    };
}






