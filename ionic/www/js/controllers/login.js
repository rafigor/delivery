angular.module('starter.controllers')
    .controller('LoginCtrl', ['$scope', 'OAuth', '$ionicPopup', '$state', function($scope, OAuth, $ionicPopup, $state){

        $scope.user = {
            username: 'user@user.com',
            password: '123456'
        };

        $scope.login = function(){

            OAuth.getAccessToken($scope.user)
                .then(function(data){
                    $state.go('home');
                }, function(responseError){
                    $ionicPopup.alert({
                        title: 'Advertência',
                        template: 'Login e/ou senha inválidos'
                    });
                });
        };
    }]);