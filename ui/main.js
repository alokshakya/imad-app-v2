
//submit username and password to login
var submit=document.getElementById('sub_btn');
submit.onclick = function() {
    // Create a request Object
    var request= new XMLHttpRequest();
    // Capture the response from the server and store it in a variable
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            //Take some action when XMLHttpRequst is completed
            if(request.status===200){
                //TODO
                console.log('user logged succesfully');
                alert("logged in successfully");
            }
            else if(request.status===403){
                alert('user/password wrong!');
            }
            else if(request.status===500){
                alert('something went wrong on server');
            }
        }
        
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    //for devugging purpose print username and password in console
    console.log(username);
    console.log(password);
    request.open('POST', 'http://alokshakya.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username, password: password}));
    
};