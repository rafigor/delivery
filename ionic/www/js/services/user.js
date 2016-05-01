angular.module('starter.services')
    .factory('User',['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl + appConfig.methods.authenticated, {}, {
            query: {
                isArray: false
            }
        });
    }]);