app.controller("createUserCtrl", function ($scope, $http) {
   $scope.createUser = function() {
        $http.post('/createuser',$scope.user).
        success(function($scope.user) {
            console.log("posted successfully");
        })
        .error(function($scope.user) {
            console.error("error in posting");
        });
    };

    });
