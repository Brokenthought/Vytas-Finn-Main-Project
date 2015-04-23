



    var new_value = 0;
    $('slider').foundation('slider', 'set_value', new_value);

    $(document).foundation({
        slider: {
            on_change: function () {

                var year = parseInt( $('#slider').attr(('data-slider'))-2000)*15;

                var count =0;
                county = 0;

                category = parseInt(category);
                if (areas != null) {

                    areas.transition().duration(1000)
                    .attr("fill", function (d)
                    {
                        county = counties[count]*195;
                        count++;


                        //console.log(array.dataset.value[county+year+category]+"   "+((array.dataset.value[county+year+category]-difference)/division)*255);
                        //console.log(year + "over here" + county)
                        return("rgb(200,"+(((array.dataset.value[county+year+category]-difference)/division)*255)+","+(((array.dataset.value[county+year+category]-difference)/division)*255)+")");

                    })
                }


            }
        }
    });

});
