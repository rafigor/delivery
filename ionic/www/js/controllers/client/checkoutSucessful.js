angular.module('starter.controllers')
    .controller('ClientCheckoutSucessful', ['$scope', '$state', '$cart',
        function($scope, $state, $cart){

            var cart = $cart.get();
            $scope.items = cart.items;
            $scope.cupom = cart.cupom;
            $scope.total = $cart.getTotalFinal();

            $cart.clear();

            $scope.openListOrder = function(){
                $state.go('client.orders');
            }
        }
    ]);