angular.module('starter.controllers')
    .controller('OrderCtrl', ['$scope', '$state', '$ionicLoading', 'Order', function($scope, $state, $ionicLoading, Order){

        $ionicLoading.show({
            template: 'Carregando...'
        });

        $scope.orders = [];
        Order.query({id: null,include:'items'}, function(data){
            $ionicLoading.hide();
            angular.forEach(data.data, function(item) {
                switch(item.status){
                    case 0: item.statusName = 'Pendente'; break;
                    case 1: item.statusName = 'A caminho'; break;
                    case 2: item.statusName = 'Entregue'; break;
                    case 3: item.statusName = 'Cancelado'; break;
                    default: item.statusName = 'Pendente'; break;
                }
            });
            $scope.orders = data.data;
        }, function(dataError){
            $ionicLoading.hide();
            console.log(dataError);
        });

        $scope.openNewOrder = function(){
            $state.go('client.view_products');
        }
    }]);