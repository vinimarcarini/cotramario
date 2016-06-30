angular.module('app.crud')

.controller('cadastroCtrl', function ( $scope, $location, cadastroService ) {    
    $scope.activetab = $location.path();
    
	$scope.cadastros = cadastroService.$list();
	
	//Ordena as colunas
	$scope.ordenarPor = function(campo){
        $scope.criterioOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };
	
	//Verifica se está selecionado
    $scope.isSelecionado = function(cadastros){
        
        return cadastros.some(function(item){
            return item.selecionado;
        });
        
    }

    //Adicionar
    $scope.salvar = function(cadastro){
        cadastroService.$save(cadastro).then(function(data){
            $scope.cadastros = data;
            //Remove o objeto do escope, fazendo com que os campos sejam limpos
            delete $scope.cadastro;
            $scope.cadastroForm.$setPristine();
        });
    };
    
    //Remover
    $scope.remover = function(cadastros) {
        cadastroService.$delete(cadastros).then(function(data){
            $scope.cadastros = data;
        });
    };
    
    //Editar
    $scope.editar = function(index, cadastro) {
        $scope.cadastro = angular.copy(cadastro);
        $scope.cadastro.index = index;
    };
});