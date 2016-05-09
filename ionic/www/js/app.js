// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter.controllers', []);
angular.module('starter.services', []);
angular.module('starter.filters', []);

angular
    .module('starter', [
        'ionic',
        'starter.controllers',
        'starter.services',
        'starter.filters',
        'angular-oauth2',
        'ngResource',
        'ngCordova'
    ])
    .constant('appConfig',{
        baseUrl: 'http://ec2-52-39-91-55.us-west-2.compute.amazonaws.com',
        // baseUrl: 'http://delivery.localhost.com',
        methods: {
            products      : '/api/client/products',
            authenticated : '/api/authenticated',
            order         : '/api/client/order/:id',
            cupom         : '/api/cupom/:code'
        }
    })

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, OAuthProvider, OAuthTokenProvider, appConfig, $urlRouterProvider, $provide){

        OAuthProvider.configure({
            baseUrl: appConfig.baseUrl,
            clientId: 'appid01',
            clientSecret: 'secret', // optional
            grantPath: '/oauth/access_token'
        });

        OAuthTokenProvider.configure({
            name: 'token',
            options: {
                secure: false
            }
        });

        $urlRouterProvider.otherwise('login');

        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: 'LoginCtrl'
            })
            .state('client', {
                url: '/client',
                abstract: true,
                templateUrl: 'templates/client/menu.html',
                controller: 'ClientMenuCtrl'
            })
            .state('client.checkout',{
                cache: false,
                url:'/checkout',
                templateUrl: 'templates/client/checkout.html',
                controller: 'ClientCheckoutCtrl'
            })
            .state('client.checkout_item_detail',{
                cache: false,
                url:'/checkout/detail/:index',
                templateUrl:'templates/client/checkout-detail.html',
                controller: 'ClientCheckoutDetailCtrl'
            })
            .state('client.checkout_sucessful',{
                url:'/checkout/sucessful',
                templateUrl:'templates/client/checkout-sucessful.html',
                controller: 'ClientCheckoutSucessful'
            })
            .state('client.view_products',{
                cache: false,
                url:'/view_products',
                templateUrl: 'templates/client/view-product.html',
                controller: 'ClientViewProductCtrl'
            })
            .state('client.orders',{
                cache: false,
                url:'/orders',
                templateUrl: 'templates/client/order.html',
                controller: 'OrderCtrl'
            })
            .state('client.view_order',{
                url:'/view_order/:id',
                templateUrl: 'templates/client/view_order.html',
                controller: 'OrderViewCtrl'
            })
            .state('deliveryman', {
                url: '/deliveryman',
                abstract: true,
                templateUrl: 'templates/deliveryman/menu.html',
                controller: 'DeliverymanMenuCtrl'
            })
            .state('deliveryman.order', {
                url: '/order',
                templateUrl: 'templates/deliveryman/order.html',
                controller: 'DeliverymanOrderCtrl'
            })
            .state('deliveryman.view_order', {
                cache: false,
                url: '/view_order/:id',
                templateUrl: 'templates/deliveryman/view_order.html',
                controller: 'DeliverymanViewOrderCtrl'
            })


        $provide.decorator('OAuthToken',['$localStorage','$delegate',function($localStorage, $delegate){
            Object.defineProperties($delegate, {
                setToken: {
                    value: function(data){
                        return $localStorage.setObject('token',data);
                    },
                    enumerable: true,
                    configurable: true,
                    writable: true
                },
                getToken: {
                    value: function(data){
                        return $localStorage.getObject('token');
                    },
                    enumerable: true,
                    configurable: true,
                    writable: true
                },
                removeToken: {
                    value: function(data){
                        return $localStorage.setObject('token',null);
                    },
                    enumerable: true,
                    configurable: true,
                    writable: true
                }
            });
            return $delegate;
        }]);
    });