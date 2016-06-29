angular.module('app.crud')

.controller('CidadeCtrl', function ( $scope, estadoService, cidadeService ) {    
    
	$scope.estados = estadoService.$list();
	
	$scope.cidades = cidadeService.$list();
	
	//Ordena as colunas
	$scope.ordenarPor = function(campo){
        $scope.criterioOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };
	
	//Verifica se está selecionado
    $scope.isSelecionado = function(cidades){
        
        return cidades.some(function(item){
            return item.selecionado;
        });
        
    }

    //Adicionar
    $scope.salvar = function(Cidade) {
        cidadeService.$save(Cidade).then(function(data){
            $scope.cidades = data;
            //Remove o objeto do escope, fazendo com que os campos sejam limpos
            delete $scope.Cidade;
            $scope.CidadeForm.$setPristine();
        });
    };
    
    //Remover
    $scope.remover = function (cidades) {
        cidadeService.$delete(cidades).then(function(data){
            $scope.cidades = data;
        });
    };
    
    //Editar
    $scope.editar = function(index, Cidade) {
        $scope.Cidade = angular.copy(Cidade);
        $scope.Cidade.index = index;
    };
});
