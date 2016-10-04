module.exports = ['$scope', '$http', function($scope, $http) {
  $scope.message = 'Welcome!';

  $http.get('https://api.github.com/users/kainbozzetto/repos')
    .then(function(data) {
      $scope.gits = data.data;
    }, function(error) {
      console.log(error);
    });
}];