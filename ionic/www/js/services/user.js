angular.module('starter.services')
    .factory('User',['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl + appConfig.methods.authenticated, {}, {
            query: {
                isArray: false
            },
            authenticated: {
                method: 'GET',
                url: appConfig.baseUrl + appConfig.methods.authenticated
            },
            updateDeviceToken: {
                method: 'patch',
                url: appConfig.baseUrl + appConfig.methods.device_token
            }
        });
    }]);