app.controller("createUserCtrl", function ($scope, $http) {
   $scope.createUser = function() {
        $http.post('/view1',$scope.user).
        success(function(data) {
            console.log("posted successfully");
        })
        .error(function(data) {
            console.error("error in posting");
        });
    };

    });
