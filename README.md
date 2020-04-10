# leaflet-challenge

The United States Geological Survey (USGS) provides scientific data about natural disasters, the health of our ecosystems, and the impact of climate change on our environment. The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. The goal of this project is to create a visualization displaying the earthquake data in a meaningful way.


## Dataset

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. The data used for this visualization was obtained from the USGS GeoJSON Feed webpage. The JSON data was for all earthquakes in the past month.


## Visualization

A map was created using Leaflet that plots all of the earthquakes from the data set above based on the longitude and latitude.
- The data markers reflect the magnitude of the earthquake in their size and color
  - Earthquakes with higher magnitudes appear larger and darker in color 
- When a marker is clicked on the visualization, a popup will provide additional information about the earthquake
- There is a legend that provides context for the map data

![Leaflet Map](Images/map.png)


## Tools:

- Leaflet
- Mapbox
- JavaScript
- JSON
- HTML
- CSS


----------------------------------------------------------------------------------

## Resources:

-	https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
-	https://www.mapbox.com/
-	https://leafletjs.com/
-	https://stackoverflow.com/



