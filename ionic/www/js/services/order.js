angular.module('starter.services')
    .factory('Order',['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl + appConfig.methods.order.get, {id: '@id'}, {
            query: {
                isArray: false
            }
        });
    }]);