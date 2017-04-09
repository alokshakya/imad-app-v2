app.controller('ArticleController',  function($scope, $http, $templateCache) {
 	
 	$http({method: 'GET', url: '/articles', cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.articles = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
});
