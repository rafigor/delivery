angular.module('starter.services')
    .factory('ClientOrder',['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl + appConfig.methods.clientOrder, {id: '@id'}, {
            query: {
                isArray: false
            }
        });
    }])
    .factory('DeliverymanOrder',['$resource', 'appConfig', function($resource, appConfig){

        return $resource(appConfig.baseUrl + appConfig.methods.deliverymanOrder, {id: '@id'}, {
            query: {
                isArray: false
            },
            update: {
                method:  'PATCH',
                url: appConfig.baseUrl + appConfig.methods.deliverymanOrder
            },
            geo: {
                method: 'POST',
                url: appConfig.baseUrl + appConfig.methods.deliverymanOrder + '/geo'
            }
        });
    }]);