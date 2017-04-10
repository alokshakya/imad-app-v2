var app=angular.module("myApp", ['infinite-scroll']);
myApp.controller('DemoController', function($scope, Reddit) {
  $scope.reddit = new Reddit();
});

// Reddit constructor function to encapsulate HTTP and pagination logic
app.factory('Reddit', function($http) {
  var Reddit = function() {
    this.articles = [];
    this.busy = false;
    this.after = 12;
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;
 //make a post request to get article with data of id article id
 $scope.code = null;
      $scope.response = null;
      var article_id=this.after;
      console.log('article_id is :'+article_id);

      $http({method: 'POST', url: '/comments',data: { article_id: article_id }, cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          this.articles = response.data;
          this.after=1+articles.id;
          this.busy=false;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
 //end of poat request with id
   
  };

  return Reddit;
});