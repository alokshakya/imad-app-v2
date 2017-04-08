app.controller("createUserCtrl", function ($scope, $http) {
     $scope.user={"name":"enter name","email":"enter mail","password":"password enter"};
    

        $scope.createUser = function () {
            var data = $scope.user;
           console.log('username :'+ data.username);

        };
});
