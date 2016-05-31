angular.module('starter.services')
    .service('$redirect',[
        '$state', 'appConfig', 'UserData',
        function($state, appConfig, UserData){
            this.redirectAfterLogin = function(){
                var user = UserData.get();
                $state.go(appConfig.redirectAfterLogin[user.role]);
            };
        }
    ]);