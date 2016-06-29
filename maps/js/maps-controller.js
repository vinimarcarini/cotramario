angular.module('app.crud')

.controller('gmapsCtrl', function ( $scope, estadoService, cidadeService, gmapService ) {    
    
	$scope.Estados = estadoService.$list();
	
	$scope.cidades = cidadeService.$list();
    
    $scope.gmaps = gmapService.$list();
	
    
    //Adicionar
    $scope.salvar = function(gmap) {
        cidadeService.$save(gmap).then(function(data){
            $scope.cidades = data;
            //Remove o objeto do escope, fazendo com que os campos sejam limpos
            delete $scope.gmap;
            $scope.CidadeForm.$setPristine();
        });
    };
    
    //Remover
    $scope.remover = function (gmaps) {
        cidadeService.$delete(gmaps).then(function(data){
            $scope.cidades = data;
        });
    };
    
    //Editar
    $scope.editar = function(index, gmap) {
        $scope.gmap = angular.copy(gmap);
        $scope.gmap.index = index;
    };
});