angular.module('starter.controllers')
    .controller('HomeCtrl', ['$scope', '$state', 'User', '$ionicLoading', function($scope, $state, User, $ionicLoading){

        $scope.userAuthenticated = {};

        $ionicLoading.show({
            template: 'Carregando...'
        });

        User.query({}, function(data){
            $scope.userAuthenticated = data.data;
            $ionicLoading.hide();
        }, function(dataError){
            $ionicLoading.hide();
        });

        $scope.openListOrder = function(){
            $state.go('client.orders');
        };
    }]);