app.controller("loginController", function ($scope, $http) {
     $scope.user={"name":"", "password":""};
    

        $scope.loginUser = function () {
            var data = $scope.user;
           console.log('username :'+ data.name);
           console.log('username :'+ data.password);
            // Create a request Object
    var request= new XMLHttpRequest();
    // Capture the response from the server and store it in a variable
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            //Take some action when XMLHttpRequst is completed
            if(request.status===200){
                //TODO
                console.log('user created succusfully');
                alert("logged in successfully");
            }
            else if(request.status===403){
                alert('user/password wrong!');
            }
            else if(request.status===500){
                alert('something went wrong on server');
            }
            else if(request.status===503){
                alert('password is wrong!');
            }
        }
        
    };
    request.open('POST', 'http://alokshakya.imad.hasura-app.io/loginuser', true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({name: data.name, password: data.password}));

        };
});
