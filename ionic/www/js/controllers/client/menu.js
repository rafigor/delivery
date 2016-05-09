angular.module('starter.controllers')
    .controller('ClientMenuCtrl', [
        '$scope', '$state', 'UserData',
        function($scope, $state, UserData){

            $scope.userAuthenticated = {
                name: UserData.get().name
            };
        }
    ]);