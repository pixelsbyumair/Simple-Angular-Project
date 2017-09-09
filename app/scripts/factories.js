

angular.module('designApp').factory('dataFactory', ['$http', function($http){

	var dataObj =  {};
	
	dataObj.services = $http.get('http://localhost:3000/services');

	dataObj.offices = $http.get('http://localhost:3000/offices');

	return dataObj;
}]);


