angular.module('app.crud')

.service('ProdutoService', function( $q, $window ) { 
	var keystore = 'produtos';
	
	function listAll() {
		 return angular.fromJson($window.localStorage[keystore] || []);
	}
	function deleteFiltred( produtos ) {
        var deferred = $q.defer();
        
        //Filtra, deixando apenas os que serão excluídos
        var filtrados = produtos.filter(function(item){
            if (!item.selecionado)
                return item;
        });
        
        //Adiciona array no localstorage
        $window.localStorage[keystore] = angular.toJson(filtrados);
        deferred.resolve(filtrados);
        
        return deferred.promise;
	}
	function saveObject( produto ) {
		var deferred = $q.defer();
        
        //Pega todos os produtos do localstorage
        var produtos = listAll();
		
        //Verifica se deve editar (existe um atributo index) ou incluir (sem o atributo)
		if ( (produto.index )|| (produto.index ==0)) {
            var prdAux = {
                nome: produto.nome,
                grupo: produto.grupo,
                preco: produto.preco,
                qtdade: produto.qtdade
            };
            
            produtos[produto.index] = prdAux;
        } else {
            produtos.push(produto);    
        }
        
		//Adiciona array no localstorage
        $window.localStorage[keystore] = angular.toJson(produtos);
        deferred.resolve(produtos);
        
        return deferred.promise;
	}
	
    return {
		$list: listAll,
		$delete: deleteFiltred,
		$save: saveObject
	};
});