var app=angular.module("myApp", ['infinite-scroll']);
app.controller('DemoController', function($scope, Reddit) {
  $scope.reddit = new Reddit();
});

// Reddit constructor function to encapsulate HTTP and pagination logic
app.factory('Reddit', function($http,$scope) {
  var Reddit = function() {
    $scope.articles = [];
    $scope.busy = false;
    $scope.after = '';
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;

    var url = "http://alokshakya.imad.hasura-app.io/articles/" + this.after +"";
    $http({method: 'GET', url: '/article/'+article_id+''}).
        then(function(response) {
          $scope.status = response.status;
          $scope.articles.push(response.data);
          $scope.after=1+$scope.after;
          
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      }).bind(this);
  };

  return Reddit;
});


