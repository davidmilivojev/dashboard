function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

function joinPie() {
    d3.selectAll(".pie1 .cbx").on("change", updateData);

    updateData();


    function updateData() {
        var svg = d3.select("#pie1"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2;
        var valueIznos19 = 0;
        var valueIznos20 = 0;
        var valueIznos21 = 0;

        svg.selectAll("g").remove();

        var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal()
            .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);
        var pie = d3.pie().value(function(d) {
            if(d3.select("#year2019").property("checked")){
                valueIznos19 = d.Iznos2019.split('.').join("");
            }
            if(d3.select("#year2020").property("checked")){
                valueIznos20 = d.Iznos2020.split('.').join("");
            }
            if(d3.select("#year2021").property("checked")){
                valueIznos21 = d.Iznos2021.split('.').join("");
            }
            var sum = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
            return sum;
        });

        var path = d3.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(140);

        var label = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius - 80);

        d3.csv("konkursi.csv", function(error, data) {
            if (error) {
                throw error;
            }

        var arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.Sektor); });

        arc.append("text")
            .attr("transform", function(d) {
                return "translate(" + label.centroid(d) + ")";
            })
            .each(function (d) {
                var arr = d.data.Sektor.split(" ");
                for (i = 0; i < arr.length; i++) {
                    d3.select(this).append("tspan")
                        .text(arr[i])
                        .attr("dy", i ? "1.2em" : 0)
                        .attr("x", 0)
                        .attr("text-anchor", "middle")
                        .attr("class", "p-title" + i);
                }
            })
            .each(function (d) {
                if(d3.select("#year2019").property("checked")){
                    valueIznos19 = d.data.Iznos2019.split('.').join("");
                }
                if(d3.select("#year2020").property("checked")){
                    valueIznos20 = d.data.Iznos2020.split('.').join("");
                }
                if(d3.select("#year2021").property("checked")){
                    valueIznos21 = d.data.Iznos2021.split('.').join("");
                }
                var priceNumb = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
                var priceStr = priceNumb.toString();
                var price = priceStr.split(" ");
                var arr = d.data.Iznos2019.split(" ");

                for (i = 0; i < price.length; i++) {
                    d3.select(this).append("tspan")
                        .text(numberWithCommas(price[i]) + ' din')
                        .attr("dy", i ? "1.2em" : "18px")
                        .attr("x", 0)
                        .attr("text-anchor", "middle")
                        .attr("class", "p-text" + i);
                }
            })
            // .text(function(d) {
            //     var title = d.data.Sektor;
            //     var price = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
            //     var drawData = title + ' / ' + price
            //     return drawData;
            // })
        });

        svg.append("g")
            .attr("transform", "translate(" + (width / 2 - 80) + "," + -10 + ")")
            .append("text")
            .text("Potroseno po nivoima vlasti")
            .attr("class", "title")
    }
}
function joinPie2() {
    d3.selectAll(".pie2 .cbx").on("change", updateData);

    updateData();


    function updateData() {
        var svg = d3.select("#pie2"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2;
        var valueIznos19 = 0;
        var valueIznos20 = 0;
        var valueIznos21 = 0;

        svg.selectAll("g").remove();

        var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal()
            .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);
        var pie = d3.pie().value(function(d) {
            if(d3.select("#xyear2019").property("checked")){
                valueIznos19 = d.Iznos2019.split('.').join("");
            }
            if(d3.select("#xyear2020").property("checked")){
                valueIznos20 = d.Iznos2020.split('.').join("");
            }
            if(d3.select("#xyear2021").property("checked")){
                valueIznos21 = d.Iznos2021.split('.').join("");
            }
            var sum = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
            return sum;
        });

        var path = d3.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(140);

        var label = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius - 80);

        d3.csv("projekti.csv", function(error, data) {
            if (error) {
                throw error;
            }

        var arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.Sektor); });

        arc.append("text")
            .attr("transform", function(d) {
                return "translate(" + label.centroid(d) + ")";
            })
            .each(function (d) {
                var arr = d.data.Sektor.split(" ");
                for (i = 0; i < arr.length; i++) {
                    d3.select(this).append("tspan")
                        .text(arr[i])
                        .attr("dy", i ? "1.2em" : 0)
                        .attr("x", 0)
                        .attr("text-anchor", "middle")
                        .attr("class", "p-title" + i);
                }
            })
            .each(function (d) {
                if(d3.select("#xyear2019").property("checked")){
                    valueIznos19 = d.data.Iznos2019.split('.').join("");
                }
                if(d3.select("#xyear2020").property("checked")){
                    valueIznos20 = d.data.Iznos2020.split('.').join("");
                }
                if(d3.select("#xyear2021").property("checked")){
                    valueIznos21 = d.data.Iznos2021.split('.').join("");
                }
                var priceNumb = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
                var priceStr = priceNumb.toString();
                var price = priceStr.split(" ");
                var arr = d.data.Iznos2019.split(" ");

                for (i = 0; i < price.length; i++) {
                    d3.select(this).append("tspan")
                        .text(numberWithCommas(price[i]) + ' din')
                        .attr("dy", i ? "1.2em" : "18px")
                        .attr("x", 0)
                        .attr("text-anchor", "middle")
                        .attr("class", "p-text" + i);
                }
            })
        });

        svg.append("g")
            .attr("transform", "translate(" + (width / 2 - 80) + "," + -10 + ")")
            .append("text")
            .text("Potroseno po projektima")
            .attr("class", "title")
    }
}
function animatedBar() {
    var svg = d3.select("#bar"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("Potroseno po sektorima")

    var x = d3.scaleBand().range([0, width]).padding(0.4),
        y = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("bar.csv", function(error, data) {
        if (error) {
            throw error;
        }

        x.domain(data.map(function(d) { return d.year; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x).tickFormat(function(d){
            return d;
         }))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Sektori");

        // g.append("g")
        //  .call(d3.axisLeft(y).tickFormat(function(d){
        //      return "$" + d;
        //  }).ticks(10))
        //  .append("text")
        //  .attr("transform", "rotate(-90)")
        //  .attr("y", 6)
        //  .attr("dy", "-5.1em")
        //  .attr("text-anchor", "end")
        //  .attr("stroke", "black")
        //  .text("Budzet");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .on("mouseover", onMouseOver) //Add listener for the mouseover event
         .on("mouseout", onMouseOut)   //Add listener for the mouseout event
         .attr("x", function(d) { return x(d.year); })
         .attr("y", function(d) { return y(d.value); })
         .attr("width", x.bandwidth())
         .transition()
         .ease(d3.easeLinear)
         .duration(400)
         .delay(function (d, i) {
             return i * 50;
         })
         .attr("height", function(d) { return height - y(d.value); });
    });

    //mouseover event handler function
    function onMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth() + 5)
          .attr("y", function(d) { return y(d.value) - 10; })
          .attr("height", function(d) { return height - y(d.value) + 10; });

        g.append("text")
         .attr('class', 'val')
         .attr('x', function() {
             return x(d.year);
         })
         .attr('y', function() {
             return y(d.value) - 15;
         })
         .text(function() {
             return [ d.value + " milijardi din."];
              // Value of the text
         });
    }

    //mouseout event handler function
    function onMouseOut(d, i) {
        // use the text label class to remove label on mouseout
        d3.select(this).attr('class', 'bar');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth())
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); });

        d3.selectAll('.val')
          .remove()
    }
}


joinPie();
joinPie2();
animatedBar();