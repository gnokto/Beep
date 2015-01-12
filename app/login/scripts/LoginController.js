angular
    .module('login')
    .controller('LoginController', ['supersonic', '$scope', 'MessageService', '$filter', '$timeout',
        function ($supersonic, $scope, $msg, $filter, $timeout) {
            steroids.logger.log('in LOGIN CONTROLLER');
            $scope.thisForm = null;

            // initializing and starting appcore application.
            var appcoreview = new $supersonic.ui.View({
                location: "appcore#index",
                id: "appcore"
            });
            appcoreview.start();


            // initializing and starting appcore application.
            var drawer = new $supersonic.ui.View({
                location: "drawer#content",
                id: "drawer"
            });
            drawer.start();

            // listening to messages.
            window.addEventListener("message", function (event) {
                var message = event.data;
                if (message.recipient !== "LoginController") {
                    steroids.logger.log("LOGIN CONTROLLER: This is not for me: " + message.recipient + " should get this");
                } else {
                    steroids.logger.log("LOGIN CONTROLLER: This is for me! Yay");
                    steroids.logger.log("LOGIN CONTROLLER: message = " + JSON.stringify(message));

                    if ($scope[message.data.fn] === undefined) {
                        supersonic.logger.error("LOGIN CONTROLLER -- message listener -- function doesnt exist = " + message.data.fn);
                    }
                    if (message.data.params.length === 1) {
                        $scope[message.data.fn](message.data.params.fnParams);
                    } else {
                        $scope[message.data.fn].apply(null, message.data.params.fnParams);
                    }
                }
            });

            $scope.initComplete = function() {
                $scope.initComplete = true;
                steroids.logger.log("LOGIN CONTROLLER -- init complete");
            }

            $scope.dismissInitial = function () {
                steroids.logger.log("dismissInitial ");
                var animation = $supersonic.ui.animate("slideFromLeft");
                $supersonic.ui.initialView.dismiss(animation);
            }

            //$scope.sayHello = function() {
            //    $scope.initComplete = true;
            //    $timeout(function() {
            //        steroids.logger.log($scope.initComplete);
            //    }, 2000);
            //}

            // ---------------   LOGIN ---------------//

            $scope.continue = function () {
                var message = $msg("CloudServices", "login", ["test@test.com", "test"], "LoginController", "loginResponse");
                steroids.logger.log("LOGIN CONTROLLER - login method -- recipient: " + message.recipient);
                window.postMessage(message);
                
            }

            $scope.login = function (loginForm) {
                $scope.thisForm = loginForm;
                $scope.thisForm.$setSubmitted();
                steroids.logger.log("LOGIN CONTROLLER - login method:");
                if ($scope.thisForm.$invalid) {
                    return;
                }

                var message = $msg("CloudServices", "login", [$scope.email, $scope.password], "LoginController", "loginResponse");
                steroids.logger.log("LOGIN CONTROLLER - login method -- recipient: " + message.recipient);
                window.postMessage(message);
            }


            $scope.loginResponse = function (user, error) {

                if (user === null && error !== null) {

                    $scope.loginFailure(error);

                } else if (user !== null && error === null) {

                    $scope.loginSuccess(user);

                } else {

                    supersonic.logger.error("LOGIN ERROR --- code should never come here!");
                }

            }

            $scope.logout = function () {
                steroids.logger.log("LOGIN CONTROLLER - logout method: ");
                if ($scope.validate(username, password)) {
                    var message = $msg("CloudServices", "logout", null, "LoginController", "logoutResponse");
                    steroids.logger.log("LOGIN CONTROLLER - recipient: " + message.recipient);
                    window.postMessage(message);
                }
            }


            $scope.logoutResponse = function () {

                steroids.logger.log("LOGIN CONTROLLER - logout success");
                $scope.showLoggedIn = false;
                $scope.$apply();

            }

            $scope.loginSuccess = function (user) {

                //LOGIN here
                steroids.logger.log("LOGIN SUCCESS user: " + user);
                // $scope.showLoggedIn = true;
                $scope.dismissInitial();
                //steroids.logger.log("showLoggedIn" + $scope.showLoggedIn);

            }

            $scope.loginFailure = function (error) {
                $scope.thisForm.$setDirty();
                steroids.logger.log("LOGIN FAILURE: error message = " + error.message);
                $scope.errorMessage = error.message;
                $scope.$apply();
                return;
            }

            $scope.isLoggedIn = function (user) {

            }

            // ------------ END LOGIN ---------------//


            // -------   REGISTRATION ---------------//

            $scope.register = function (loginForm) {
                $scope.thisForm = loginForm;
                $scope.thisForm.$setSubmitted();
                steroids.logger.log("LOGIN CONTROLLER - register method: ");
                if ($scope.thisForm.$invalid) {
                    return;
                }

                var message = $msg("CloudServices", "register", [$scope.email, $scope.password], "LoginController", "registerResponse");
                steroids.logger.log("LOGIN CONTROLLER - register method - recipient: " + message.recipient);
                window.postMessage(message);

            }

            $scope.registerResponse = function (user, error) {
                steroids.logger.log("LOGIN CONTROLLER - register response method");

                if (user === null && error !== null) {

                    $scope.registrationFailure(error);

                } else if (user !== null && error === null) {

                    $scope.registrationSuccess(user);

                } else {

                    supersonic.logger.error("REGISTRATION ERROR --- code should never come here!");
                }

            }

            $scope.registrationSuccess = function (user) {
                steroids.logger.log("REGISTER SUCCESS user: " + user);

                // login the new registered user
                $scope.login($scope.thisForm);

            }

            $scope.registrationFailure = function (error) {
                $scope.thisForm.$setDirty();
                supersonic.logger.error("REGISTRATION ERROR : " + error.code + " " + error.message);
                $scope.errorMessage = error.message;
                $scope.$apply();
                return;

            }

            // -------  END  REGISTRATION ---------------//

        }]);