app.controller('MainController',
['$scope', function($scope) {
  $scope.title = 'Top Sellers in Books in  India';
  $scope.promo = 'promo of best books';
  $scope.products=
  [ 
  { 
    name: 'The Book of Trees', 
    price: 19, 
    pubdate: new Date('2014', '03', '08'), 
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLlYKbAR4tnsxpqWl4jmtG_E0Rw5OFWv6b45qEjCTkT8vMfJzC',
    likes:0,
    dislikes:0
  },
    { 
    name: 'Data Structure', 
    price: 35, 
    pubdate: new Date('2016', '03', '08'), 
    cover: 'http://it-ebooks.info/images/ebooks/9/data_structures_and_algorithms_in_python.jpg',
      likes:0,
      dislikes:0
  },
    { 
    name: 'Introduction to Algorithms', 
    price: 19, 
    pubdate: new Date('2017', '08', '07'), 
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLlYKbAR4tnsxpqWl4jmtG_E0Rw5OFWv6b45qEjCTkT8vMfJzC' ,
      likes:0,
      dislikes:0
  },
  { 
    name: 'Program or be Programmed', 
    price: 8, 
    pubdate: new Date('2013', '08', '01'), 
    cover: 'http://it-ebooks.info/images/ebooks/9/data_structures_and_algorithms_in_python.jpg',
    likes:0,
    dislikes:0
  } 
];
 $scope.plusOne=function(index){
   $scope.products[index].likes+=1;
 
 };
 $scope.minusOne=function(index){
   $scope.products[index].dislikes+=1;
 
 };
}]
);
