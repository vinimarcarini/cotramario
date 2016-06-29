angular.module('app.crud')

.service('gmpsService', function( $q, $window ) { 
	var keystore = 'gmaps';
	
	function listAll() {
		 return angular.fromJson($window.localStorage[keystore] || []);
	}
    
	function saveObject( maps ) {
		var deferred = $q.defer();
        
        //Pega todos os cidades do localstorage
        var maps = listAll();
		
        //Verifica se deve editar (existe um atributo index) ou incluir (sem o atributo)
		if ( map.index ) {
            var prdAux = {
                nome: maps.nome,
                grupo: maps.grupo
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