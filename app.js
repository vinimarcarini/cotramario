angular.module('app.index',['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	
	.when('/index', {
        templateUrl: 'index.html',
        controller: 'cadastroCtrl'
    })

	
    $routeProvider.otherwise ({ redirectTo: '/index' });
}]);