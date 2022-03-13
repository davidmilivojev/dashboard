function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function removeDots(x) {
    return x.split('.').join('');
}

var themeColors = ["#C2DDF8", "#C3D1DE", "#78A2CC", "#6887A6", "#245A90", "#1E88E5", "#1976D2"];
var radiusPie = 80;

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
            .range(themeColors);
        var pie = d3.pie().value(function(d) {
            var y1checked = d3.select("#year2019").property("checked");
            var y2checked = d3.select("#year2020").property("checked");
            var y3checked = d3.select("#year2021").property("checked");
            if(y1checked) {
                valueIznos19 = d.Iznos2019.split('.').join("");
            }
            if(y2checked) {
                valueIznos20 = d.Iznos2020.split('.').join("");
            }
            if(y3checked) {
                valueIznos21 = d.Iznos2021.split('.').join("");
            }
            if(!y1checked && !y2checked && !y3checked) {
                d3.select("#year2019").property('checked', true);
                valueIznos19 = d.Iznos2019.split('.').join("");
            }
            var sum = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
            return sum;
        });

        var path = d3.arc()
                    .outerRadius(radius - 20)
                    .innerRadius(radiusPie);

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

        var arc2 = g.selectAll(".arc2")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc2");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.Sektor); });

        arc2.append("text")
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
                var y1checked = d3.select("#year2019").property("checked");
                var y2checked = d3.select("#year2020").property("checked");
                var y3checked = d3.select("#year2021").property("checked");
                if(y1checked){
                    valueIznos19 = d.data.Iznos2019.split('.').join("");
                }
                if(y2checked){
                    valueIznos20 = d.data.Iznos2020.split('.').join("");
                }
                if(y3checked){
                    valueIznos21 = d.data.Iznos2021.split('.').join("");
                }
                if(!y1checked && !y2checked && !y3checked) {
                    d3.select("#year2019").property('checked', true);
                    valueIznos19 = d.data.Iznos2019.split('.').join("");
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
            .range(themeColors);
        var pie = d3.pie().value(function(d) {
            var xy1checked = d3.select("#xyear2019").property("checked");
            var xy2checked = d3.select("#xyear2020").property("checked");
            var xy3checked = d3.select("#xyear2021").property("checked");
            if(xy1checked) {
                valueIznos19 = d.Iznos2019.split('.').join("");
            }
            if(xy2checked) {
                valueIznos20 = d.Iznos2020.split('.').join("");
            }
            if(xy3checked) {
                valueIznos21 = d.Iznos2021.split('.').join("");
            }
            if(!xy1checked && !xy2checked && !xy3checked) {
                d3.select("#xyear2019").property('checked', true);
                valueIznos19 = d.Iznos2019.split('.').join("");
            }
            var sum = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
            return sum;
        });

        var path = d3.arc()
                    .outerRadius(radius - 20)
                    .innerRadius(radiusPie);

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

        var arc2 = g.selectAll(".arc2")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc2");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.Sektor); });

        arc2.append("text")
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
                var xy1checked = d3.select("#xyear2019").property("checked");
                var xy2checked = d3.select("#xyear2020").property("checked");
                var xy3checked = d3.select("#xyear2021").property("checked");
                if(xy1checked) {
                    valueIznos19 = d.data.Iznos2019.split('.').join("");
                }
                if(xy2checked) {
                    valueIznos20 = d.data.Iznos2020.split('.').join("");
                }
                if(xy3checked) {
                    valueIznos21 = d.data.Iznos2021.split('.').join("");
                }
                if(!xy1checked && !xy2checked && !xy3checked) {
                    d3.select("#xyear2019").property('checked', true);
                    valueIznos19 = d.data.Iznos2019.split('.').join("");
                }
                var priceNumb = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
                var priceStr = priceNumb.toString();
                var price = priceStr.split(" ");

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
    }
}

