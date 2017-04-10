var app=angular.module("myApp", ['infinite-scroll']);
app.controller('DemoController', function($scope, $http) {
  $scope.articles=[];
  $scope.busy= {busy:0};

  $scope.after=10;
  console.log('outside nextPage() after is :'+$scope.after);
  console.log('outside nextPage() busy is :'+$scope.busy.busy);

    $scope.nextPage = function($scope,$http) {
       // console.log('inside nextPage() busy is :'+$scope.busy);
        console.log('inside nextPage() article is :'+$scope.busy.busy);
    if ($scope.busy.busy) return;
    $scope.busy.busy = 1;
    
 //make a post request to get article with data of id article id
      console.log('Inside nextPage() after is :'+$scope.after);
      console.log('value of busy is before requset :'+$scope.busy.busy);
      var article_id=$scope.after;
      console.log('article_id is :'+article_id);

      $http({method: 'GET', url: '/article/'+article_id+''}).
        then(function(response) {
          $scope.status = response.status;
          $scope.articles.push(response.data);
          $scope.after=1+$scope.after;
          $scope.busy.busy=0;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
 //end of poat request with id
   
  };
  console.log('value of busy is after requset is completed :'+$scope.busy.busy);

});


