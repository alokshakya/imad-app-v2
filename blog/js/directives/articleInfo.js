app.directive('articleInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    template: 'Title: {{article.title}} content: {{article.content}}' 
  }; 
});
