var array;
<<<<<<< HEAD
var countyNames = ["Carlow", "Cavan", "Clare", "Cork", "Derry", "Donegal", "Dublin", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Waterford", "Westmeath", "Wexford", "Wicklow"];
var counties = [1, 25, 13, 14, 26, 2, 20, 15, 3, 4, 5, 21, 16, 6, 7, 22, 8, 27, 9, 23, 24, 17, 19, 10, 11, 12];
=======
var counties = [1, 25, 13, 14, 26,  2, 20, 15, 3, 4, 5, 21, 16, 6, 7, 22, 8, 27, 9, 23, 24, 17, 19, 10, 11, 12];

var population = [1, 2, 3, 4, 5, 67, 8, 8, ];
>>>>>>> origin/master

var county = 24;
var year = 1;



$.ajax({
    url: "http://localhost/Vytas-Finn-Main-Project/Project Website/population.json",
    dataType: 'json',
    jsonpCallback: 'MyJSONPCallback',
    success: function (data) {
        array = data;
    }
});



$(document).ajaxStop(function () {
    
    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {

        // var id = parseInt(str.slice(1,5);
        var county = countyId * 24;
   
        return "<strong>" + countyId + ":</strong> <span style='color:red'> Population " + array.dataset.value[county + year] + "</span>";
    })
    var num = 0;
   
    var countyId = 0;
    var areas;
    var i = 0;
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
       .attr("stroke", "black")  
        group.call(tip);        
        var projection = d3.geo.mercator().scale(3000).translate([700, 3600]);
        path = d3.geo.path().projection(projection);
        areas = group.append("path")
       .attr("d", path)
       .attr("class", "area")
       .attr("fill", "green")
       .attr("stroke-width", "1")
       .attr("id", function (d) {               
           var countyId = "id" + num;
           num++;                        
           return "id" + num;
       })
     
       .on('mouseover', function () {


           
        
           countyId = parseInt(d3.select(this).attr("id").substr(d3.select(this).attr("id").indexOf("d") + 1));
           tip.show();
           d3.select(this)
             .transition()
             .duration(300)
             .attr('stroke-width', 3);            
       })
        .on('mouseout', function () {
            tip.hide();
            d3.select(this)
              .transition()
              .duration(500)
              .attr('stroke-width', 1)
        })

    });

       

    var IntervalId
    $("#startButton").click(function () {
        IntervalId = setInterval(function () { start() }, 1000);    
    });


    function start()
    {
        $('#slider').foundation('slider', 'set_value', i);
       
        scale(i)
        i++;
        if (i > 23) { clearInterval(IntervalId); i = 0; }
      
    }

    $(document).foundation({
        slider: {
          
            on_change: function () {

<<<<<<< HEAD
                year = parseInt($('#slider').attr('data-slider'));
                scale(year);
                i = year;
                clearInterval(IntervalId);
            }                                          
}     
    });

=======
                   
                $('#year').text((year*10) + 1800);
              
>>>>>>> origin/master

    function scale(year) {
        var count = 0;
        county = 0;
   
        if (areas != null) {

            areas.transition().duration(2000)
            .attr("transform", function (d) {
                var centroid = path.centroid(d),
                x = centroid[0],
                y = centroid[1];
                county = counties[count] * 24;
                count++;

               // console.log(array.dataset.value[county] + "     " + array.dataset.value[county + year] + "   ");
                return "translate(" + x + "," + y + ")"
                + "scale(" + array.dataset.value[county + year] / array.dataset.value[county] + ")"
                + "translate(" + -x + "," + -y + ")";
              //  + "translate(" + array.dataset.value[county + year] / array.dataset.value[county] * 10 + "," + 2 + ")";
            })
            
        }
        $('#year').text((year*10) + 1800);
    }

});








//Made
//console.log(areas);
