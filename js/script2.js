// same as document.ready()
$(function() {
    $.ajax({
        type: 'GET',
        url: '../data/broadband-internet-connections.json',
        dataType: 'json',
        success: generatePieChart
    });

});

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

    console.log(fibreOptic);

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
        title: {
        	text: 'Various kinds of internet connections in New Zealand from 2011-2015'
        },
        tooltip: {
        	title: 'blah'
        }

    });
}
