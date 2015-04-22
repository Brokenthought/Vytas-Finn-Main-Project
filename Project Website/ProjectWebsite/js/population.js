var array;
var counties = [1, 25, 13, 14, 26, 2, 20, 15, 3, 4, 5, 21, 16, 6, 7, 22, 8, 27, 9, 23, 24, 17, 19, 10, 11, 12];

var county = 24;
var year = 1;
var oldYear = 0;


//d3.force






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
        var county = countyId * 24;
        return "<strong>" +( countyId-1 )+ ":</strong> <span style='color:red'> Population " + array.dataset.value[county + year] + "</span>";
    })


    var nodes = [];


    var countyNodes = [[]];



    var num = 0;
    var countyId = 0;
    var areas;
    var i = 0;
    var path;



    var canvas = d3.select("#ireland")
               .append("svg")
               .attr("width", 400)
               .attr("height", 400);
    d3.json("ireland.json", function (data) {



        var group = canvas.selectAll("g")
       .data(data.features)
       .enter()
       .append("g")
       .attr("stroke", "black")
        group.call(tip);

        var projection = d3.geo.mercator().scale(3200).translate([700, 3600]);
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
        .each(function (d) {
            var x, y;
            var centroid = path.centroid(d),
                x = centroid[0],
                y = centroid[1];
            nodes.push({ x: x, y: y });
        });

        var links = [];


        for (var i = 0; i < nodes.length ; i++) {

            for (var j = i; j < nodes.length ; j++) {

                var dx = nodes[i].x - nodes[j].x;

                var dy = nodes[i].y - nodes[j].y;

                var dist = Math.sqrt(dx * dx + dy * dy);

                links.push({ source: i, target: j, length: dist});

            }

        }

        var force = d3.layout.force()
        .size([400, 400])
        .nodes(nodes)
        .links(links);

        force.linkDistance(function (d) {
            return d.length;
        })


        //force.gravity(.2);
      //  force.charge(-300);
        var link = canvas.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link');

        var node = canvas.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node');

        force.on('tick', function () {
            var num = 0;
            areas.transition().duration(0)

            .attr("transform", function (d) {

                var centroid = path.centroid(d),
                x = nodes[num].x  -centroid[0] ,
                y = nodes[num].y - centroid[1];

                //console.log(x + "      " + nodes[num].x);

                num++;
                return "translate(" +  x + "," +  y + ")"

            })
            node.attr('r',  5)
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; });

            link.attr('x1', function (d) { return d.source.x; })
                .attr('y1', function (d) { return d.source.y; })
                .attr('x2', function (d) { return d.target.x; })
                .attr('y2', function (d) { return d.target.y; });

        });

        force.start();



    });













    var IntervalId
    $("#startButton").click(function () {
        IntervalId = setInterval(function () { start() }, 1000);
    });

    function start() {
        $('#slider').foundation('slider', 'set_value', i);

        scale(i)
        i++;
        if (i > 23) { clearInterval(IntervalId); i = 0; }

    }

    $(document).foundation({
        slider: {
            on_change: function () {
                year = parseInt($('#slider').attr('data-slider'));
                scale(year);
                i = year;
                clearInterval(IntervalId);
            }
        }
    });

    //function setUpLinks() {
    //    for (var i = 0; i++; i < 10) {
    //        links[i] = { source: 0, target: i };
    //    }
    //}


    function scale(year) {
        var count = 0;
        county = 0;

        if (oldYear != year && areas != null) {

            areas.transition().duration(2000)
            .attr("transform", function (d) {
                var centroid = path.centroid(d),
                x = centroid[0],
                y = centroid[1];
                county = counties[count] * 24;

                // console.log(array.dataset.value[county] + "     " + array.dataset.value[county + year] + "   ");
                return "translate(" + x + "," + y + ")"
                + "scale(" + array.dataset.value[county + year] / array.dataset.value[county] + ")"
                + "translate(" + -x + "," + -y + ")";
            })

            count++;

            oldYear = year;
        }
        $('#year').text((year * 10) + 1800);
    }

});








//Made
//console.log(areas);
