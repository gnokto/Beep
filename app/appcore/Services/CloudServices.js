angular.module('appcore')
    .factory('CloudServices',
        ['ParseProvider','Settings','PublishService','MessageService',
            function ($Parse,$Settings,$publish,$msg) {
                var self = {};
                //private variables
                var currentProvider = $Parse; // ....CHANGE THIS to null

                //List of providers
                var providers = {
                    Parse: $Parse
                }

                self.init = function (params) {
                    steroids.logger.log("CLOUD SERVICES -- init method");
                    currentProvider = providers[$Settings.CloudProvider];
                    steroids.logger.log("CLOUD SERVICES -- init method -- $Settings.CloudProvider = " + $Settings.CloudProvider);
                    steroids.logger.log("CLOUD SERVICES -- init method -- currentProvider = " + JSON.stringify(currentProvider));
                    if (currentProvider !== undefined) {
                        steroids.logger.log("CLOUD SERVICES -- init method -- currentProvider = " + JSON.stringify(currentProvider));
                        currentProvider.init(function() {
                            var message = $msg(params.returnParams.recipient, params.returnParams.fn, null, null, null);
                            steroids.logger.log("CLOUD SERVICES -- init method  --  recipient: " + message.recipient);
                            $publish(message);
                        });

                    } else {
                        steroids.logger.log("CLOUD SERVICES -- init method  -- self.currentProvider is UNDEFINED = ");
                    }
                }

                self.isLoggedIn = function() {
                    return currentProvider.isLoggedIn;
                }

                self.login = function (params) {
                    steroids.logger.log("CLOUD SERVICES -- LOGIN fuction");
                    steroids.logger.log("CLOUD SERVICES -- LOGIN fuction -- current provider: " + currentProvider);
                    steroids.logger.log("CLOUD SERVICES -- LOGIN fuction -- current provider.login: " + currentProvider.login);
                    if (currentProvider.login !== undefined) {
                        //steroids.logger.log("CLOUD SERVICES -- LOGIN fuction -- about to call parse login");
                        currentProvider.login(params.fnParams[0], params.fnParams[1], function (data, error) {
                            //steroids.logger.log("recipient: " + params.returnParams.recipient);
                          
                            var message = $msg(params.returnParams.recipient, params.returnParams.fn, [data.user, error], null, null);
                           // steroids.logger.log("recipient: " + message.recipient);
                            $publish(message);
                        });
                    } else {
                        console.log("CLOUD SERVICES -- LOGIN fuction -- Current provider does not have login method");
                    }
                }

                self.register = function (params) {
                    steroids.logger.log("CLOUD SERVICES -- REGISTER fuction");
                    steroids.logger.log("CLOUD SERVICES -- REGISTER fuction -- current provider: " + currentProvider);
                    if (currentProvider.register !== undefined) {
                        //steroids.logger.log("CLOUD SERVICES -- REGISTER fuction - about to call parse REGISTER");
                        currentProvider.register(params.fnParams[0], params.fnParams[1] , function (data, error) {
                            steroids.logger.log("CLOUD SERVICES -- REGISTER fuction -- callback recipient: " + params.returnParams.recipient);
                            steroids.logger.log("CLOUD SERVICES -- REGISTER fuction -- callback function: " + params.returnParams.fn);
                           
                            var message = $msg(params.returnParams.recipient, params.returnParams.fn, [data.user, error], null, null);
                           // steroids.logger.log("recipient: " + message.recipient);
                            $publish(message);
                        });
                    } else {
                        console.log("CLOUD SERVICES -- REGISTER fuction -- Current provider does not have register method");
                    }
                }

                self.logout = function() {
                    steroids.logger.log("CLOUD SERVICES -- LOGOUT fuction");
                    if (currentProvider.logout !== undefined) {
                        currentProvider.logout();
                    }

                }

                //helper function


                return self;

            }
        ]);