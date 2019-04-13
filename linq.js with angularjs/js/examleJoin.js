 var hotels = [
        { id: 101, Name: "Hotel 101", WebFacilities: [8, 9, 10] },
        { id: 102, Name: "Hotel 101", WebFacilities: [8,1,2,3,4] },
        { id: 103, Name: "Hotel 101", WebFacilities: [8, 10] }
    ];

    var facilities = [
        { id: 8, Name: "Facility 8" },
        { id: 9, Name: "Facility 9" },
        { id: 10, Name: "Facility 10" }
    ];
    
	var hotelFacilities = Enumerable.From(hotels)
    .SelectMany("hotel => hotel.WebFacilities")
    .GroupBy("id => id")
    .ToArray();
	
	console.log(hotelFacilities);

var query = Enumerable.From(facilities)
    .Join(
        hotelFacilities,
        "facility => facility.id",
        "g => g.Key()",
        "(facility, g) => { id: facility.id, Name: facility.Name, Count: g.id }"
    ).ToArray();
    
console.log(query);