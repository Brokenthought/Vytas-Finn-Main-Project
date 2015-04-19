var array;
var counties = [1, 25, 13, 14, 26, 2, 20, 15, 3, 4, 5, 21, 16, 6, 7, 22, 8, 27, 9, 23, 24, 17, 19, 10, 11, 12];
var population = [1, 2, 3, 4, 5, 67, 8, 8, ];

var county = 24;
var year = 1;
var e = 0;











$.ajax({
    url: "http://localhost/Vytas-Finn-Main-Project/Project Website/population.json",
    dataType: 'json',
    jsonpCallback: 'MyJSONPCallback',
    success: function (data) {
        array = data;

    }
});



$(document).ajaxStop(function () {
 
    var areas;
    
    var path;
    var canvas = d3.select("#ireland")
               .append("svg")
               .attr("width", 500)
               .attr("height", 600);
    d3.json("ireland.json", function (data) {

         var group = canvas.selectAll("g")
        .data(data.features)
        .enter()
        .append("g")

        var projection = d3.geo.mercator().scale(3000).translate([700, 3600]);
        path = d3.geo.path().projection(projection);
         areas = group.append("path")
        .attr("d", path)
        .attr("class", "area")
        .attr("fill", "green");

        areas.transition()
        .duration(5000)
        .each("end", function () { d3.select(this).attr("fill", "green"); })
    });

    var new_value = 0;
    $('slider').foundation('slider', 'set_value', new_value);

    $(document).foundation({
        slider: {
            on_change: function () {

                var year = $('#slider').attr('data-slider');
                var count =0;
                county = 0;
              

                if (areas != null) {

                    areas.transition().duration(1000)
                    .attr("transform", function (d) {
                        var centroid = path.centroid(d),
                        x = centroid[0],
                        y = centroid[1];

                        county = counties[count] * 24;
                        count++;

                        year = parseInt(year);
                        console.log(array.dataset.value[county] + "     " + array.dataset.value[county + year] + "   ");
                        return "translate(" + x + "," + y + ")"
                        + "scale(" + array.dataset.value[county + year] / array.dataset.value[county] + ")"
                        + "translate(" + -x + "," + -y + ")"
                        + "translate(" + array.dataset.value[county + year] / array.dataset.value[county] * 10 + "," + 2 + ")";
                    })
                }

                   

              

                
            }
        }
    });

});









//Made
//console.log(areas);
