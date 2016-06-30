angular.module('app.crud')

.controller('cidadeCtrl', function ( $scope, estadoService, cidadeService ) {    
    
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
    $scope.salvar = function(cidade) {
        cidadeService.$save(cidade).then(function(data){
            $scope.cidades = data;
            //Remove o objeto do escope, fazendo com que os campos sejam limpos
            delete $scope.cidade;
            $scope.cidadeForm.$setPristine();
        });
    };
    
    //Remover
    $scope.remover = function (cidades) {
        cidadeService.$delete(cidades).then(function(data){
            $scope.cidades = data;
        });
    };
    
    //Editar
    $scope.editar = function(index, cidade) {
        $scope.cidade = angular.copy(cidade);
        $scope.cidade.index = index;
    };
})
.filter('sumQtdPreco', function () {
    return function ( data ) {        
        if (angular.isUndefined(data)) 
            return 0;
        
        var sum = 0;
        angular.forEach(data,function(value,key){
            sum = sum + (parseInt(value['qtdade']) * parseFloat(value['preco']));
        });
        return sum;
    }
});