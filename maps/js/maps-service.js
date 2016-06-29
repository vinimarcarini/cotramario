angular.module('app.crud')

.service('gmapService', function( $q, $window ) { 
	var keystore = 'gmaps';
	
	function listAll() {
		 return angular.fromJson($window.localStorage[keystore] || []);
	}
	function deleteFiltred( gmaps ) {
        var deferred = $q.defer();
        
        //Filtra, deixando apenas os que serão excluídos
        var filtrados = gmaps.filter(function(item){
            if (!item.selecionado)
                return item;
        });
        
        //Adiciona array no localstorage
        $window.localStorage[keystore] = angular.toJson(filtrados);
        deferred.resolve(filtrados);
        
        return deferred.promise;
	}
	function saveObject( gmap ) {
		var deferred = $q.defer();
        
        //Pega todos os gmaps do localstorage
        var gmaps = listAll();
		
        //Verifica se deve editar (existe um atributo index) ou incluir (sem o atributo)
		if ( gmap.index ) {
            var prdAux = {
                nome: gmap.nome,
                grupo: gmap.grupo
            };
            
            gmaps[gmap.index] = prdAux;
        } else {
            gmaps.push(gmap);    
        }
        
		//Adiciona array no localstorage
        $window.localStorage[keystore] = angular.toJson(gmaps);
        deferred.resolve(gmaps);
        
        return deferred.promise;
	}
	
    return {
		$list: listAll,
		$delete: deleteFiltred,
		$save: saveObject
	};
});