angular.module('app.crud')

.controller('gmapsCtrl', function ( $scope, cidadeService, mapsService ) {    
    

	
	$scope.cidades = cidadeService.$list();
    
    $scope.maps = mapsService.$list();
    
	
	//Ordena as colunas
	$scope.ordenarPor = function(campo){
        $scope.criterioOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };
	

    //Adicionar
    $scope.salvar = function(map) {
        cidadeService.$save(Cidade).then(function(data){
            $scope.maps = data;
            //Remove o objeto do escope, fazendo com que os campos sejam limpos
            delete $scope.maps;
            $scope.mapsForm.$setPristine();
        });
    };

});