function joinPie3() {
    d3.selectAll(".pie3 .cbx").on("change", updateData);

    updateData();


    function updateData() {
        var svg = d3.select("#pie3"),
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
            .range(themeColors);
        var pie = d3.pie().value(function(d) {
            var xy1checked = d3.select('.pie3').select("#year2019").property("checked");
            var xy2checked = d3.select('.pie3').select("#year2020").property("checked");
            var xy3checked = d3.select('.pie3').select("#year2021").property("checked");
            if(xy1checked) {
                valueIznos19 = d.Iznos2019.split('.').join("");
            }
            if(xy2checked) {
                valueIznos20 = d.Iznos2020.split('.').join("");
            }
            if(xy3checked) {
                valueIznos21 = d.Iznos2021.split('.').join("");
            }
            if(!xy1checked && !xy2checked && !xy3checked) {
                d3.select('.pie3').select("#year2019").property('checked', true);
                valueIznos19 = d.Iznos2019.split('.').join("");
            }
            var sum = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
            return sum;
        });

        var path = d3.arc()
                    .outerRadius(radius - 20)
                    .innerRadius(0);

        var label = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius - 80);

        d3.csv("pie1.csv", function(error, data) {
            if (error) {
                throw error;
            }

        var arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        var arc2 = g.selectAll(".arc2")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc2");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.Sektor); });

        arc2.append("text")
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
                var xy1checked = d3.select('.pie3').select("#year2019").property("checked");
                var xy2checked = d3.select('.pie3').select("#year2020").property("checked");
                var xy3checked = d3.select('.pie3').select("#year2021").property("checked");
                if(xy1checked) {
                    valueIznos19 = d.data.Iznos2019.split('.').join("");
                }
                if(xy2checked) {
                    valueIznos20 = d.data.Iznos2020.split('.').join("");
                }
                if(xy3checked) {
                    valueIznos21 = d.data.Iznos2021.split('.').join("");
                }
                if(!xy1checked && !xy2checked && !xy3checked) {
                    d3.select('.pie3').select("#year2019").property('checked', true);
                    valueIznos19 = d.data.Iznos2019.split('.').join("");
                }
                var priceNumb = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
                var priceStr = priceNumb.toString();
                var price = priceStr.split(" ");

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
    }
}

function joinPie4() {
    d3.selectAll(".pie4 .cbx").on("change", updateData);

    updateData();


    function updateData() {
        var svg = d3.select("#pie4"),
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
            .range(themeColors);
        var pie = d3.pie().value(function(d) {
            var xy1checked = d3.select('.pie4').select("#year2019").property("checked");
            var xy2checked = d3.select('.pie4').select("#year2020").property("checked");
            var xy3checked = d3.select('.pie4').select("#year2021").property("checked");
            if(xy1checked) {
                valueIznos19 = d.Iznos2019.split('.').join("");
            }
            if(xy2checked) {
                valueIznos20 = d.Iznos2020.split('.').join("");
            }
            if(xy3checked) {
                valueIznos21 = d.Iznos2021.split('.').join("");
            }
            if(!xy1checked && !xy2checked && !xy3checked) {
                d3.select('.pie4').select("#year2019").property('checked', true);
                valueIznos19 = d.Iznos2019.split('.').join("");
            }
            var sum = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
            return sum;
        });

        var path = d3.arc()
                    .outerRadius(radius - 20)
                    .innerRadius(0);

        var label = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius - 80);

        d3.csv("pie2.csv", function(error, data) {
            if (error) {
                throw error;
            }

        var arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        var arc2 = g.selectAll(".arc2")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc2");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.Sektor); });

        arc2.append("text")
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
                var xy1checked = d3.select('.pie4').select("#year2019").property("checked");
                var xy2checked = d3.select('.pie4').select("#year2020").property("checked");
                var xy3checked = d3.select('.pie4').select("#year2021").property("checked");
                if(xy1checked) {
                    valueIznos19 = d.data.Iznos2019.split('.').join("");
                }
                if(xy2checked) {
                    valueIznos20 = d.data.Iznos2020.split('.').join("");
                }
                if(xy3checked) {
                    valueIznos21 = d.data.Iznos2021.split('.').join("");
                }
                if(!xy1checked && !xy2checked && !xy3checked) {
                    d3.select('.pie4').select("#year2019").property('checked', true);
                    valueIznos19 = d.data.Iznos2019.split('.').join("");
                }
                var priceNumb = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
                var priceStr = priceNumb.toString();
                var price = priceStr.split(" ");

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
    }
}

function joinPie5() {
    d3.selectAll(".pie5 .cbx").on("change", updateData);

    updateData();


    function updateData() {
        var svg = d3.select("#pie5"),
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
            .range(themeColors);
        var pie = d3.pie().value(function(d) {
            var xy1checked = d3.select('.pie5').select("#year2019").property("checked");
            var xy2checked = d3.select('.pie5').select("#year2020").property("checked");
            var xy3checked = d3.select('.pie5').select("#year2021").property("checked");
            if(xy1checked) {
                valueIznos19 = d.Iznos2019.split('.').join("");
            }
            if(xy2checked) {
                valueIznos20 = d.Iznos2020.split('.').join("");
            }
            if(xy3checked) {
                valueIznos21 = d.Iznos2021.split('.').join("");
            }
            if(!xy1checked && !xy2checked && !xy3checked) {
                d3.select('.pie5').select("#year2019").property('checked', true);
                valueIznos19 = d.Iznos2019.split('.').join("");
            }
            var sum = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
            return sum;
        });

        var path = d3.arc()
                    .outerRadius(radius - 20)
                    .innerRadius(0);

        var label = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius - 80);

        d3.csv("pie2.csv", function(error, data) {
            if (error) {
                throw error;
            }

        var arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        var arc2 = g.selectAll(".arc2")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc2");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.Sektor); });

        arc2.append("text")
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
                var xy1checked = d3.select('.pie5').select("#year2019").property("checked");
                var xy2checked = d3.select('.pie5').select("#year2020").property("checked");
                var xy3checked = d3.select('.pie5').select("#year2021").property("checked");
                if(xy1checked) {
                    valueIznos19 = d.data.Iznos2019.split('.').join("");
                }
                if(xy2checked) {
                    valueIznos20 = d.data.Iznos2020.split('.').join("");
                }
                if(xy3checked) {
                    valueIznos21 = d.data.Iznos2021.split('.').join("");
                }
                if(!xy1checked && !xy2checked && !xy3checked) {
                    d3.select('.pie5').select("#year2019").property('checked', true);
                    valueIznos19 = d.data.Iznos2019.split('.').join("");
                }
                var priceNumb = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
                var priceStr = priceNumb.toString();
                var price = priceStr.split(" ");

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
    }
}

function animatedBar() {
    var svg = d3.select("#bar1"),
        width = svg.attr("width") - 20,
        height = svg.attr("height") - 120;

    var x = d3.scaleBand().range([0, width]).padding(0.4),
        y = d3.scaleLinear().range([height, 0]);
    var color = d3.scaleOrdinal().range(themeColors);

    var g = svg.append("g")
            .attr("transform", "translate(" + 0 + "," + 80 + ")");
    // symbolTriangle
    var sym = d3.symbol().type(d3.symbolTriangle).size(200);

    d3.csv("bar.csv", function(error, data) {
        if (error) {
            throw error;
        }

        x.domain(data.map(function(d) { return d.nazivSektora; }));
        y.domain([0, d3.max(data, function(d) { return d.budzet; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x).tickFormat(function(d){
            return d;
        }))

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .on("mouseover", onMouseOver) //Add listener for the mouseover event
         .on("mouseout", onMouseOut)   //Add listener for the mouseout event
         .attr("x", function(d) { return x(d.nazivSektora); })
         .attr("y", function(d) { return y(d.budzet); })
         .attr("width", x.bandwidth())
         .transition()
         .ease(d3.easeLinear)
         .duration(400)
         .delay(function (d, i) {
             return i * 50;
         })
         .style("fill", function(d, i) {
            return color(i);
         })
         .attr("height", function(d) { return height - y(d.budzet); });
    });

    //mouseover event handler function
    function onMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth() + 5)
          .attr("y", function(d) { return y(d.budzet) - 10; })
          .attr("height", function(d) { return height - y(d.budzet) + 10; });

          g.append("rect")
          .attr('class', 'val')
          .attr('x', function() {
              var xWidth = (x(d.nazivSektora) - 55);
              return xWidth;
          })
          .attr('y', function() {
              return y(d.budzet) - 65;
          })
          .attr('rx', 5)
          .attr('width', 140)
          .attr("height", 40)
          .attr('fill', '#E9E9E9')

          g.select('g')
          .append("path")
          .attr("d", sym)
          .attr("fill", "#E9E9E9")
          .attr('class', 'val')
          .attr('transform', function() {
              var xWidth = x(d.nazivSektora) + 16;
              var xHeight = (height - y(d.budzet) + 20)*(-1);
              return "translate(" + xWidth + "," + xHeight + ") rotate(180)";
          })

          g.append("text")
         .attr('class', 'val')
         .attr('x', function() {
             return x(d.nazivSektora) - 30;
         })
         .attr('y', function() {
             return y(d.budzet) - 40;
         })
         .text(function() {
             return [ d.budzet + " milijardi din."];
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
          .attr("y", function(d) { return y(d.budzet); })
          .attr("height", function(d) { return height - y(d.budzet); });

        d3.selectAll('.val')
          .remove()
    }
}

function horizontalBar() {
    d3.selectAll(".hbar .radio").on("change", updateData);
    updateData();

    function updateData() {
            // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 30, left: 40};

        var svg = d3.select("#graphic"),
            width = svg.attr("width") - 20,
            height = svg.attr("height") - 60;

            svg.selectAll("g").remove();
            svg.selectAll("rect").remove();
        // set the ranges
        var y = d3.scaleBand()
                .range([height, 0])
                .padding(0.4);

        var x = d3.scaleLinear()
                .range([0, width]);

        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin

        var g = svg.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        var dataDB;
        var r1 = d3.select('.hbar').select("#radio1").property("checked");
        var r2 = d3.select('.hbar').select("#radio2").property("checked");
        var r3 = d3.select('.hbar').select("#radio3").property("checked");
        var r4 = d3.select('.hbar').select("#radio4").property("checked");
        var title = document.querySelector('.js-hbar');
        if (r1) {
            dataDB = "bar2.csv";
            title.textContent = '';
            title.append("MEDIJI");
        } else if(r2) {
            dataDB = "bar3.csv";
            title.textContent = '';
            title.append("OCD");
        } else if(r3) {
            dataDB = "bar4.csv";
            title.textContent = '';
            title.append("KULTURA");
        } else if(r4) {
            dataDB = "bar5.csv";
            title.textContent = '';
            title.append("OMLADINA");
        }
        // format the data
        d3.csv(dataDB, function(error, data) {
            if (error) {
                throw error;
            }
        // Scale the range of the data in the domains
        x.domain([0, d3.max(data, function(d){ return +removeDots(d.budzet); })])
        y.domain(data.map(function(d) { return (d.nazivSektora + ' - ' + d.budzet); }));

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            // .attr("x", function(d) { return x(d.budzet); })
            .attr("width", function(d) {return x(+removeDots(d.budzet)); } )
            .attr("y", function(d) { return y((d.nazivSektora + ' - ' + d.budzet)); })
            .attr("height", y.bandwidth());

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .attr("class", "ghbar")
            .call(d3.axisLeft(y));
        });
    }
}

function animatedBar() {
    var svg = d3.select("#bar1"),
        width = svg.attr("width"),
        height = svg.attr("height") - 120;

    var x = d3.scaleBand().range([0, width]).padding(0.5),
        y = d3.scaleLinear().range([height, 0]);
    var color = d3.scaleOrdinal().range(themeColors);

    var g = svg.append("g")
            .attr("transform", "translate(" + 0 + "," + 80 + ")");
    // symbolTriangle
    var sym = d3.symbol().type(d3.symbolTriangle).size(200);

    d3.csv("bar.csv", function(error, data) {
        if (error) {
            throw error;
        }

        x.domain(data.map(function(d) { return d.nazivSektora; }));
        y.domain([0, d3.max(data, function(d) { return +removeDots(d.budzet); })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x).tickFormat(function(d){
            return d;
        }))

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .on("mouseover", onMouseOver) //Add listener for the mouseover event
         .on("mouseout", onMouseOut)   //Add listener for the mouseout event
         .attr("x", function(d) { return x(d.nazivSektora); })
         .attr("y", function(d) { return y(+removeDots(d.budzet)); })
         .attr("width", x.bandwidth())
         .transition()
         .ease(d3.easeLinear)
         .duration(400)
         .delay(function (d, i) {
             return i * 50;
         })
         .style("fill", function(d, i) {
            return color(i);
         })
         .attr("height", function(d) { return height - y(+removeDots(d.budzet)); });
    });

    //mouseover event handler function
    function onMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth() + 5)
          .attr("y", function(d) { return y(+removeDots(d.budzet)) - 10; })
          .attr("height", function(d) { return height - y(+removeDots(d.budzet)) + 10; });

          g.append("rect")
          .attr('class', 'val')
          .attr('x', function() {
              var xWidth = (x(d.nazivSektora) - 55);
              return xWidth;
          })
          .attr('y', function() {
              return y(+removeDots(d.budzet)) - 65;
          })
          .attr('rx', 5)
          .attr('width', 140)
          .attr("height", 40)
          .attr('fill', '#E9E9E9')

          g.select('g')
          .append("path")
          .attr("d", sym)
          .attr("fill", "#E9E9E9")
          .attr('class', 'val')
          .attr('transform', function() {
              var xWidth = x(d.nazivSektora) + 16;
              var xHeight = (height - y(+removeDots(d.budzet)) + 20)*(-1);
              return "translate(" + xWidth + "," + xHeight + ") rotate(180)";
          })

          g.append("text")
         .attr('class', 'val')
         .attr('x', function() {
             return x(d.nazivSektora) - 30;
         })
         .attr('y', function() {
             return y(+removeDots(d.budzet)) - 40;
         })
         .text(function() {
             return [ d.budzet + " din."];
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
          .attr("y", function(d) { return y(+removeDots(d.budzet)); })
          .attr("height", function(d) { return height - y(+removeDots(d.budzet)); });

        d3.selectAll('.val')
          .remove()
    }
}
function animatedBar2() {
    var svg = d3.select("#bar2"),
        width = svg.attr("width"),
        height = svg.attr("height") - 120;

    var x = d3.scaleBand().range([0, width]).padding(0.5),
        y = d3.scaleLinear().range([height, 0]);
    var color = d3.scaleOrdinal().range(themeColors);

    var g = svg.append("g")
            .attr("transform", "translate(" + 0 + "," + 80 + ")");
    // symbolTriangle
    var sym = d3.symbol().type(d3.symbolTriangle).size(200);

    d3.csv("bar2.csv", function(error, data) {
        if (error) {
            throw error;
        }

        x.domain(data.map(function(d) { return d.nazivSektora; }));
        y.domain([0, d3.max(data, function(d) { return +removeDots(d.budzet); })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x).tickFormat(function(d){
            return d;
        }))

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .on("mouseover", onMouseOver) //Add listener for the mouseover event
         .on("mouseout", onMouseOut)   //Add listener for the mouseout event
         .attr("x", function(d) { return x(d.nazivSektora); })
         .attr("y", function(d) { return y(+removeDots(d.budzet)); })
         .attr("width", x.bandwidth())
         .transition()
         .ease(d3.easeLinear)
         .duration(400)
         .delay(function (d, i) {
             return i * 50;
         })
         .style("fill", function(d, i) {
            return color(i);
         })
         .attr("height", function(d) { return height - y(+removeDots(d.budzet)); });
    });

    //mouseover event handler function
    function onMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth() + 5)
          .attr("y", function(d) { return y(+removeDots(d.budzet)) - 10; })
          .attr("height", function(d) { return height - y(+removeDots(d.budzet)) + 10; });

          g.append("rect")
          .attr('class', 'val')
          .attr('x', function() {
              var xWidth = (x(d.nazivSektora) - 55);
              return xWidth;
          })
          .attr('y', function() {
              return y(+removeDots(d.budzet)) - 65;
          })
          .attr('rx', 5)
          .attr('width', 140)
          .attr("height", 40)
          .attr('fill', '#E9E9E9')

          g.select('g')
          .append("path")
          .attr("d", sym)
          .attr("fill", "#E9E9E9")
          .attr('class', 'val')
          .attr('transform', function() {
              var xWidth = x(d.nazivSektora) + 12;
              var xHeight = (height - y(+removeDots(d.budzet)) + 20)*(-1);
              return "translate(" + xWidth + "," + xHeight + ") rotate(180)";
          })

          g.append("text")
         .attr('class', 'val')
         .attr('x', function() {
             return x(d.nazivSektora) - 30;
         })
         .attr('y', function() {
             return y(+removeDots(d.budzet)) - 40;
         })
         .text(function() {
             return [ d.budzet + " din."];
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
          .attr("y", function(d) { return y(+removeDots(d.budzet)); })
          .attr("height", function(d) { return height - y(+removeDots(d.budzet)); });

        d3.selectAll('.val')
          .remove()
    }
}
function animatedBar3() {
    var svg = d3.select("#bar3"),
        width = svg.attr("width"),
        height = svg.attr("height") - 120;

    var x = d3.scaleBand().range([0, width]).padding(0.5),
        y = d3.scaleLinear().range([height, 0]);
    var color = d3.scaleOrdinal().range(themeColors);

    var g = svg.append("g")
            .attr("transform", "translate(" + 0 + "," + 80 + ")");
    // symbolTriangle
    var sym = d3.symbol().type(d3.symbolTriangle).size(200);

    d3.csv("bar3.csv", function(error, data) {
        if (error) {
            throw error;
        }

        x.domain(data.map(function(d) { return d.nazivSektora; }));
        y.domain([0, d3.max(data, function(d) { return +removeDots(d.budzet); })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x).tickFormat(function(d){
            return d;
        }))

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .on("mouseover", onMouseOver) //Add listener for the mouseover event
         .on("mouseout", onMouseOut)   //Add listener for the mouseout event
         .attr("x", function(d) { return x(d.nazivSektora); })
         .attr("y", function(d) { return y(+removeDots(d.budzet)); })
         .attr("width", x.bandwidth())
         .transition()
         .ease(d3.easeLinear)
         .duration(400)
         .delay(function (d, i) {
             return i * 50;
         })
         .style("fill", function(d, i) {
            return color(i);
         })
         .attr("height", function(d) { return height - y(+removeDots(d.budzet)); });
    });

    //mouseover event handler function
    function onMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth() + 5)
          .attr("y", function(d) { return y(+removeDots(d.budzet)) - 10; })
          .attr("height", function(d) { return height - y(+removeDots(d.budzet)) + 10; });

          g.append("rect")
          .attr('class', 'val')
          .attr('x', function() {
              var xWidth = (x(d.nazivSektora) - 55);
              return xWidth;
          })
          .attr('y', function() {
              return y(+removeDots(d.budzet)) - 65;
          })
          .attr('rx', 5)
          .attr('width', 140)
          .attr("height", 40)
          .attr('fill', '#E9E9E9')

          g.select('g')
          .append("path")
          .attr("d", sym)
          .attr("fill", "#E9E9E9")
          .attr('class', 'val')
          .attr('transform', function() {
              var xWidth = x(d.nazivSektora) + 12;
              var xHeight = (height - y(+removeDots(d.budzet)) + 20)*(-1);
              return "translate(" + xWidth + "," + xHeight + ") rotate(180)";
          })

          g.append("text")
         .attr('class', 'val')
         .attr('x', function() {
             return x(d.nazivSektora) - 30;
         })
         .attr('y', function() {
             return y(+removeDots(d.budzet)) - 40;
         })
         .text(function() {
             return [ d.budzet + " din."];
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
          .attr("y", function(d) { return y(+removeDots(d.budzet)); })
          .attr("height", function(d) { return height - y(+removeDots(d.budzet)); });

        d3.selectAll('.val')
          .remove()
    }
}
function animatedBar4() {
    var svg = d3.select("#bar4"),
        width = svg.attr("width"),
        height = svg.attr("height") - 120;

    var x = d3.scaleBand().range([0, width]).padding(0.5),
        y = d3.scaleLinear().range([height, 0]);
    var color = d3.scaleOrdinal().range(themeColors);

    var g = svg.append("g")
            .attr("transform", "translate(" + 0 + "," + 80 + ")");
    // symbolTriangle
    var sym = d3.symbol().type(d3.symbolTriangle).size(200);

    d3.csv("bar4.csv", function(error, data) {
        if (error) {
            throw error;
        }

        x.domain(data.map(function(d) { return d.nazivSektora; }));
        y.domain([0, d3.max(data, function(d) { return +removeDots(d.budzet); })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x).tickFormat(function(d){
            return d;
        }))

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .on("mouseover", onMouseOver) //Add listener for the mouseover event
         .on("mouseout", onMouseOut)   //Add listener for the mouseout event
         .attr("x", function(d) { return x(d.nazivSektora); })
         .attr("y", function(d) { return y(+removeDots(d.budzet)); })
         .attr("width", x.bandwidth())
         .transition()
         .ease(d3.easeLinear)
         .duration(400)
         .delay(function (d, i) {
             return i * 50;
         })
         .style("fill", function(d, i) {
            return color(i);
         })
         .attr("height", function(d) { return height - y(+removeDots(d.budzet)); });
    });

    //mouseover event handler function
    function onMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth() + 5)
          .attr("y", function(d) { return y(+removeDots(d.budzet)) - 10; })
          .attr("height", function(d) { return height - y(+removeDots(d.budzet)) + 10; });

          g.append("rect")
          .attr('class', 'val')
          .attr('x', function() {
              var xWidth = (x(d.nazivSektora) - 55);
              return xWidth;
          })
          .attr('y', function() {
              return y(+removeDots(d.budzet)) - 65;
          })
          .attr('rx', 5)
          .attr('width', 140)
          .attr("height", 40)
          .attr('fill', '#E9E9E9')

          g.select('g')
          .append("path")
          .attr("d", sym)
          .attr("fill", "#E9E9E9")
          .attr('class', 'val')
          .attr('transform', function() {
              var xWidth = x(d.nazivSektora) + 12;
              var xHeight = (height - y(+removeDots(d.budzet)) + 20)*(-1);
              return "translate(" + xWidth + "," + xHeight + ") rotate(180)";
          })

          g.append("text")
         .attr('class', 'val')
         .attr('x', function() {
             return x(d.nazivSektora) - 30;
         })
         .attr('y', function() {
             return y(+removeDots(d.budzet)) - 40;
         })
         .text(function() {
             return [ d.budzet + " din."];
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
          .attr("y", function(d) { return y(+removeDots(d.budzet)); })
          .attr("height", function(d) { return height - y(+removeDots(d.budzet)); });

        d3.selectAll('.val')
          .remove()
    }
}
function animatedBar5() {
    var svg = d3.select("#bar5"),
        width = svg.attr("width"),
        height = svg.attr("height") - 120;

    var x = d3.scaleBand().range([0, width]).padding(0.5),
        y = d3.scaleLinear().range([height, 0]);
    var color = d3.scaleOrdinal().range(themeColors);

    var g = svg.append("g")
            .attr("transform", "translate(" + 0 + "," + 80 + ")");
    // symbolTriangle
    var sym = d3.symbol().type(d3.symbolTriangle).size(200);

    d3.csv("bar5.csv", function(error, data) {
        if (error) {
            throw error;
        }

        x.domain(data.map(function(d) { return d.nazivSektora; }));
        y.domain([0, d3.max(data, function(d) { return +removeDots(d.budzet); })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x).tickFormat(function(d){
            return d;
        }))

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .on("mouseover", onMouseOver) //Add listener for the mouseover event
         .on("mouseout", onMouseOut)   //Add listener for the mouseout event
         .attr("x", function(d) { return x(d.nazivSektora); })
         .attr("y", function(d) { return y(+removeDots(d.budzet)); })
         .attr("width", x.bandwidth())
         .transition()
         .ease(d3.easeLinear)
         .duration(400)
         .delay(function (d, i) {
             return i * 50;
         })
         .style("fill", function(d, i) {
            return color(i);
         })
         .attr("height", function(d) { return height - y(+removeDots(d.budzet)); });
    });

    //mouseover event handler function
    function onMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth() + 5)
          .attr("y", function(d) { return y(+removeDots(d.budzet)) - 10; })
          .attr("height", function(d) { return height - y(+removeDots(d.budzet)) + 10; });

          g.append("rect")
          .attr('class', 'val')
          .attr('x', function() {
              var xWidth = (x(d.nazivSektora) - 55);
              return xWidth;
          })
          .attr('y', function() {
              return y(+removeDots(d.budzet)) - 65;
          })
          .attr('rx', 5)
          .attr('width', 140)
          .attr("height", 40)
          .attr('fill', '#E9E9E9')

          g.select('g')
          .append("path")
          .attr("d", sym)
          .attr("fill", "#E9E9E9")
          .attr('class', 'val')
          .attr('transform', function() {
              var xWidth = x(d.nazivSektora) + 12;
              var xHeight = (height - y(+removeDots(d.budzet)) + 20)*(-1);
              return "translate(" + xWidth + "," + xHeight + ") rotate(180)";
          })

          g.append("text")
         .attr('class', 'val')
         .attr('x', function() {
             return x(d.nazivSektora) - 30;
         })
         .attr('y', function() {
             return y(+removeDots(d.budzet)) - 40;
         })
         .text(function() {
             return [ d.budzet + " din."];
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
          .attr("y", function(d) { return y(+removeDots(d.budzet)); })
          .attr("height", function(d) { return height - y(+removeDots(d.budzet)); });

        d3.selectAll('.val')
          .remove()
    }
}

function showData(db, selectItem) {
    var idx = selectItem[0].closest('.js-counter').getAttribute('data-index');
    var valueNum = document.querySelectorAll('.js-value-num')[idx];
    var title = document.querySelectorAll('.js-title')[idx];
    title.innerHTML = db[idx].naziv;
    var sum = 0;
    selectItem.forEach((item, index) => {
        var indexStart = index + 1;
        item.setAttribute('data-val', Object.values(db[idx])[indexStart]);
        if (!item.checked) {
            selectItem[0].checked = true;
            var setValue = selectItem[0].getAttribute('data-val');
            valueNum.innerHTML = `<span> ${setValue} </span>`;
            sum = +setValue;
        }
    });
}

function toggleData(selectItem) {
    var idx = selectItem[0].closest('.js-counter').getAttribute('data-index');
    var valueNum = document.querySelectorAll('.js-value-num')[idx];
    var currentSum = valueNum.querySelector('span').innerHTML;
    var sum = +currentSum;
    selectItem.forEach((item, index) => {
        item.addEventListener('click', () => {
            var dataVal = item.getAttribute('data-val');
            if (item.checked) {
                sum = sum + +dataVal;
            } else {
                sum = sum - +dataVal;
            }
            valueNum.innerHTML = `<span> ${sum} </span>`;
        });
    });
}

function getData() {
    var cbxParent = document.querySelectorAll('.js-counter');
    var cbx = cbxParent[0].querySelectorAll('.js-cbx');
    var cbx1 = cbxParent[1].querySelectorAll('.js-cbx');
    var cbx2 = cbxParent[2].querySelectorAll('.js-cbx');
    var cbx3 = cbxParent[3].querySelectorAll('.js-cbx');
    var cbx4 = cbxParent[4].querySelectorAll('.js-cbx');
    var cbx5 = cbxParent[5].querySelectorAll('.js-cbx');
    var dataItem = 0;

    cbxParent.forEach((item, index) => {
        item.setAttribute('data-index', index);
    });

    Papa.parse('cards.csv', {
        download: true,
        header: true,
        complete: function(results) {
            dataItem = results.data;
            showData(dataItem, cbx);
            showData(dataItem, cbx1);
            showData(dataItem, cbx2);
            showData(dataItem, cbx3);
            showData(dataItem, cbx4);
            showData(dataItem, cbx5);
            toggleData(cbx);
            toggleData(cbx1);
            toggleData(cbx2);
            toggleData(cbx3);
            toggleData(cbx4);
            toggleData(cbx5);
        }
    });
}

function getTableData() {
    fetch('konkursi.json')
        .then(response => response.json())
        .then(data => {
        var dataRes = data.results;
        var table = document.querySelector('.tbl');
        table.innerHTML += `
            <tr>
                <th>Naslov</th>
                <th>godina</th>
                <th>datum</th>
                <th>mesto</th>
                <th>konacno resenje</th>
                <th>najmani iznos</th>
                <th>najveci iznos</th>
                <th>napomene</th>
                <th>objava</th>
                <th>obustavljeni konkursi</th>
                <th>organ</th>
                <th>ponisteni konkursi</th>
                <th>poziv</th>
                <th>preliminarno resenje</th>
                <th>sektor</th>
                <th>tema</th>
                <th>tip konkursa</th>
            </tr>
        `;
        for(var i = 0; i < dataRes.length; i++) {
            var title = data.results[i].naziv;
            var godina = data.results[i].godina;
            var datum = data.results[i].datum;
            var kr = data.results[i].konacno_resenje;
            var mesto = data.results[i].mesto;
            var miniznos = data.results[i].najmanji_iznos;
            var maxiznos = data.results[i].najveci_iznos;
            var napomene = data.results[i].napomene;
            var objava = data.results[i].objava;
            var ok = data.results[i].obustavljen_konkurs;
            var organ = data.results[i].organ;
            var pk = data.results[i].ponisten_konkurs;
            var poziv = data.results[i].poziv;
            var pr = data.results[i].preliminarno_resenje;
            var sektor = data.results[i].sektor;
            var tema = data.results[i].tema;
            var tk = data.results[i].tip_konkursa;
            table.innerHTML += `
                <tr>
                    <td>${title} </td>
                    <td>${godina}</td>
                    <td>${datum}</td>
                    <td>${mesto}</td>
                    <td>${kr}</td>
                    <td>${miniznos}</td>
                    <td>${maxiznos}</td>
                    <td>${napomene}</td>
                    <td>${objava}</td>
                    <td>${ok}</td>
                    <td>${organ}</td>
                    <td>${pk}</td>
                    <td>${poziv}</td>
                    <td>${pr}</td>
                    <td>${sektor}</td>
                    <td>${tema}</td>
                    <td>${tk}</td>
                </tr>

            `;
        }

    });
    // var url = 'https://birn-baza.herokuapp.com/konkursi/?format=json';
    // d3.json(url, function(data) {
    //     console.log(data)
    // });
    // d3.json('konkursi.json', function(data) {
    //     console.log(data)
    // });
    // d3.json('projekti.json', function(data2) {
    //     console.log(data2)
    // });
}

function tabs() {
    var tabItem = document.querySelectorAll('.js-tab');
    var tabContents = document.querySelectorAll('.js-content');
    var mainEl = document.querySelector('.js-main');
    var activeTab = 'tabs__button--active';
    var activeTabContent = 'container__content--active';

    for (var i = 0; i < tabItem.length; i++) {
        var tab = tabItem[i];
        tab.addEventListener('click', switchClass);
    }

    function switchClass(e) {
        for (var i = 0; i < tabItem.length; i++) {
            var tab = tabItem[i];
            tab.classList.remove(activeTab);
            tabContents[i].classList.remove(activeTabContent);
        }

        var index = Array.prototype.slice.call(e.target.parentElement.children).indexOf(e.target)
            e.target.classList.add(activeTab);
            tabContents[index].classList.add(activeTabContent);

        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: mainEl.offsetTop
        });
    }
}

function getMap() {

	var width = 800,
	    height = 800;

	var quantize = d3.scaleQuantize()
        .domain([0, 400])
        .range(d3.range(6).map(function(i) { return "q" + i + "-9"; }));

	var projection = d3.geoAlbers()
        .center([0, 41.8])
        .rotate([-25.4, 0])
        .parallels([40, 50])
        .scale(4400)
        .translate([width / 2, height / 2]);

	var path = d3.geoPath()
        .projection(projection);

	var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

	svg.append("text")
        .text("")
        .attr("dx","10em")
        .attr("dy","2em")
        .attr("font-size", 14)
        .classed("stat", true);

    svg.append("text")
        .text("")
        .attr("dx","10em")
        .attr("dy","3.5em")
        .attr("font-size", 14)
        .attr("font-weight","bold")
        .classed("statValue", true);

	d3.json("map.geojson", function(error, sr) {

	svg.selectAll(".subunit")
        .data(sr.features)
        .enter()
        .append("path")
        .attr("class", function(d) {
            return quantize(d.properties.arate);
        })
        .attr("d", path)
        .style("stroke", "#fff")
        .on("mouseover", function(d) {
            var title = d.properties.name;
            var price = d.properties.money + ' din.';
            d3.select(".stat").text(title)
            d3.select(".statValue").text(price)
        });

	svg.selectAll(".subunit-label")
        .data(sr.features)
        .enter().append("text")
        .attr("class", function(d) { return "subunit-label " + d.properties.name; })
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dx", "-2em")
        .attr("font-size", "8px")
        .text(function(d) { return d.properties.name });
	});
}

getMap();
getTableData();
tabs();
getData();
joinPie();
joinPie2();
// joinPie3();
joinPie4();
joinPie5();
animatedBar();
horizontalBar()
// animatedBar2();
// animatedBar3();
// animatedBar4();
// animatedBar5();
