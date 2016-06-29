angular.module('app.cotramario',['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	
	.when('/home', {
        templateUrl: 'template/grupo.html',
        controller: 'GrupoCtrl'
    })
	
    $routeProvider.otherwise ({ redirectTo: '/home' });
}])

.directive( 'mainMenu', function() {
    return({
        templateUrl: 'template/main-menu.html',
        restrict: 'E'
    });
});