angular
  .module('drawer')
  .controller('DrawerController', ['scope','supersonic' ,function ($scope, $supersonic) {
      $supersonic.logger.log("DRAWER CONTROLLER");
      $scope.supersonic = $supersonic;

      $scope.confirm = function () {
          $supersonic.logger.log("DRAWER CONTROLLER -- confirm");
          $supersonic.ui.dialog.confirm("Are you sure you want to logout?", ["Yes", "No"]).then(function (index) {
              if (index == 0) {
                  $supersonic.logger.log("User is awesome!");
              } else {
                  $supersonic.logger.log("User wasn't awesome. :(");
              }
          });
      }

  }]);