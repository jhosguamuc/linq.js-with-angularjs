angular.module("App", [])
.controller("AppController", ["$scope",
    function ($scope) {
		
		$scope.Persona =[
		{idPersona:1,Pnombre:"jose",Snombre:"david",Papellido:"muñoz",Sapellido:"cruz",idGenero:1,idTipoPersona:2,idCiudad:1},
		{idPersona:2,Pnombre:"maria",Snombre:"elisa",Papellido:"castillo",Sapellido:"somarriba",idGenero:2,idTipoPersona:1,idCiudad:null},
		{idPersona:3,Pnombre:"jhosbeyling",Snombre:"guadalupe",Papellido:"muñoz",Sapellido:"castillo",idGenero:3,idTipoPersona:null,idCiudad:2},
		{idPersona:4,Pnombre:"jhoseling",Snombre:"dayana",Papellido:"muñoz",Sapellido:"castillo",idGenero:2,idTipoPersona:1,idCiudad:null}
		];
		$scope.Genero =[
		{idGenero:1,nombre:"hombre"},
		{idGenero:2,nombre:"mujer"},
		{idGenero:3,nombre:"otros"}
		];
		$scope.TipoPersona =[
		{idTipoPersona:1,nombre:"natural"},
		{idTipoPersona:2,nombre:"juridico"},
		{idTipoPersona:3,nombre:"otros"}
		];		
		$scope.Ciudad =[
		{idCiudad:1,nombre:"Managua"},
		{idCiudad:2,nombre:"Granada"},
		{idCiudad:3,nombre:"Masaya"}
		];
		
		
		$scope.viewPersona = Enumerable.From($scope.Persona) //Persona
		.Join($scope.Genero,//inner join Genero
		"p => p.idGenero",
		"g => g.idGenero",
		"(p,g) => {p,g}")
		.GroupJoin($scope.TipoPersona,//left join TipoPersona
		"pg => pg.p.idTipoPersona",
		"tp => tp.idTipoPersona",
		"(pg,tp) => {p:pg.p,g:pg.g,tp}")
		.SelectMany("x => x.tp.DefaultIfEmpty(null)","(pg,tp) => {p:pg.p,g:pg.g,tp}")
		.GroupJoin($scope.Ciudad,//left join Ciudad
		"pgtp => pgtp.p.idCiudad",
		"c => c.idCiudad",
		"(pgtp,c) => "+
		"{idPersona:pgtp.p.idPersona,"+
		"Pnombre:pgtp.p.Pnombre,"+
		"Snombre:pgtp.p.Snombre,"+
		"Papellido:pgtp.p.Papellido,"+
		"Sapellido:pgtp.p.Sapellido,"+
		"Genero:pgtp.g.nombre,"+
		"TipoPersona:(pgtp.tp != null ? pgtp.tp.nombre :'N/D') ,"+
		"Ciudad:c.Select(cit => cit.nombre).DefaultIfEmpty('N/D').ToString()}")
		.ToArray();

	}]);
	
	
	
	
	
	
	
	
	
	
