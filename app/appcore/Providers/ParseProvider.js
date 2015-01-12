angular.module('appcore')
    .factory('ParseProvider', ['Settings', function ($config) {

    var self = {};
    self.name = "ParseProvider";
    //self.parseOrganizationObject = null;
    //self.query = null;

    self.init = function(callback) {
        steroids.logger.log("initialising parse with....");

        Parse.initialize($config.ParseApplicationId, $config.ParseJavascriptKey);
        
        //self.parseOrganizationObject = Parse.Object.extend("Organization");
        //self.query = new Parse.Query(self.parseOrganizationObject);

        //steroids.logger.log("parse DB connected!!");

        callback();
    };

    self.isLoggedIn = function() {
        return true;
    }

    self.login = function (username, password, callback) {
        steroids.logger.log("attempting Login in parseProvider: " + username + "-" + password);
        Parse.User.logIn(username.toLowerCase(), password, {
            success: function (user) {
                var data = {
                    user :user
                }
                supersonic.logger.info("LOGIN SUCCESS");
                callback(data, null);
            },
            error: function (user, error) {
                var data = {
                    user: null
                }
                //supersonic.logger.error("LOGIN ERROR : " + error.code + " " + error.message);
                callback(data, error);
            }
        });
    }

    self.register = function (username, password, callback) {
        supersonic.logger.info("starting registration...for username: "+username + " - password: " + password);
        var user = new Parse.User();
        user.set("username", username.toLowerCase());
        user.set("password", password);
        supersonic.logger.info("user" + JSON.stringify(user));

        user.signUp(null, {
            success: function (user) {
                // Hooray! Let them use the app now.
                var data = {
                    user: user
                }
                //supersonic.logger.info("REGISTER SUCCESS");
                callback(data, null);
            },
            error: function (user, error) {
                var data = {
                    user: null
                }
                // Show the error message somewhere and let the user try again.
                //supersonic.logger.error("REGISTRATION ERROR : " + error.code + " " + error.message);
                callback(data, error);
            }
        });
    };

    self.logout = function () {
        supersonic.logger.info("PARSEPROVIDER login out");
        Parse.User.logout();
    }

    return self;
}]);