app.controller("NextPageController", function ($scope, $http, $templateCache) {
     $scope.article={"title":"","category":"","content":"",busy:false};
    
      $scope.nextPage = function() {
          console.log("state of busy is : "+$scope.article.state);
      $scope.code = null;
      $scope.response = null;
      var data1=$scope.article;
      console.log('username :'+data1.name);
      console.log('password :'+data1.password);

      $http({method: 'POST', url: '/createArticle',data: { title: data1.title, category: data1.category, content: data1.content }, cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    };
      
});