app.controller("CommentController", function ($scope, $http, $templateCache) {
     $scope.article_id="";

    
      $scope.fetchComment = function() {
      $scope.code = null;
      $scope.response = null;
      var article_id=$scope.info.id;
      console.log('article_id is :'+article_id);

      $http({method: 'POST', url: '/comments',data: { article_id: article_id }, cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    };
      
});
