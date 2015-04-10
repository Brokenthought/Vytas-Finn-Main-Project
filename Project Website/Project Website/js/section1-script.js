var array;
var counties = [1,25,13,14,26,2,20,15,3,4,5,21,16,6,7,22,8,27,9,23,24,17,19,10,11,12];
$.ajax({
	url: "http://localhost/tut19/population.json",
	dataType: 'json',
	jsonpCallback: 'MyJSONPCallback', 
	success: function(data){
		array = data;

	}
});


var county = 24;
var year = 1;
var e = 0;

$(document).ajaxStop(function () 
{
	var num = 0;
	for(var i = 25; i< array.dataset.value.length; i+=24)
	{
		e++;
		if(e==28) break;
		num += parseInt(array.dataset.value[i]);
	   // console.log(array.dataset.value[i]);

	}
	console.log(num);
	
});


var population = [1,2,3,4,5,67,8,8,];
e=0;

var canvas = d3.select("#ireland")
.append("svg")
.attr("width",500)
.attr("height",600);

d3.json("ireland.json",function (data){

	var group = canvas.selectAll("g")
	.data(data.features)
	.enter()
	.append("g")

	var projection = d3.geo.mercator().scale(3000).translate([700,3600]);
    //First Increase more right
	//Second Increase more down

	var path = d3.geo.path().projection(projection);

	var areas = group.append("path")
	.attr("d",path)
	.attr("class","area")
	.attr("fill","steelblue");


	areas.transition()
	.duration(5000)
	.each("end",function() {d3.select(this).attr("fill","green");} )


	var count;
	for (var i = 1; i < 24; i++) {
		county = 0;
		count = 0;
		areas.transition().duration(1000).delay(i * 1000)
		.attr("transform", function(d) 
		{				            
			var centroid = path.centroid(d),
			x = centroid[0],
			y = centroid[1];

			county = counties[count]*24;
			count++;
			console.log(array.dataset.value[county] + "     " + array.dataset.value[county+year] + "   ");
			return "translate(" + x + "," + y + ")"
			+ "scale(" + array.dataset.value[county+i] /array.dataset.value[county] + ")"
			+ "translate(" + -x + "," +-y + ")";

		})


	}
 //Made
 //console.log(areas);
});