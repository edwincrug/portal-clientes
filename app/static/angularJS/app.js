var app = angular.module('app', ['ui.router', 'httpHelper', 'ngCookies'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $stateProvider
            .state('login', {
                url: '/',
                views: {
                    admin: {
                        templateUrl: '/angularJS/templates/login.html',
                        controller: 'loginController'
                    }
                }
            })
            .state('signup', {
                url: '/registro',
                views: {
                    admin: {
                        templateUrl: '/angularJS/templates/signup.html',
                        controller: 'signupController'
                    }
                }

            })
            .state('admin', {
                abstrac: true,
                //  admin: true,
                templateUrl: '/angularJS/templates/admin.html',
                controller: 'adminController',
                views: {
                    admin: {
                        templateUrl: '/angularJS/templates/admin.html',
                        controller: 'adminController',
                    },
                    payInvoce: {
                        templateUrl: '/angularJS/templates/pendingInvoceModal.html',
                        controller: 'pendingInvoceModalController'
                    },
                    watchInvoce: {
                        templateUrl: '/angularJS/templates/watchInvoceModal.html',
                        controller: 'watchInvoceModalController'
                    }
                }
            })
            .state('admin.news', {
                url: '/noticias',
                //admin: true,
                templateUrl: '/angularJS/templates/news.html',
                controller: 'newsController'
            })
            .state('admin.detail', {
                url: "/noticias/{id:int}",
                //admin: true,
                templateUrl: '/angularJS/templates/detailNew.html',
                controller: 'detailNewsController'
            })
            .state('admin.pendingInvoce', {
                url: '/facturas-por-pagar',
                templateUrl: '/angularJS/templates/pendingInvoce.html',
                controller: 'pendingInvoceController'
            })
            .state('admin.payedInvoce', {
                url: '/facturas-pagadas',
                templateUrl: '/angularJS/templates/payedInvoce.html',
                controller: 'payedInvoceController'
            })
            .state('admin.account', {
                url: '/cuenta',
                //admin: true,
                templateUrl: '/angularJS/templates/account.html',
                controller: 'userController'
            })
            .state('activatePending', {
                url: '/activacion-pendiente',
                views: {
                    admin: {
                        templateUrl: '/angularJS/templates/activatePending.html',
                    }
                }
            })
            .state('validating', {
                url: '/activacionCuenta',
                views: {
                    admin: {
                        templateUrl: '/angularJS/templates/validate.html',
                        controller: 'validateController'
                    }
                }
            })
        $urlRouterProvider.otherwise('/');
    });

app.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        var changeHeight = function() {
            element.css('height', (w.height() - 20) + 'px');
        };
        w.bind('resize', function() {
            changeHeight(); // when window size gets changed
        });
        changeHeight(); // when page loads
    }
});
