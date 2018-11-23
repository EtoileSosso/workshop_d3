d3.select("body").style("background-color", "#323232");

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './data/pie.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init() {
  loadJSON(function(response) {
    let data = JSON.parse(response);
    var width = 960,
    height = 500;
    var y = d3.scaleLinear()
        .range([height, 0]);
    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", height + 50);
    y.domain([0, d3.max(data, function(d) { return d.value; })]);
    var barWidth = width / data.length;
    var bar = chart.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });
    bar.append("rect")
        .attr("y", function(d) { return y(d.value) + 20; })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("width", barWidth - 1);
    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", function(d) { return y(d.value); })
        .attr("dy", ".75em")
        .text(function(d) { return Math.round(d.value); });
  });
}

init();
