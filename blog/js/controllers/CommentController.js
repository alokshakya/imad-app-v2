app.controller("CommentController", function ($scope, $http, $templateCache) {
     $scope.comments=[];

    
      $scope.fetchComment = function() {
      $scope.code = null;
      $scope.response = null;
      var article_id=$scope.info.id;
      console.log('article_id is :'+article_id);

      $http({method: 'POST', url: '/comments',data: { article_id: article_id }, cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.comments = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    };
    $scope.createComment = function() {
        
      $scope.code = null;
      $scope.response = null;
      var article_id=$scope.info.id;
      console.log('article_id is :'+article_id);
      $http({method: 'GET', url: '/checklogin', cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.log = response.data;
          console.log(response.data);
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
      console.log("message from server for log :"+ $scope.log);
      if($scope.log){
          
      }
      else{
          
      }

      $http({method: 'POST', url: '/comments',data: { article_id: article_id }, cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.comments = response.data;
          $scope.fetchComment();
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    };
      
});
