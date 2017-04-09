app.directive('articleInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'views/appInfo.html' 
  }; 
});
