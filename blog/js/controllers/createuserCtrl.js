app.controller("createUserCtrl", function ($scope, $http) {
   $scope.createUser = function() {
        $http.post('/createuser',$scope.user).
        success(function(data) {
            console.log("posted successfully");
        })
        .error(function(data) {
            console.error("error in posting");
        });
    };

    });
