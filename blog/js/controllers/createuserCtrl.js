app.controller("createUserCtrl", function ($scope, $http) {
     $scope.user={"name":"enter name","email":"enter mail","password":"password enter"};
    

        $scope.createUser = function () {
           console.log('username :'+ user.username);

        };
});
