angular.module('starter.controllers')
    .controller('DeliverymanViewOrderCtrl', [
        '$scope', '$stateParams', '$ionicLoading', '$ionicPopup', 'DeliverymanOrder', '$cordovaGeolocation',
        function($scope, $stateParams, $ionicLoading, $ionicPopup, DeliverymanOrder, $cordovaGeolocation){

            var watch,
                lat = null,
                long = null;

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

            $scope.goToDelivery = function(){
                $ionicPopup.alert({
                    title: 'Advertência',
                    template: 'Para parar a localização clique em ok'
                }).then(function(){
                    stopWatchPosition();
                });
                DeliverymanOrder.update({id: $stateParams.id}, {status: 1}, function(data) {
                    var watchOptions = {
                        timeout: 3000,
                        enableHighAccuracy: false
                    };
                    watch = $cordovaGeolocation.watchPosition(watchOptions);
                    watch.then(null, function(dataError){
                        //error
                    }, function(position){
                        if (!lat) {
                            lat = position.coords.latitude;
                            long = position.coords.longitude;
                        } else {
                            long += 0.0444;
                        }
                        DeliverymanOrder.geo({id: $stateParams.id}, {
                            lat: lat,
                            long: long
                        });
                    });
                }, function(dataError){
                    $ionicPopup.alert({
                        title: 'Advertência',
                        template: 'Não foi possível atualizar o status do pedido. Tente novamente'
                    });
                });
            };

            function stopWatchPosition(){
                if(watch && typeof watch == 'object' && watch.hasOwnProperty('watchID')){
                    $cordovaGeolocation.clearWatch(watch.watchID);
                }
            };
        }
    ]);