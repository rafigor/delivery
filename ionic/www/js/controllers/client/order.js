angular.module('starter.controllers')
    .controller('OrderCtrl', ['$scope', '$state', '$ionicLoading', 'Order', function($scope, $state, $ionicLoading, Order){

        $scope.orders = [];

        $scope.openOrderDetail = function(order){
            $state.go('client.view_order',{id: order.id});
        };

        $scope.doRefresh = function(){
            getOrders().then(function (data) {
                angular.forEach(data.data, function (item) {
                    switch (item.status) {
                        case 0: item.statusName = 'Pendente'; break;
                        case 1: item.statusName = 'A caminho'; break;
                        case 2: item.statusName = 'Entregue'; break;
                        case 3: item.statusName = 'Cancelado'; break;
                        default: item.statusName = 'Pendente'; break;
                    }
                });
                $scope.orders = data.data;
                $scope.$broadcast('scroll.refreshComplete');
            }, function (dataError) {
                $scope.$broadcast('scroll.refreshComplete');
                $ionicPopup.alert({
                    title: 'Advertência',
                    template: 'Não foi possível buscar a lista de pedidos. Tente novamente'
                });
            });
        }

        $ionicLoading.show({
            template: 'Carregando...'
        });

        function getOrders() {
            return Order.query({
                id: null,
                orderBy: 'created_at',
                sortedBy: 'desc'
            }).$promise;
        };
        getOrders().then(function (data) {
            angular.forEach(data.data, function (item) {
                switch (item.status) {
                    case 0: item.statusName = 'Pendente'; break;
                    case 1: item.statusName = 'A caminho'; break;
                    case 2: item.statusName = 'Entregue'; break;
                    case 3: item.statusName = 'Cancelado'; break;
                    default: item.statusName = 'Pendente'; break;
                }
            });
            $scope.orders = data.data;
            $ionicLoading.hide();
        }, function (dataError) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Advertência',
                template: 'Não foi possível buscar a lista de pedidos. Tente novamente'
            });
        });
    }]);