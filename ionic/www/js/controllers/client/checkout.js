angular.module('starter.controllers')
    .controller('ClientCheckoutCtrl', [
        '$scope', '$state', '$cart', 'ClientOrder', '$ionicLoading', '$ionicPopup', 'Cupom', '$cordovaBarcodeScanner',
        function($scope, $state, $cart, ClientOrder, $ionicLoading, $ionicPopup, Cupom, $cordovaBarcodeScanner){
            var cart          = $cart.get();
            $scope.cupom      = cart.cupom;
            $scope.items      = cart.items;
            $scope.total      = $cart.getTotalFinal();

            $scope.removeItem = function(i){
                $cart.removeItem(i);
                $scope.items.splice(i,1);
                $scope.total = $cart.getTotalFinal();
            };

            $scope.openProductDetail = function(i){
                $state.go('client.checkout_item_detail', {index: i});
            };

            $scope.openListProducts = function(){
                $state.go('client.view_products');
            };

            $scope.save = function(){
                if(validateCupom()){                
                    $ionicLoading.show({
                        template: 'Criando pedido...'
                    });
                    var o = {
                        items: angular.copy($scope.items)
                    };
                    angular.forEach(o.items, function(item){
                        item.product_id = item.id;
                    });
                    if($scope.cupom.value){
                        o.cupom_code = $scope.cupom.code;
                    };
                    ClientOrder.save({id: null}, o, function(data){
                        $ionicLoading.hide();
                        $state.go('client.checkout_sucessful');
                    }, function(dataError){
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Advertência',
                            template: 'Pedido não realizado. Tente novamente'
                        });
                    });
                }   
            };

            $scope.clearCart = function(){
                $cart.clear();
                var cart = $cart.get();
                $scope.items = cart.items;
                $scope.total = $cart.getTotalFinal();
            };

            $scope.readBarCode = function(){
                $cordovaBarcodeScanner
                    .scan()
                    .then(function(barcodeData) {
                        getValueCupom(barcodeData.text);
                    }, function(error) {
                        $ionicPopup.alert({
                            title: 'Advertência',
                            template: 'Não foi possível ler o código de barras. Tente novamente'
                        });
                    });
            };

            $scope.removeCupom = function(){
                $cart.removeCupom();
                $scope.cupom = $cart.get().cupom;
                $scope.total = $cart.getTotalFinal();
            };

            function getValueCupom(code){
                $ionicLoading.show({
                    template: 'Consultando cupom...'
                });

                Cupom.get({code: code}, function(data){
                    $cart.setCupom(data.data.code, data.data.value);
                    $scope.cupom = $cart.get().cupom;
                    $scope.total = $cart.getTotalFinal();

                    $ionicLoading.hide();
                }, function(dataError){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Advertência',
                        template: 'Cupom inválido'
                    });
                });
            };

            function validateCupom(){
                if (($scope.cupom) && ($scope.cupom.value)){
                    if ($scope.cupom.value > $cart.get().total){
                        $ionicPopup.alert({
                            title: 'Advertência',
                            template: 'Valor do cupom maior que o pedido. Adicione mais itens'
                        });
                        return false;
                    }
                }
                return true;
            }
        }
    ]);