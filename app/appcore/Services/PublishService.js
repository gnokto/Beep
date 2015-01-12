angular.module('appcore')
    .factory('PublishService', [
        function () {
            return function (message) {
                steroids.logger.log("publishservice:" + message.recipient);
                window.postMessage(message);
            }
        }
    ]);