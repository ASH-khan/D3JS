/**
 * Created by ishi on 1/12/17.
 */

var w = 1200,
    h = 400;

var circleWidth = 5;

var palette = {
    "lightgray": "#819090",
    "gray": "#708284",
    "mediumgray": "#536870",
    "darkgray": "#475B62",
    "darkblue": "#0A2933",
    "darkerblue": "#042029",
    "paleryellow": "#FCF4DC",
    "paleyellow": "#EAE3CB",
    "yellow": "#A57706",
    "orange": "#BD3613",
    "red": "#D11C24",
    "pink": "#C61C6F",
    "purple": "#595AB7",
    "blue": "#2176C7",
    "green": "#259286",
    "yellowgreen": "#738A05"
}

var nodes = [
    {name: 'parent'},
    {name: 'child1'},
    {name: 'child2', target: [0]},
    {name: 'child3', target: [0,3]},
    {name: 'child4', target: [0]},
    {name: 'child5', target: [1,2]},
    {name: 'child6', target: [0,1,2,3]},
]

var links = [];

for (var i = 0; i < nodes.length; i++) {
    if(nodes[i].target !== undefined) {
        for(var j = 0; j < nodes[i].target.length; j++){
          links.push({
              source: nodes[i],
              target: nodes[nodes[i].target[j]]
          })
        }
    }
}

var forceChart = d3.select('#forceLayout').append('svg')
    .attr('width', w)
    .attr('height', h)

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0.1)
    .charge(-1000)
    .size([w,h])

var link = forceChart.selectAll('line')
    .data(links).enter().append('line')
    .attr('stroke', palette.gray)

var node = forceChart.selectAll('circle')
    .data(nodes).enter()
    .append('g')

    //MOUSEOVER
    .on("mouseover", function(d,i) {
        if (i > 0) {
            //CIRCLE
            d3.select(this).selectAll("circle")
                .transition()
                .duration(250)
                .style("cursor", "none")
                .attr("r", circleWidth + 3)
                .attr("fill", palette.orange);

            //TEXT
            d3.select(this).select("text")
                .transition()
                .style("cursor", "none")
                .duration(250)
                .style("cursor", "none")
                .attr("font-size","1.5em")
                .attr("x", 15 )
                .attr("y", 5 )
        } else {
            //CIRCLE
            d3.select(this).selectAll("circle")
                .style("cursor", "none")

            //TEXT
            d3.select(this).select("text")
                .style("cursor", "none")
        }
    })

    //MOUSEOUT
    .on("mouseout", function(d,i) {
        if (i>0) {
            //CIRCLE
            d3.select(this).selectAll("circle")
                .transition()
                .duration(250)
                .attr("r", circleWidth)
                .attr("fill",palette.pink);

            //TEXT
            d3.select(this).select("text")
                .transition()
                .duration(250)
                .attr("font-size","1em")
                .attr("x", 8 )
                .attr("y", 4 )
        }
    })
    .call(force.drag)

node.append('circle')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', circleWidth)
    .attr('fill', function(d, i) {
        if(i > 0) {
            return palette.pink;
        } else {
            return palette.blue;
        }
    })

node.append('text')
    .text(function(d) { return d.name; })
    .attr('font-family', 'Roboto Slab')
    .attr('fill', function(d, i) {
        if(i > 0) {
            return palette.gray;
        } else {
            return palette.yellowgreen;
        }
    })
    .attr('x', function(d, i) {
        if(i > 0) {
            return circleWidth + 5;
        } else {
            return circleWidth -  15;
        }
    })
    .attr('y', function(d, i) {
        if(i > 0) {
            return circleWidth;
        } else {
            return circleWidth + 5;
        }
    })
    .attr('text-anchor', function(d, i) {
        if(i > 0) {
            return 'beginning';
        } else {
            return 'end';
        }
    })
    .attr('font-size', function(d, i) {
        if(i > 0) {
            return '1em';
        } else {
           return '1.8em';
        }
    })


force.on('tick', function(e) {
    node.attr('transform', function(d,i) {
        return 'translate('+ d.x +', '+ d.y +')';
    })
    link
        .attr('x1', function(d) { return d.source.x; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('y2', function(d) { return d.target.y; })
})


force.start();