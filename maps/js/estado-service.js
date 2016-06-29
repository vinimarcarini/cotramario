angular.module('app.crud')

.service('estadoService', function( $q, $window ) { 
	var keystore = 'estados';
	
	function listAll() {
		 return angular.fromJson($window.localStorage[keystore] || []);
	}
	function deleteFiltred( estados ) {
        var deferred = $q.defer();
        
        //Filtra, deixando apenas os que serão excluídos
        var filtrados = estados.filter(function(item){
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
        
        //Pega todos os estados do localstorage
        var Estados = listAll();
        
        //Verifica se deve editar (existe um atributo index) ou incluir (sem o atributo)
		if ( grupo.index ) {
            var grpAux = {
                nome: grupo.nome
            };
            
            estados[grupo.index] = grpAux;
        } else {
            estados.push(grupo);    
        }
        
		//Adiciona array no localstorage
        $window.localStorage[keystore] = angular.toJson(estados);
        deferred.resolve(estados);
        
        return deferred.promise;
	}
	
    return {
		$list: listAll,
		$delete: deleteFiltred,
		$save: saveObject
	};
});