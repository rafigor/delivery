angular.module('starter.controllers')
    .controller('OrderCtrl', [
        '$scope', '$state', '$ionicLoading', '$ionicPopup', '$ionicActionSheet', 'ClientOrder', '$timeout',
        function($scope, $state, $ionicLoading, $ionicPopup, $ionicActionSheet, ClientOrder, $timeout){
            var page = 1;
            $scope.orders = [];
            $scope.canMoreItens = true;

            $scope.openOrderDetail = function(order){
                $state.go('client.view_order',{id: order.id});
            };

            $scope.loadMore = function(){
                getOrders().then(
                    function(data){
                        angular.forEach(data.data, function (item) {
                            switch (item.status) {
                                case 0: item.statusName = 'Pendente'; break;
                                case 1: item.statusName = 'A caminho'; break;
                                case 2: item.statusName = 'Entregue'; break;
                                case 3: item.statusName = 'Cancelado'; break;
                                default: item.statusName = 'Pendente'; break;
                            }
                        });
                        $scope.orders = $scope.orders.concat(data.data);
                        if($scope.orders.length == data.meta.pagination.total){
                            $scope.canMoreItens = false;
                        }
                        page += 1;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                );
            };

            $scope.doRefresh = function(){
                page = 1;
                $scope.orders = [];
                $scope.canMoreItens = true;
                $scope.loadMore();
                $timeout(function(){
                    $scope.$broadcast('scroll.refreshComplete');
                }, 200);
            };

            $scope.showActionSheet = function(order) {
                $ionicActionSheet.show({
                    buttons: [
                        {
                            text:  'Detalhes'
                        },
                        {
                            text: 'Entrega'
                        }
                    ],
                    titleText: 'Opções',
                    cancelText: 'Cancelar',
                    cancel: function(){
                        //cancelar
                    },
                    buttonClicked: function(index){
                        switch(index){
                            case 0:
                                $state.go('client.view_order', {id: order.id});
                                break;
                            case 1:
                                $state.go('client.view_delivery', {id: order.id});
                                break;
                        }
                    }
                });
            };

            function getOrders() {
                return ClientOrder.query({
                    id: null,
                    page: page,
                    orderBy: 'created_at',
                    sortedBy: 'desc',
                    include: 'items'
                }).$promise;
            };
        }
    ]);