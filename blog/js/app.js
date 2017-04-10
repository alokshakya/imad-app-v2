var app=angular.module("myApp", ['infinite-scroll']);
app.controller('DemoController', function($scope, $http) {
  $scope.articles=[];
  $scope.busy= false;
  $scope.after=1;

  $scope.reddit.nextPage = function($scope,$http) {
    if ($scope.busy) return;
    $scope.busy = true;
 //make a post request to get article with data of id article id
      
      
      var article_id=$scope.after;
      console.log('article_id is :'+article_id);

      $http({method: 'POST', url: '/comments',data: { article_id: article_id }}).
        then(function(response) {
          $scope.status = response.status;
          $scope.articles.push(response.data);
          $scope.after=1+$scope.articles[$scope.articles.length-1].id;
          $scope.busy=false;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
 //end of poat request with id
   
  };

});


