// Define the URL for the earthquake data from USGS GeoJSON Feed page 
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"


// Create function to graph data
function createMap(response) {
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map geo_data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.streets",
            accessToken: API_KEY
    });
    // Define darkmap variable
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map geo_data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.dark",
            accessToken: API_KEY
    });
    // Define basemap
    var baseMaps = {
            "Street Map": streetmap,
            "Dark Map": darkmap
    };

    // Define main map
    var mainMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: streetmap
    });

    // Create pop up for each point based on magnitude information
    response.forEach(geo_data => {        
        if (geo_data.geometry) {
            let coord = [geo_data.geometry.coordinates[1], geo_data.geometry.coordinates[0]]
            return L.circle(coord, {
                radius: geo_data.properties.mag * 30000,
                color: "white",
                fillColor: magnitudeColor(geo_data.properties.mag),
                fillOpacity: 0.75,
                weight: 0.5
            }).bindPopup("<h1>" + geo_data.properties.title + "</h1> <hr> <h3>Magnitude: " + geo_data.properties.mag + "</h3>").addTo(mainMap);
        }
    })
    
    // Create legend that shows the magnitude info by color
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        mags = ["0-1","1-2","2-3","3-4","4-5","5-6","6-7",">7"]
        colors = [0.5,1.5,2.5,3.5,4.5,5.5,6.5,7.5]
        div.innerHTML += "<ul><strong>Magnitude of Earthquake</strong></ul>" + "<hr>";
        for (var i = 0; i < mags.length; i++) {
            div.innerHTML +=
                '<i style="background:' + magnitudeColor(colors[i]) + '"></i> ' +
                (mags[i] ? mags[i] + '<br>' : '+');
        }
        return div;
    };
    L.control.layers(baseMaps).addTo(mainMap);

    legend.addTo(mainMap);
}

// Create function to choose the color based on the magnitude
function magnitudeColor(magnitude) {
    if (magnitude < 1) {
      return "#40E0D0"
    }
    else if (magnitude < 2) {
      return "#66CDAA"
    }
    else if (magnitude < 3) {
      return "#ADFF2F"
    }
    else if (magnitude < 4) {
      return "#FFFF00"
    }
    else if (magnitude < 5) {
      return "#FFA500"
    }
    else if (magnitude < 6) {
      return "#FF8C00"
    }
    else if (magnitude < 7) {
      return "#FF4500"
    }
    else {
      return "#FF0000"
    }
  }

// Obtain json data from site and apply function created above to map out info
d3.json(earthquakeURL, function(data) {
  createMap(data.features);
    console.log(data.features)
});