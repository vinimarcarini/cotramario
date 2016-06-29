angular.module('app.crud')

.controller('EstadoCtrl', function ( $scope, estadoService ) {    
    
	$scope.estados = estadoService.$list();
	
	//Ordena as colunas
	$scope.ordenarPor = function(campo){
        $scope.criterioOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };
	
	//Verifica se está selecionado
    $scope.isSelecionado = function(estados){
        
        return estados.some(function(item){
            return item.selecionado;
        });
        
    }

    //Adicionar
    $scope.salvar = function(Estado){
        estadoService.$save(Estado).then(function(data){
            $scope.estados = data;
            //Remove o objeto do escope, fazendo com que os campos sejam limpos
            delete $scope.Estado;
            $scope.EstadoForm.$setPristine();
        });
    };
    
    //Remover
    $scope.remover = function(estados) {
        estadoService.$delete(estados).then(function(data){
            $scope.estados = data;
        });
    };
    
    //Editar
    $scope.editar = function(index, Estado) {
        $scope.Estado = angular.copy(Estado);
        $scope.Estado.index = index;
    };
});