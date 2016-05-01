angular.module('starter.services')
    .factory('Product',['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl + appConfig.methods.products, {}, {
            query: {
                isArray: false
            }
        });
    }]);