angular.module('app.crud',['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	
	.when('/estados', {
        templateUrl: 'template/estado.html',
        controller: 'EstadoCtrl'
    })
	
	.when('/cidades', {
        templateUrl: 'template/cidade.html',
        controller: 'cidadeCtrl',
    });
	
    $routeProvider.otherwise ({ redirectTo: '/estados' });
}])

.directive( 'mainMenu', function() {
    return({
        templateUrl: 'template/main-menu.html',
        restrict: 'E'
    });
});