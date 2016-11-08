// same as document.ready()
$(function() {
    loadData("data/library-internet-sessions-2011-2016-condensed.json");
    generateHighMap();
    $('#bronx-wifi-hotspots').DataTable({
        "ajax": '../data/bronx-wifi-hotspots.json'
    });


});

function generateHighMap() {
    var H = Highcharts,
        map = H.maps['countries/us/us-ny-all'],
        nyChart;
    var data = [];
    $.getJSON('../data/free-wifi-hotspots-ny.json', function(json) {
        $.each(json, function() {
            data.push(this);
        });

        console.log(data);
        nyChart = Highcharts.mapChart('wifi-hotspots-highmaps', {
            title: {
                text: 'Free wi-fi hotspots in New York City'
            },
            mapNavigation: {
                enabled: false
            },
            turboThreshold: 0,
            tooltip: {
                pointFormat: 'Name: {point.NAME} <br> Location: {point.LOCATION}, {point.CITY}<br>' +
                    'Lat: {point.lat}<br>' +
                    'Lon: {point.lon}<br>' +
                    'Type: {point.TYPE}'
            },

            series: [{
                name: 'Basemap',
                mapData: map,
                borderColor: '#606060',
                nullColor: 'rgba(200, 200, 200, 0.2)',
                showInLegend: false
            }, {
                name: 'Separators',
                type: 'mapline',
                data: H.geojson(map, 'mapline'),
                color: '#101010',
                enableMouseTracking: false,
                showInLegend: false
            }, {
                type: 'mappoint',
                dataLabels: {
                    enabled: true,
                    format: '{point.LAT}'
                },
                name: 'Wi-fi hotspot',
                data: data,
                maxSize: '12%',
                color: H.getOptions().colors[0]
            }]

        });
        nyChart.mapZoom(0.15, 4300, 100, 30, 500);


    });



}

function loadData(dataURL) {
    $.ajax({
        type: 'GET',
        url: dataURL,
        dataType: 'json',
        success: generateLibraryChart
    });
}

function generateLibraryChart(data) {
    var hslData = [];

    var hiloData = [];
    var pearlCityData = [];
    var kaimukiData = [];

    $.each(data, function(i, item) {
        var library = data[i];
        if (library.Library === 'Health Sciences Library') {
            for (var prop in library) {
                hslData.push(library[prop]);
            }
        } else if (library.Library === 'Hilo') {
            for (var prop in library) {
                hiloData.push(library[prop]);
            }
        } else if (library.Library === 'Pearl City') {
            for (var prop in library) {
                pearlCityData.push(library[prop]);
            }
        } else if (library.Library === 'Kaimuki') {
            for (var prop in library) {
                kaimukiData.push(library[prop]);
            }
        }

    });

    var libraryChart = c3.generate({
        bindto: '#library-internet-chart',
        data: {
            x: 'years',
            columns: [
                ['years', 2006, 2007, 2008, 2009, 2010, 2011],
                hslData,
                hiloData,
                pearlCityData,
                kaimukiData
            ],
            type: 'spline'
        },
        axis: {
            x: {
                label: {
                    text: "Year"
                }
            },
            y: {
                label: {
                    text: "Number of internet sessions",
                    position: "outer-middle"

                },
                tick: {
                    format: function(x) {
                        return d3.format(",")(x);
                    },
                }

            }
        },
        size: {
            height: 380
        }
    });
}
