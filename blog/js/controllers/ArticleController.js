app.controller('ArticleController', ['$scope','$http','$templateCache', function($scope, $http, $templateCache) {
	$scope.articles=[{"id":"100","title":"cheking","content":"new content","category":"category","date":"2017-02-12"}];
 	$http({method: 'GET', url: '/articles', cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.articles = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
}]);