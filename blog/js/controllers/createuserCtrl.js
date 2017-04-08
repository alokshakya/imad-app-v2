app.controller("createUserCtrl", function ($scope, $http) {
    $scope.user={"name":"enter name","email":"enter email","password":"password"};

        $scope.createUser = function () {
           // use $.param jQuery function to serialize data from JSON 
            /*var data = $.param({
                fName: $scope.firstName,
                lName: $scope.lastName
            });*/
            var data = $scope.user;

            console.log('user :'+user.name);
            console.log('user :'+user.email);
            console.log('user :'+user.password);
            console.log('data :'+data.name);
            console.log('data :'+data.email);
            console.log('data :'+data.password);
            console.log('data in json :'+data);
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('/createUser', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
        };

    });
