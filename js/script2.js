// same as document.ready()
$(function() {
    $.ajax({
        type: 'GET',
        url: 'data/broadband-internet-connections.json',
        dataType: 'json',
        success: generatePieChart
    });
    $.ajax({
        type: 'GET',
        url: '../data/broadband-download-speeds.json',
        dataType: 'json',
        success: generateBarGraph

    });

});

function generateBarGraph(data) {
    var slowest = [],
        secondSlowest = [],
        thirdSlowest = [],
        fourthSlowest = [],
        fifthSlowest = [],
        fastest = [],
        unknown = [];
    var slowestSum = 0,
        secondSlowestSum = 0,
        thirdSlowestSum = 0,
        fourthSlowestSum = 0,
        fifthSlowestSum = 0,
        fastestSum = 0,
        unknownSum = 0;

    slowest.push('Less than 1.5Mbps');
    secondSlowest.push('1.5Mbps to 8Mbps');
    thirdSlowest.push('8Mbps to 24Mbps');
    fourthSlowest.push('24Mbps to 50Mbps');
    fifthSlowest.push('50Mbps to 100 Mbps');
    fastest.push('100Mbps or greater');
    unknown.push('Unknown');

    $.each(data, function(i, item) {
        var node = data[i];
        if (node.Response === 'Download less than 1.5Mbps') {
            slowestSum += node.Connections;
        } else if (node.Response === 'Download 1.5Mbps to less than 8Mbps') {
            secondSlowestSum += node.Connections;
        } else if (node.Response === 'Download 8Mbps to less than 24Mbps') {
            thirdSlowestSum += node.Connections;
        } else if (node.Response === 'Download 24Mbps to less than 50Mbps') {
            fourthSlowestSum += node.Connections;
        } else if (node.Response === 'Download 50Mbps to less than 100Mbps') {
            fifthSlowestSum += node.Connections;
        } else if (node.Response === 'Download 100Mbps or greater') {
            fastestSum += node.Connections;
        } else {
            unknownSum += (node.Connections);
        }
    });

    slowest.push(slowestSum);
    secondSlowest.push(secondSlowestSum);
    thirdSlowest.push(thirdSlowestSum);
    fourthSlowest.push(fourthSlowestSum);
    fifthSlowest.push(fifthSlowestSum);
    fastest.push(fastestSum);
    unknown.push(unknownSum);

    var downloadSpeedBarGraph = c3.generate({
        bindto: '#broadband-download-speeds',
        axis: {
            y: {
            	label: {
            		text: 'Number of Responses',
            		position: 'outer-middle'
            	},
                tick: {
                    format: function(x) {
                        return d3.format(",")(x);
                    },
                }
            }
        },
      
        data: {
            columns: [
                slowest,
                secondSlowest,
                thirdSlowest,
                fourthSlowest,
                fifthSlowest,
                fastest,
                unknown
            ],
            type: 'bar'
        },
       
        tooltip: {
            format: {
                value: function(value) {
                    return d3.format(",")(value);
                }
            }
        }


    });




}

// Pie chart displaying the ratio of various types of broadband internet connections
function generatePieChart(data) {
    var dsl = [],
        cable = [],
        fibreOptic = [];
    var dslSum = 0,
        cableSum = 0,
        fibreOpticSum = 0;
    $.each(data, function(i, item) {
        var node = data[i];
        if (node.Response === 'Digital subscriber line') {
            dslSum += node.Connections;
        } else if (node.Response === 'Cellular, satellite, cable and fixed wireless') {
            cableSum += node.Connections;
        } else {
            fibreOpticSum += node.Connections;
        }
    });
    dsl.push('Digital subscriber line');
    cable.push('Cellular, satellite, cable and fixed wireless');
    fibreOptic.push('Fibre optic');
    dsl.push(dslSum);
    cable.push(cableSum);
    fibreOptic.push(fibreOpticSum);

    var broadbandPieChart = c3.generate({
        bindto: '#broadband-connections-pie',
        axis: {
            x: {
                label: {
                    text: 'blah'
                }
            }
        },
        data: {
            columns: [
                dsl,
                cable,
                fibreOptic
            ],
            type: 'pie'
        },
        tooltip: {
            title: 'blah'
        }, 
        size: {
        	height: 500
        }

    });
}
