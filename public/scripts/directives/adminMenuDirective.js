angular
  .module('waterSportApp')
  .directive('adminMenu',function(){
    return {
  		templateUrl:'scripts/directives/admin.html',
  		restrict:'E',
  		replace:false,
  		scope: {
        'user': '='
  		},
      controller:'adminController'
  	}
  })
  .controller('adminController',function ($scope,$rootScope,$cookies,$http) {
    $scope.admin = {};
    $scope.user ={};
    $scope.login = false;
    if($cookies.get('__admin')){
      $scope.user = JSON.parse($cookies.get('__admin'));
      $scope.login = true;
    }

    $scope.loginAdmin = function () {

      $http.post('/admin/api/v1/login',$scope.admin).then(function (data) {
        if(data.data.error == 1){
          alert('Invalid username or password');
        }else{
            $scope.user = data.data.user;
            $scope.login = true;
            $cookies.put('__admin',JSON.stringify(data.data.user));
        }
      },function () {
        alert('Network Error: Please retry..')
      });
    }

  })
