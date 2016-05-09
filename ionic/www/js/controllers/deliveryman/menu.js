angular.module('starter.controllers')
    .controller('DeliverymanMenuCtrl', ['$scope', '$state', 'User', '$ionicLoading', function($scope, $state, User, $ionicLoading){

        $scope.userAuthenticated = {
            name: ''
        };

        $ionicLoading.show({
            template: 'Carregando...'
        });

        User.authenticated({}, function(data){
            $scope.userAuthenticated = data.data;
            $ionicLoading.hide();
        }, function(dataError){
            $ionicLoading.hide();
        });
    }]);