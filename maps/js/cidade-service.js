angular.module('app.crud')

.service('cidadeService', function( $q, $window ) { 
	var keystore = 'cidades';
	
	function listAll() {
		 return angular.fromJson($window.localStorage[keystore] || []);
	}
	function deleteFiltred( cidades ) {
        var deferred = $q.defer();
        
        //Filtra, deixando apenas os que serão excluídos
        var filtrados = cidades.filter(function(item){
            if (!item.selecionado)
                return item;
        });
        
        //Adiciona array no localstorage
        $window.localStorage[keystore] = angular.toJson(filtrados);
        deferred.resolve(filtrados);
        
        return deferred.promise;
	}
	function saveObject( cidade ) {
		var deferred = $q.defer();
        
        //Pega todos os cidades do localstorage
        var cidades = listAll();
		
        //Verifica se deve editar (existe um atributo index) ou incluir (sem o atributo)
		if ( cidade.index ) {
            var prdAux = {
                nome: cidade.nome,
                grupo: cidade.grupo
            };
            
            cidades[cidade.index] = prdAux;
        } else {
            cidades.push(cidade);    
        }
        
		//Adiciona array no localstorage
        $window.localStorage[keystore] = angular.toJson(cidades);
        deferred.resolve(cidades);
        
        return deferred.promise;
	}
	
    return {
		$list: listAll,
		$delete: deleteFiltred,
		$save: saveObject
	};
});