// same as document.ready()
$(function() {
    loadData("data/library-internet-sessions-2011-2016-condensed.json");


});

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
        }
        else if (library.Library === 'Hilo') {
            for (var prop in library) {
                hiloData.push(library[prop]);
            }
        }
        else if (library.Library === 'Pearl City') {
            for (var prop in library) {
                pearlCityData.push(library[prop]);
            }
        }
         else if (library.Library === 'Kaimuki') {
            for (var prop in library) {
                kaimukiData.push(library[prop]);
            }
        }

    });
    console.log(hslData);

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
            ]
        },
        axis: {
            x: {
                label: {
                    text: "Years"
                }
            },
            y: {
                label: {
                    text: "Number of internet sessions",
                    position: "outer-middle"

                }
                
            }
        },
        size: {
            height: 380
        }
    });
}
