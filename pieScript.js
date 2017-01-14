/**
 * Created by ishi on 1/12/17.
 */

var width = 400,
    height = 400,
    radius = 200,
    colors = d3.scale.category20c();


var piedata = [
    {
        label: 'Ash',
        value: 20
    },
    {
        label: 'Aleeza',
        value: 20
    },
    {
        label: 'Abby',
        value: 20
    },
    {
        label: 'Mariam',
        value: 20
    },
    {
        label: 'Mubashir',
        value: 20
    },
    {
        label: 'Rubecka',
        value: 20
    },
    {
        label: 'Naeem',
        value: 20
    }
]

var pie = d3.layout.pie()
    .value(function(d) {
        return d.value;
    })

var arc = d3.svg.arc()
    .outerRadius(radius)

var myChart = d3.select('#pieChart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate('+ (width - radius) +', '+ (height - radius) +')')
    .selectAll('path').data(pie(piedata))
    .enter().append('g')
    .attr('class', 'slice')

var slices = d3.selectAll('g.slice')
    .append('path')
    .attr('fill', function(d, i) {
        return colors(i);
    })
    .attr('d', arc)

var text = d3.selectAll('g.slice')
    .append('text')
    .text(function(d,i) {
        return d.data.label;
    })
    .attr('text-anchor', 'middle')
    .attr('fill', '#fff')
    .attr('transform', function(d) {
        d.innerRadius = 0;
        d.outerRadius = radius;
        return 'translate('+arc.centroid(d)+')'
    })
