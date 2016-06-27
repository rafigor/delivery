angular.module('starter.controllers')
    .controller('ClientMenuCtrl', [
        '$scope', '$state', 'UserData',
        function($scope, $state, UserData){

            $scope.userAuthenticated = {
                name: ''
            };

            var user = UserData.get();
            if (user != null && user.hasOwnProperty('name')){
                $scope.userAuthenticated.name = user.name;
            }

            $scope.logout = function(){
                $state.go('logout');
            };
        }
    ]);