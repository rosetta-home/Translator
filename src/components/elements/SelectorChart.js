import { h, Component } from 'preact';
import ReactFauxDOM from 'react-faux-dom'
import d3 from 'd3';



class SelectorChart extends Component {
  constructor(props){
    super(props);
  }
 	componentDidMount() {
    console.log(this);
  }
 	componentWillUnmount() { }
  componentWillReceiveProps(nextProps) { }

	render () {
    var self = this;
    var svg = d3.select(ReactFauxDOM.createElement('svg'));

    var dx = [
      [new Date("2017-07-01T12:00:00Z"),770.895652173913],
      [new Date("2017-07-01T18:00:00Z"),667.4957983193277],
      [new Date("2017-07-02T00:00:00Z"),642.614705882353]
    ];
    var data = [];

    for (var i = 0; i < dx.length; i++) {
      var current = dx[i];
      data.push({ date:new Date(current[0]), value:current[1]  });
    }

    var margin = {top: 10, right: 10, bottom: 100, left: 40},
        margin2 = {top: 430, right: 10, bottom: 20, left: 40},
        margin3 = {top: 430, right: 10, bottom: 20, left: 40},
        width = window.innerWidth - 60,
        height = 500 - margin.top - margin.bottom,
        height2 = 500 - margin2.top - margin2.bottom;

    var parseDate = d3.time.format("%Y").parse;
    var chart_data = new Array();
    var line_data = new Array();
    var x = d3.time.scale().range([0, width]),
        x2 = d3.time.scale().range([0, width]),
        y = d3.scale.linear().range([height, 0]),
        y2 = d3.scale.linear().range([height2, 0]);
    var xAxis = d3.svg.axis().scale(x).orient("bottom"),
        xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
        yAxis = d3.svg.axis().scale(y).orient("left");

    var brush = d3.svg.brush()
        .x(x2);
        //.on("brush", brushed);
    var focusLine = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); })
        .defined(function(d) { return d.value; });
    var contextLine = d3.svg.line()
        .x(function(d) { return x2(d.date); })
        .y(function(d) { return y2(d.value); })
        .defined(function(d) { return d.value; });

    svg.attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom + 100);
    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", "100%")
        .attr("height", height);
    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    //Testing for more than one data set
    line_data.push(new Array());
    data.forEach(function(d) { line_data[0].push({date: d.date, value:d.value}); });
    // Gets the min and max date for x domain
    x.domain([d3.min(data, function(d) { return d.date; }),d3.max(data, function(d) { return d.date; })]);
    // Gets the min and max values for y domain
    y.domain([ d3.min(data, function(d) { return d.value; }),d3.max(data, function(d) { return d.value; })]);
    // Sets the domains
    x2.domain(x.domain());
    y2.domain(y.domain());


    //Line chart mouse over
    var hoverLineGroup = svg.append("g").attr("class", "hover-line");
    var hoverLine = hoverLineGroup.append("line")
                    .attr("stroke", "gray")
                    .attr("stroke-width", "3px")
                    .attr("x1", 10).attr("x2", 10)
                    .attr("y1", 0).attr("y2", height);
    hoverLineGroup.style("opacity", 1e-6);

    var circle = focus.append("circle").attr("fill", "gray");
    circle.style("opacity", 1e-6);

    var text = focus.append("text");

    focus.on("mousedown", function() {
         var mouse_x = d3.mouse(this)[0];
         var mouse_y = d3.mouse(this)[1];
         var graph_y = y.invert(mouse_y);
         var graph_x = x.invert(mouse_x);
         hoverLine.attr("x1", (mouse_x + margin.left)).attr("x2", (mouse_x + margin.left))
         hoverLineGroup.style("opacity", 1);
         circle.remove();
         circle = focus.append("circle").attr("cx", mouse_x).attr("cy", mouse_y).attr("r", 10).attr("fill", "gray").style("opacity", 1);

         text.remove();
         text = focus.append("text").attr("dx", mouse_x + 15).attr("dy", mouse_y + 3).text(Math.round(graph_y));

    });

    chart_data.push(line_data[0]);
    drawChart();

    function drawChart() {
      console.log(chart_data);
      svg.data([chart_data]);
      updateScales();
      renderAxes();
      renderLines('focus');
      renderBrush();
    }
    function updateScales() {
      y.domain([0,
        d3.max(chart_data, function(line) {
          return d3.max(line, function(d) {return d.value;})
        })
      ]);
    }
    function renderAxes() {
      if (d3.select('.x.axis').empty()) {
        focus.append("g").attr("class", "x axis");
        focus.append("g").attr("class", "y axis");
        context.append("g").attr("class", "x axis");
      };
      focus.select('.x.axis').attr("transform", "translate(0," + height + ")").call(xAxis);
      focus.select('.y.axis').call(yAxis);
      context.select('.x.axis').attr("transform", "translate(0," + height2 + ")").call(xAxis2);
    }
    function renderLines(chart) {
      if (chart == 'context') {
        var chartEl = context;
        var chartLine = contextLine;
      } else {
        var chartEl = focus;
        var chartLine = focusLine;
      }
      var line = chartEl.selectAll('path.line').data(chart_data);
      line.enter().append('path').attr("class", "line");
      line.transition().attr('d', function(d) { return chartLine(d); });
      line.exit().remove();
    };

    function renderBrush() {
      if (d3.select('g.brush').empty()) {
        renderLines('context');
        context.append("g")
          .attr("class", "x brush")
          .attr("y",-50)
          .call(brush)
          .selectAll("rect")
          .attr("y", -6)
          .attr("height", height2 + 7);
        context.append("g")
          .attr("class", "x brush")
          .attr("y",-50)
          .call(brush)
          .selectAll("rect")
          .attr("y", -6)
          .attr("height", height2 + 7);
      } else {
        renderLines('context');
      };
    }









    return svg.node().toReact();
  }
}
export default SelectorChart;
