angular.module('common')
    .factory('MessageService', [
        function () {
            return function (recipient, fn, param, self, selfFn) {
                steroids.logger.log(recipient);
                var message = {
                    recipient: recipient,
                    data: {
                        fn: fn,
                        params: {
                            fnParams: param,
                            returnParams: {
                                recipient: self,
                                fn: selfFn
                            }

                        }
                    }
                };

                return message;
            }
        }
    ]);