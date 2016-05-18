angular.module('starter.controllers')
    .controller('ClientViewDeliveryCtrl', [
        '$scope',
        '$stateParams',
        '$ionicLoading',
        '$ionicPopup',
        'ClientOrder',
        'UserData',
        '$pusher',
        '$window',
        '$map',
        'uiGmapGoogleMapApi',
        function($scope,
                 $stateParams,
                 $ionicLoading,
                 $ionicPopup,
                 ClientOrder,
                 UserData,
                 $pusher,
                 $window,
                 $map,
                 uiGmapGoogleMapApi){

            var iconUrl = 'http://maps.google.com/mapfiles/kml/pal2';

            $scope.order = {};
            $scope.map = $map;
            $scope.markers = [];

            function initMarkers(order){
                var client = UserData.get().client.data;
                var address = client.zipcode + ', ' + client.address + ', ' + client.city + ' - ' + client.state;
                createMarkerClient(address);
                watchPositionDeliveryman(order.hash)
            };

            function createMarkerClient(address){
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    address: address
                }, function(results, status){
                    if (status == google.maps.GeocoderStatus.OK){
                        var lat  = results[0].geometry.location.lat(),
                            long = results[0].geometry.location.lng();
                        $scope.markers.push({
                            id: 'client',
                            coords: {
                                latitude: lat,
                                longitude: long
                            },
                            options: {
                                title: 'Local de entrega',
                                icon: iconUrl + '/icon2.png'
                            }
                        });

                    } else {
                        $ionicPopup.alert({
                            title: 'Advertência',
                            template: 'Não foi possível encontrar seu endereço'
                        });
                    }
                });
            };

            function watchPositionDeliveryman(channel){
                var pusher = $pusher($window.client),
                    pchannel = pusher.subscribe(channel);

                pchannel.bind('CodeDelivery\\Events\\GetLocationDeliveryman', function(data){
                    var lat = data.geo.lat,
                        long = data.geo.long;

                    if($scope.markers.length in [0, 1]){
                        $scope.markers.push({
                            id: 'entregador',
                            coords: {
                                latitude: lat,
                                longitude: long
                            },
                            options: {
                                title: 'Local do entregador',
                                icon: iconUrl + '/icon47.png'
                            }
                        });
                        return;
                    }

                    for(var key in $scope.markers){
                        if ($scope.markers[key].id == 'entregador'){
                            $scope.markers[key].coords = {
                                latitude: lat,
                                longitude: long
                            }
                        }
                    }
                });
            };

            function createBounds(){
                var bounds = new google.maps.LatLngBounds(),
                    latLng;
                angular.forEach($scope.markers, function(value){
                    latLng = new google.maps.LatLng(Number(value.coords.latitude), Number(value.coords.longitude));
                    bounds.extend(latLng);
                });
                $scope.map.bounds = {
                    northeast: {
                        latitude: bounds.getNorthEast().lat(),
                        longitude: bounds.getNorthEast().lng()
                    },
                    southwest: {
                        latitude: bounds.getSouthWest().lat(),
                        longitude: bounds.getSouthWest().lng()
                    }
                }
            }

            $scope.$watch('markers.length', function(value){
                if (value == 2){
                    createBounds();
                }
            })

            $ionicLoading.show({
                template: 'Carregando...'
            });

            uiGmapGoogleMapApi.then(function(maps){
                $ionicLoading.hide();
            }, function(dataError){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Advertência',
                    template: 'Não foi possível buscar o pedidos. Tente novamente'
                });
            });

            ClientOrder.get({id: $stateParams.id, include: 'items,cupom'}, function(data){
                $scope.order = data.data;
                if($scope.order.status == 1){
                    initMarkers($scope.order);
                }else{
                    $ionicPopup.alert({
                        title: 'Advertência',
                        template: 'Pedido não está em entrega.'
                    });
                }
            });
        }
    ])
    .controller('CVDControlDescentralize', [
        '$scope', '$map',
        function($scope, $map){
            $scope.map = $map;
            $scope.fit = function(){
                $scope.map.fit = !$scope.map.fit;
            };
        }
    ])
    .controller('CVDControlReload', [
        '$scope', '$window', '$timeout',
        function($scope, $window, $timeout){
            $scope.reload = function(){
                $timeout(function(){
                    $window.location.reload(true);
                }, 100);
            };
        }
    ])