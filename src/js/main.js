function joinPie() {
    d3.selectAll(".cbx").on("change", updateData);

    updateData();

    function updateData() {
        var svg = d3.select("#test1"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2;
        var valueIznos19 = 0;
        var valueIznos20 = 0;
        var valueIznos21 = 0;


        svg.selectAll("g").remove();

        var g = svg.append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

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
                    .innerRadius(0);

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
            .text(function(d) {
                    var title = d.data.Sektor;
                    var price = (+valueIznos19) + (+valueIznos20) + (+valueIznos21);
                    var drawData = title + ' / ' + price
                        return drawData;
                })
            });

            svg.append("g")
            .attr("transform", "translate(" + (width / 2 - 80) + "," + 10 + ")")
            .append("text")
            .text("Sektori i Iznosi u RSD")
            .attr("class", "title")
        }
}

joinPie();