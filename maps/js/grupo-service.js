angular.module('app.crud')

.service('GrupoService', function( $q, $window ) { 
	var keystore = 'grupos';
	
	function listAll() {
		 return angular.fromJson($window.localStorage[keystore] || []);
	}
	function deleteFiltred( grupos ) {
        var deferred = $q.defer();
        
        //Filtra, deixando apenas os que serão excluídos
        var filtrados = grupos.filter(function(item){
            if (!item.selecionado)
                return item;
        });
        
        //Adiciona array no localstorage
        $window.localStorage[keystore] = angular.toJson(filtrados);
        deferred.resolve(filtrados);
        
        return deferred.promise;
	}
	function saveObject( grupo ) {
		var deferred = $q.defer();
        
        //Pega todos os grupos do localstorage
        var grupos = listAll();
        
        //Verifica se deve editar (existe um atributo index) ou incluir (sem o atributo)
		if ( (grupo.index )|| (grupo.index ==0)) {
            var grpAux = {
                nome: grupo.nome
            };
            
            grupos[grupo.index] = grpAux;
        } else {
            grupos.push(grupo);    
        }
        
		//Adiciona array no localstorage
        $window.localStorage[keystore] = angular.toJson(grupos);
        deferred.resolve(grupos);
        
        return deferred.promise;
	}
	
    return {
		$list: listAll,
		$delete: deleteFiltred,
		$save: saveObject
	};
});