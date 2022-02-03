function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

function joinPie() {
    d3.selectAll(".cbx").on("change", updateData);

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

        d3.csv("db3.csv", function(error, data) {
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
            .text("Sektori i Iznosi u RSD")
            .attr("class", "title")
    }
}

joinPie();