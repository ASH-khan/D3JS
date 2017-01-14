var bardata = [];

// for (var i = 0; i < 30; i++) {
//     bardata.push(Math.round(Math.random() * 80) + 20);
// }

/*  convert the bardata into numeric data
    using js sorting function
*/
// bardata.sort(function compareNumbers(a, b) {
//     return a - b;
// });


// using External data and d3 tsv method.
d3.tsv('data.tsv', function(data) {
    console.log(data)
    for (key in data) {
        bardata.push(data[key].value);
    }

    var margin = {
        top: 30,
        right: 30,
        bottom: 40,
        left: 50
    }

    var height = 400 - margin.top - margin.bottom,
        width = 600 - margin.left - margin.right,
        barWidth = 50,
        baroffset = 5;

    var tempColor;

    var yScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([0, height]);

    var xScale = d3.scale.ordinal()
        .domain(d3.range(0, bardata.length))
        .rangeBands([0,width], .2);

    var colors = d3.scale.linear()
        .domain([0, bardata.length* .33, bardata.length* .66, bardata.length])
        .range(["red",'green', 'pink', 'yellow']);

    var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#ffffff')
        .style('opacity', 0)

    var myChart = d3.select('#chart').append('svg')
        .style('background', '#888')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate('+ margin.left + ', '+ margin.top +')')
        .selectAll('rect')
        .data(bardata)
        .enter().append('rect')
        .style('fill', function(d,i) {
            return colors(i);
        })
        .attr('width', xScale.rangeBand())
        .attr('height', 0)
        .attr('x', function(d, i) {
            return xScale(i);
        })
        .attr('y', height)
        .on('mouseover', function(d) {
            tooltip.transition()
                .style('opacity', .9)

            tooltip.html(d)
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY - 35) + 'px')

            tempColor = this.style.fill;

            d3.select(this)
                .transition()
                .style('opacity', .5)
                .style('fill', 'yellow')
        })
        .on('mouseout', function(d) {
            tooltip.transition()
                .style('opacity', 0)

            d3.select(this)
                .transition()
                .style('opacity', 1)
                .style('fill', tempColor)
        })

    /*  using this variable to apply transitions
     to the entire
     chart.
     */
    myChart.transition()
        .attr('height', function(d){
            return yScale(d);
        })
        .attr('y', function(d) {
            return height - yScale(d);
        })
        .delay(function(d,i) {
            return i * 15;
        })
        .duration(1000)
        .ease('elastic')

    /*  creating a vertical guide for visualisation
     creating a separate scale for Guide to show
     data from 0 to max(bottom to top)
     */
    var vGuideScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([height, 0])

    var vAxis = d3.svg.axis()
        .scale(vGuideScale)
        .orient('left')
        .ticks(10)

    var vGuide = d3.select('svg').append('g')

// linking the vGuide we created with vAxis
    vAxis(vGuide)
    vGuide.attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
    vGuide.selectAll('path')
        .style({fill: 'none', stroke: '#000'})
    vGuide.selectAll('line')
        .style({stroke: '#000'})


    /*  creating a horizontal guide for visualisation
     creating a separate scale for Guide to show
     data from 0 to max(bottom to top)
     */

    var hAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .tickValues(xScale.domain().filter(function(d,i){
            return !(i % (bardata.length/5));
        }))

    var hGuide = d3.select('svg').append('g')
    hAxis(hGuide)
    hGuide.attr('transform', 'translate('+ margin.left +', '+ (height + margin.top) +')')
    hGuide.selectAll('path')
        .style({fill: 'none', stroke: '#000'})
    hGuide.selectAll('line')
        .style({stroke: '#000'})
});


