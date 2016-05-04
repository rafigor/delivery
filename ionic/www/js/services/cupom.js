angular.module('starter.services')
    .factory('Cupom',['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl + appConfig.methods.cupom, {code: '@code'}, {
            query: {
                isArray: false
            }
        });
    }]);