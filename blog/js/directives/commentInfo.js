app.directive('commentInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: '/blog/views/commentInfo.html' 
  }; 
});
