app.controller("NextPageController", function ($scope, $http, $templateCache) {
     $scope.article={busy:false};
     $scope.article.articles=[];
     $scope.article.id = 10;
     $scope.article.end=false;
    
      $scope.article.nextPage = function() {
          console.log("state of busy is : "+$scope.article.busy);
          if(($scope.article.busy) && (!$scope.article.end) ){
              return;
          }
          $scope.article.busy=true;
      $scope.code = null;
      $scope.response = null;
      var data1=$scope.article;
      

      $http({method: 'GET', url: '/articles/'+$scope.article.id+'', cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          if(response.data.length===0){
              $scope.article.busy=false;
              $scope.article.end=true;
              return;
          }
          $scope.article.articles.push(response.data[0]);
          $scope.article.id=$scope.article.id+1;
          $scope.article.busy=false;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    };
      
});