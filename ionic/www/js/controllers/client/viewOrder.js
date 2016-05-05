angular.module('starter.controllers')
    .controller('OrderViewCtrl', ['$scope', '$stateParams', '$ionicLoading', 'Order', function($scope, $stateParams, $ionicLoading, Order){

        $scope.order = {};

        $ionicLoading.show({
            template: 'Carregando...'
        });

        Order.get({id: $stateParams.id, include: 'items,cupom'}, function(data){
            $scope.order = data.data;
            $ionicLoading.hide();
        }, function(dataError){
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Advertência',
                template: 'Não foi possível buscar o pedidos. Tente novamente'
            });
        });
    }]);