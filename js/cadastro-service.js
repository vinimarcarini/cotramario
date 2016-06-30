angular.module('app.crud')

.service('cadastroService', function( $q, $window ) { 
	var keystore = 'cadastros';
	
	function listAll() {
		 return angular.fromJson($window.localStorage[keystore] || []);
	}
	function deleteFiltred( cadastros ) {
        var deferred = $q.defer();
        
        //Filtra, deixando apenas os que serão excluídos
        var filtrados = cadastros.filter(function(item){
            if (!item.selecionado)
                return item;
        });
        
        //Adiciona array no localstorage
        $window.localStorage[keystore] = angular.toJson(filtrados);
        deferred.resolve(filtrados);
        
        return deferred.promise;
	}
	function saveObject( cadastro ) {
		var deferred = $q.defer();
        
        //Pega todos os cadastros do localstorage
        var cadastros = listAll();
        
        //Verifica se deve editar (existe um atributo index) ou incluir (sem o atributo)
		if ( (cadastro.index )|| (cadastro.index ==0)) {
            var grpAux = {
                nome: cadastro.nome,
                telefone: cadastro.telefone,
                email: cadastro.email,
                cidade: cadastro.cidade,
                estado: cadastro.estado                
            };
            
            cadastros[cadastro.index] = grpAux;
        } else {
            cadastros.push(cadastro);    
        }
        
		//Adiciona array no localstorage
        $window.localStorage[keystore] = angular.toJson(cadastros);
        deferred.resolve(cadastros);
        
        return deferred.promise;
	}
	
    return {
		$list: listAll,
		$delete: deleteFiltred,
		$save: saveObject
	};
});