app.controller("loginController", function ($scope, $http, $templateCache) {
     $scope.user={"name":"", "password":""};
    

     $scope.fetch = function() {
      $scope.code = null;
      $scope.response = null;
      var data1=$scope.user;

      $http({method: 'POST', url: '/loginuser',data: { name: data1.name, password: data1.password }, cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    };
});
