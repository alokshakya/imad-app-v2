app.controller('NextPageController',['$scope','$http',functioin($scope,$http){
	$scope.currentPage=10;
	$scope.totalPage=100;
	$scope.articles=[];

	//define function to get article by page number
	function GetArticleData(page){
		$scope.busy=true;
		$http({
			method:'GET',
			url:'/article/'+page+'',
		}).then(function(response)){
			$scope.articles.push(response.data);
			$scope.busy=false;
		},
		function(){
			$scope.busy=false;
		})

	}
	//end of defined function

	// call function for first time to get first article on page
	GetArticleData($scope.currentPage);

	//now implement nextPage() function
	$scope.nextPage = function{
		if($scope.busy===true) return;
		$scope.currentPage+=1;
		GetArticleData($scope.currentPage);

	};
	//end of next page function

}]);
