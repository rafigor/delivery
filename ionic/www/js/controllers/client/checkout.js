angular.module('starter.controllers')
    .controller('ClientCheckoutCtrl', ['$scope', '$state', '$cart', 'Order', '$ionicLoading', '$ionicPopup', function($scope, $state, $cart, Order, $ionicLoading, $ionicPopup){
        var cart         = $cart.get();
        $scope.items      = cart.items;
        $scope.total      = cart.total;

        $scope.removeItem = function(i){
            $cart.removeItem(i);
            $scope.items.splice(i,1);
            $scope.total = $cart.get().total;
        };

        $scope.openProductDetail = function(i){
            $state.go('client.checkout_item_detail', {index: i});
        };

        $scope.openListProducts = function(){
            $state.go('client.view_products');
        };

        $scope.save = function(){
            $ionicLoading.show({
                template: 'Criando pedido...'
            });
            var items = angular.copy($scope.items);
            angular.forEach(items, function(item){
                item.product_id = item.id;
            });
            Order.save({id: null},{items: items}, function(data){
                $ionicLoading.hide();
                $state.go('client.checkout_sucessful');
            }, function(dataError){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Advertência',
                    template: 'Pedido não realizado. Tente novamente'
                });
            });
        };

        $scope.clearCart = function(){
            $cart.clear();
            this.cart = $cart.get();
            $scope.items = this.cart.items;
            $scope.total = this.cart.total;
        }
    }]);