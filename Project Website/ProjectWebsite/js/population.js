var width = 500;
var height = 600;

var array;
var counties = [1, 25, 13, 14, 26, 2, 20, 15, 3, 4, 5, 21, 16, 6, 7, 22, 8, 27, 9, 23, 24, 17, 19, 10, 11, 12];
var county = 24;
var year = 1;
var oldYear = 0;


$.ajax({
    url: "json_files/population.json",
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
        var county = countyId * 24;
        return "<strong>" + (countyId - 1) + ":</strong> <span style='color:white'> Population " + array.dataset.value[county + year] + "</span>";
    });

    var countyId = 0;
    var areas;
    var group
    var path;
    var canvas = d3.select("#ireland")
               .append("svg")
               .attr("width", width)
               .attr("height", height);
    d3.json("json_files/ireland.json", function (data) {

        group = canvas.selectAll("g")
       .data(data.features)
       .enter()
       .append("g")
      
       .attr("stroke", "black");
        group.call(tip);
     
        var projection = d3.geo.mercator().scale(3050).translate([650, 3610]);
        path = d3.geo.path().projection(projection);

        areas = group.append("path")
       .attr("d", path)
       .attr("class", "area")
       .attr("fill", "green")
       .attr("stroke-width", "1")
            
           
           
       .attr("id", function (d, i) {
           return "id" + i;
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
        });
     
    });


    var dublin = 20;
    function scale(year) {
        var county;


       
        if (oldYear != year && areas != null) {
            oldYear = year;

            areas.transition().duration(2000)
            .attr("transform", function (d, i) {
                
                var centroid = path.centroid(d),
                x = centroid[0],
                y = centroid[1];
                county = counties[i] * 24;
               
         

                var dx = 0;// x - width / 2;
                var dy = 0;// y - height / 2;
                // var dist = Math.sqrt(dx * dx + dy * dy);

                var size = array.dataset.value[county + year] / array.dataset.value[county];

                if(i ==5 )
                {                           
                    if (year > 7) {
                        dx = 30;
                        dy = 0;
                    }

                }
                if (i == 8 && year > 14) {
                    dx = 38;
                    dy = -20;
                }

                if (i == 25 && year > 10) {
                    dx = 25;
                    dy = 25;
                }

                if (i == 16 && year > 18) {
                    dx = 4;
                    dy = 29;
                }

                return "translate(" + x + "," + y + ")"
                    + "scale(" + size + ")"
                    + "translate(" + -x + "," + -y + ")"
                    + "translate(" + dx + "," + dy + ")";

            });
        }
        $('#year').text("Year: "+  ((year * 10) + 1800));
        $('#population').text("Total population: "+ array.dataset.value[year]);
    }


    var slider = $('#slider');
    slider.call(tip);
    $(document).foundation({
        slider: {
            on_change: function () {


                year = parseInt($('#slider').attr('data-slider'))


               // 
               // tip.show();
                scale(year);
                i = year;
                clearInterval(IntervalId);
            }
        }
    });
    var IntervalId
    $("#startButton").click(function () {
        IntervalId = setInterval(function () { start() }, 4000);
    });

    function start() {
        $('#slider').foundation('slider', 'set_value', i);

        scale(i)
        i++;
        if (i > 23) { clearInterval(IntervalId); i = 0; }

    }





});








//Made
//console.log(areas);
