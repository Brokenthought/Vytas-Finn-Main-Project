var array;

var counties = [31, 7, 28,  1,  8, 22,  2, 36, 24,32,14,9 , 3,15,10,19, 25,11,16,9,12,29,4,17,34,26];

var population = [1, 2, 3, 4, 5, 67, 8, 8, ];

var county = 24;
var year = 1;
var e = 0;
var category = 7;
var difference = 12700;
var division = 18000;
difference = parseInt(difference);
division = parseInt(division);









$.ajax({
    url: "http://localhost/Vytas-Finn-Main-Project/Project Website/income.json",
    dataType: 'json',
    jsonpCallback: 'MyJSONPCallback',
    success: function (data) {
        array = data;

    }
});

$('input:radio[name="pokemon"]').change(function(){
    


    if($(this).val() == 'DisposableIncome'){
       //alert("SocialBenefits");
        category = 11;
         difference = 370;
         division = 25000;
         difference = parseInt(difference);
         division = parseInt(division);
    }
    //IncomeSelfEmployed
    else if($(this).val() == 'TaxOnIncome')
    {
       //alert("SocialBenefits");
         category = 8;
         difference = 74;
         division = 50;
         difference = parseInt(difference);
         division = parseInt(division);
    }



    else if($(this).val() == 'Income'){
       //alert("Income");
       category = 7;
       difference = 12700;
       division = 18000;
       difference = parseInt(difference);
       division = parseInt(division);

    }
    else if($(this).val() == 'SocialBenefits'){
       //alert("SocialBenefits");
        category = 6;
         difference = 370;
         division = 10000;
         difference = parseInt(difference);
         division = parseInt(division);
    }

     else if($(this).val() == 'CompensationOfEmplyees')
    {
       //alert("SocialBenefits");
         category = 0;
         difference = 1;
         division = 4000;
         difference = parseInt(difference);
         division = parseInt(division);
    }

//DisposableIncome

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

    var new_value = 0;
    $('slider').foundation('slider', 'set_value', new_value);

    $(document).foundation({
        slider: {
            on_change: function () {

                var year =parseInt( $('#slider').attr('data-slider')) * 15;
                var count =0;
                county = 0;
                
                category = parseInt(category);
                if (areas != null) {

                    areas.transition().duration(1000)
                    .attr("fill", function (d) 
                    {
                        county = counties[count]*195;
                        count++;


                        console.log(array.dataset.value[county+year+category]+"   "+((array.dataset.value[county+year+category]-difference)/division)*255);
                        //console.log(year + "over here" + county)
                        return("rgb(200,"+(((array.dataset.value[county+year+category]-difference)/division)*255)+","+(((array.dataset.value[county+year+category]-difference)/division)*255)+")");
                     
                    })
                }

                   

              

                
            }
        }
    });

});


