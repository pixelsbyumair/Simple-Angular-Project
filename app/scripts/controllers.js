angular.module('designApp').controller('HomeController', ['$scope', 'dataFactory', function($scope, dataFactory){

	$scope.services;

	dataFactory.services.then(function(response){
		$scope.services = response.data;
	});	
	
}]).controller('ServicesController', ['$scope','dataFactory',  function($scope, dataFactory) {

	$scope.services;

	dataFactory.services.then(function(response){
		$scope.services = response.data;
	});
	
}]).controller('ContactController', ['$scope', 'dataFactory', function($scope, dataFactory){


	dataFactory.offices.then(function(response){
		$scope.offices = response.data;
		//console.log($scope.offices);
	});

}]);