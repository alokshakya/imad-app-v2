app.directive('articleInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: '/blog/views/articleInfo.html' 
  }; 
});
