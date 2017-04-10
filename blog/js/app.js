var app= angular.module('myApp', ['infinite-scroll']);
app.controller('DemoController',['$scope','$http', function($scope, $http) {
  $scope.articles=[];
  $scope.busy= false;

  $scope.after=10;
  console.log('outside nextPage() after is :'+$scope.after);
  console.log('outside nextPage() busy is :'+$scope.busy);

    $scope.nextPage = function($scope,$http) {
       console.log('inside nextPage() busy is :'+$scope.busy);
       
  
    
 //make a post request to get article with data of id article id
      console.log('Inside nextPage() after is :'+$scope.after);
      
      var article_id=$scope.after;
      console.log('article_id is :'+article_id);

      $http({method: 'GET', url: '/article/'+article_id+''}).
        then(function(response) {
          $scope.status = response.status;
          $scope.articles.push(response.data);
          $scope.after=1+$scope.after;
          
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
 //end of poat request with id
   
  };
  console.log('value of busy is after requset is completed :'+$scope.busy.busy);

}]);