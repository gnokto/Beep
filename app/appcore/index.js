angular.module('appcore', [
    'common'
]).run(['SubscribeService','PublishService','CloudServices',function($subscribe,$publish,$cloud) {
    steroids.logger.log("APP > APPCORE > index.js -- running");
    $cloud.init({
        returnParams: {
            recipient: "LoginController",
            fn: "initComplete"
        }
    });

}]);
