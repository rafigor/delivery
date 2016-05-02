angular.module('starter.controllers')
    .controller('OrderCtrl', ['$scope', '$state', '$ionicLoading', 'Order', function($scope, $state, $ionicLoading, Order){

        $ionicLoading.show({
            template: 'Carregando...'
        });

        $scope.orders = [];
        Order.query({id: null,include:'items'}, function(data){
            $ionicLoading.hide();
            $scope.orders = data.data;
        }, function(dataError){
            $ionicLoading.hide();
            console.log(dataError);
        });

        $scope.openNewOrder = function(){
            $state.go('client.view_products');
        }
    }]);