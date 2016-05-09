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
                    if(data.data.role == 'client') {
                        $state.go('client.orders');
                    } else if(data.data.role == 'deliveryman'){
                        $state.go('deliveryman.orders');
                    }
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