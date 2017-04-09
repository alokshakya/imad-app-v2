app.controller("createCommentController", function ($scope, $http, $templateCache) {
     $scope.article={"title":"","category":"","content":""};
     console.log('comment outside function :'+$scope.comment);
     
      $scope.createCommentOnServer = function() {
      $scope.code = null;
      $scope.response = null;
      var data1=$scope.article;
      console.log('article id :'+$scope.info.id);
      console.log('content :'+ data1.content);

      $http({method: 'POST', url: '/createComment',data: { article_id: $scope.info.id, comment: data1.content }, cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    };
      
});
