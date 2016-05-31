angular.module('starter.controllers')
    .controller('LoginCtrl', [
        '$scope', 'OAuth', 'OAuthToken', '$ionicPopup', 'UserData', 'User', '$localStorage', '$redirect',
        function($scope, OAuth, OAuthToken, $ionicPopup, UserData, User, $localStorage, $redirect){

        $scope.user = {
            username: 'user@user.com',
            password: '123456'
        };
            
        $scope.login = function(){

            var promisse = OAuth.getAccessToken($scope.user);
            promisse
                .then(function(data){
                    var token = $localStorage.get('device_token');
                    return User.updateDeviceToken({},{device_token: token}).$promise;
                })
                .then(function(data){
                    return User.authenticated({include: 'client'}).$promise;
                })
                .then(function(data){
                    UserData.set(data.data);
                    $redirect.redirectAfterLogin();
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