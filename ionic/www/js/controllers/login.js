angular.module('starter.controllers')
    .controller('LoginCtrl', [
        '$scope', 'OAuth', 'OAuthToken', '$ionicPopup', '$state', 'UserData', 'User',
        function($scope, OAuth, OAuthToken, $ionicPopup, $state, UserData, User){

        $scope.user = {
            username: 'user@user.com',
            password: '123456'
        };

        $scope.login = function(){

            var promisse = OAuth.getAccessToken($scope.user);
            promisse
                .then(function(data){
                    return User.authenticated({include: 'client'}).$promise;
                })
                .then(function(data){
                    UserData.set(data.data);
                    $state.go('client.orders');
                }, function(responseError){
                    UserData.set({});
                    OAuthToken.removeToken();
                    $ionicPopup.alert({
                        title: 'Advertência',
                        template: 'Login e/ou senha inválidos'
                    });
                });
        };
    }]);