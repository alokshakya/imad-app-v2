app.controller("createUserCtrl", function ($scope, $http, $templateCache) {
     $scope.user={"name":"","email":"","password":""};
    
      $scope.createUser = function() {
      $scope.code = null;
      $scope.response = null;
      var data1=$scope.user;
      console.log('username :'+data1.name);
      console.log('password :'+data1.password);

      $http({method: 'POST', url: '/createUser',data: { name: data1.name, password: data1.password, email: data1.email }, cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    };
      
});
