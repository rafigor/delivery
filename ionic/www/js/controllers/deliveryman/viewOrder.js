angular.module('starter.controllers')
    .controller('DeliverymanViewOrderCtrl', [
        '$scope', '$stateParams', '$ionicLoading', '$ionicPopup', 'DeliverymanOrder',
        function($scope, $stateParams, $ionicLoading, $ionicPopup, DeliverymanOrder){

            $scope.order = {};

            $ionicLoading.show({
                template: 'Carregando...'
            });

            DeliverymanOrder.get({id: $stateParams.id, include: 'items,cupom'}, function(data){
                $scope.order = data.data;
                $ionicLoading.hide();
            }, function(dataError){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Advertência',
                    template: 'Não foi possível buscar o pedidos. Tente novamente'
                });
            });

        }
    ]);