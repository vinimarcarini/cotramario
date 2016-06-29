angular.module('app.crud')

.controller('ProdutoCtrl', function ( $scope, $location, GrupoService, ProdutoService ) {    
    $scope.activetab = $location.path();
        
	$scope.grupos = GrupoService.$list();
	
	$scope.produtos = ProdutoService.$list();
	
	//Ordena as colunas
	$scope.ordenarPor = function(campo){
        $scope.criterioOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };
	
	//Verifica se está selecionado
    $scope.isSelecionado = function(produtos){
        
        return produtos.some(function(item){
            return item.selecionado;
        });
        
    }

    //Adicionar
    $scope.salvar = function(produto) {
        ProdutoService.$save(produto).then(function(data){
            $scope.produtos = data;
            //Remove o objeto do escope, fazendo com que os campos sejam limpos
            delete $scope.produto;
            $scope.produtoForm.$setPristine();
        });
    };
    
    //Remover
    $scope.remover = function (produtos) {
        ProdutoService.$delete(produtos).then(function(data){
            $scope.produtos = data;
        });
    };
    
    //Editar
    $scope.editar = function(index, produto) {
        $scope.produto = angular.copy(produto);
        $scope.produto.index = index;
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