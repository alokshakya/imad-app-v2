app.controller("createCommentController", function ($scope, $http, $templateCache) {
     $scope.comment="";
     console.log('comment outside function :'+$scope.article.content);
     
      $scope.createCommentOnServer = function() {
      $scope.code = null;
      $scope.response = null;
      var data1=$scope.comment;
      console.log('article id :'+$scope.info.id);
      console.log('content :'+ data1);

      $http({method: 'POST', url: '/createComment',data: { article_id: $scope.info.id, comment: data1 }, cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    };
      
});
