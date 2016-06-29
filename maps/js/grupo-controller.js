angular.module('app.crud')

.controller('GrupoCtrl', function ( $scope, $location, GrupoService ) {    
    $scope.activetab = $location.path();
    
	$scope.grupos = GrupoService.$list();
	
	//Ordena as colunas
	$scope.ordenarPor = function(campo){
        $scope.criterioOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };
	
	//Verifica se está selecionado
    $scope.isSelecionado = function(grupos){
        
        return grupos.some(function(item){
            return item.selecionado;
        });
        
    }

    //Adicionar
    $scope.salvar = function(grupo){
        GrupoService.$save(grupo).then(function(data){
            $scope.grupos = data;
            //Remove o objeto do escope, fazendo com que os campos sejam limpos
            delete $scope.grupo;
            $scope.grupoForm.$setPristine();
        });
    };
    
    //Remover
    $scope.remover = function(grupos) {
        GrupoService.$delete(grupos).then(function(data){
            $scope.grupos = data;
        });
    };
    
    //Editar
    $scope.editar = function(index, grupo) {
        $scope.grupo = angular.copy(grupo);
        $scope.grupo.index = index;
    };
});