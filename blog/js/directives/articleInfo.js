app.directive('articleInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'Title: {{article.title}} content: {{article.content}}' 
  }; 
});
