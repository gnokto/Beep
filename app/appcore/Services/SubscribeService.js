angular.module('appcore')
    .factory('SubscribeService', [
        'CloudServices','supersonic','$filter',
        function ($cloud,supersonic,$filter) {
            var self = {};

            var core_services = {
                CloudServices: $cloud
            }

            window.addEventListener("message", function (event) {
                var message = event.data;
                if (core_services[message.recipient] === undefined) {
                    steroids.logger.log("SubscribeService: This is not for me: " + message.recipient + " should get this");
                } else {
                    core_services[message.recipient][message.data.fn](message.data.params);
                }

                
            });


            return self;
        }
    ]);