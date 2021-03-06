angular.module('app.crud',['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	
	.when('/grupos', {
        templateUrl: 'template/grupo.html',
        controller: 'GrupoCtrl'
    })
	
	.when('/produtos', {
        templateUrl: 'template/produto.html',
        controller: 'ProdutoCtrl'
    });
	
    $routeProvider.otherwise ({ redirectTo: '/produtos' });
}])

.directive( 'mainMenu', function() {
    return({
        templateUrl: 'template/main-menu.html',
        restrict: 'E'
    });
});