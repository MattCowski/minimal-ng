var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function($scope, $firebaseObject) {
//   var ref = new Firebase("https://<your-firebase>.firebaseio.com/");
  // download the data into a local object
//   $scope.data = $firebaseObject(ref);
  $scope.test = 'testing'
  // putting a console.log here won't work, see below
});