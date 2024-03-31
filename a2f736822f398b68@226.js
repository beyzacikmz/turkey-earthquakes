function _1(md){return(
md`# Historical Earthquakes in Turkey
`
)}

function _2(md){return(
md`## 1. Introduction
The moment magnitude (Mw) 7.8 and 7.7 two earthquakes in Kahramanmaras, Turkey on 6 February 2023 caused enormous destruction and tens of thousands of casualties from collapsed structures and together were one of the deadliest natural disasters for Turkey and Syria over the past millennium (Edrik et al., 2023). According to the Earthquake Department of the Disaster and Emergency Management Presidency (AFAD), an earthquake is briefly defined as follows: it is the phenomenon of vibrations that occur suddenly due to fractures in the earth's crust, spreading as waves and shaking the environment and the earth they pass through. Turkey is a seismically active, first-degree earthquake country on the Alpine-Himalayan Mountain belt, surrounded by active fault lines (Unlugenc et al., 2023). There are 3 fault lines: the Northern Anatolian Fault Line, the Eastern Anatolian Fault Line, and the Western Anatolian Fault Line. The most active and dangerous fault line is the Western Anatolian Fault Line.

** Project Website Link **
`
)}

function _3(md){return(
md` ## 2. Project Goal & Objectives
Turkey ranks third in the world in terms of earthquake-related casualties and eighth concerning the total number of people affected. In addition, it is a fact that the country experiences at least one 5-magnitude earthquake every year. The overarching goal of the project is whether there is a pattern of earthquakes' location or not. If the earthquakes that have occurred over the years have a spatial order, this will provide answers to public and private organizations about which regions should be focused on the correct management and coordination of this natural disaster. In this way, necessary measures, comprehensive plans, and land use policies can be produced for some cities instead of all 81 cities in Turkey.

Even though the regions through which fault lines pass have been defined in the field of geology, spatial interpretations cannot be made about earthquake frequencies and patterns over the years. This project plans to produce an interactive map containing all earthquakes, which were recorded by the USGS, locations, magnitudes, and dates between 1990 and 2024 years. This study will guide earthquake experts, researchers, and academicians about the spatial distribution of past earthquakes. It will also provide earthquake information to individuals and communities in Turkey regarding the environment they live in. As a result of the study to be conducted, answers to the questions listed below will be found.
* Where did the major earthquakes occur between 1990-2024 and what are their magnitudes?
* What are the other regions/cities affected by major earthquakes?
* In which regions/cities have earthquakes occurred most frequently in approximately 35 years?
* How often do earthquakes occur each year?
* Do the earthquakes that have occurred over approximately 35 years have a pattern? In other words, can we state that an earthquake with a magnitude of 5 occurs in a certain region every 10 years?
`
)}

function _4(md){return(
md` ## 3. Literature Review
Generally, an earthquake with a magnitude between M = 7.0 and M = 7.9 (caused serious damage) is considered a major earthquake (Michigan Technological University, 2021). The return period for major earthquakes that occurred in Turkey is seven years, and considering the fault characteristics in Turkey, it is expected to be a major earthquake in the coming years (Atmaca et al., 2020). In addition, Atmaca et al.’s study includes historical earthquakes with magnitude M = 7.0 and greater since 1900 and magnitude M = 6.0 and greater since 1992. As a result, their outcome indicated that most historical earthquakes with magnitudes greater than 7 occurred in regions located close to the North Anatolian Fault whereas most earthquakes with magnitudes greater than 6 occurred close to the East Anatolian Fault and West Anatolian Fault instead of the North Anatolian Fault.
`
)}

function _5(md){return(
md` ## 4. Data Collection and Maps
* **Earthquake Data**

The USGS Earthquake Catalog contains earthquake source parameters (e.g. hypocenters, magnitudes, phase picks, and amplitudes) and other products (e.g. moment tensor solutions, macroseismic information, tectonic summaries, maps) produced by contributing seismic networks. The data of historic earthquakes in Turkey between 1990 and 2024 years were found in the USGS Earth Catalog. The data was first downloaded as a CSV file and then converted to point vector data using latitude and longitude information in QGIS. The link can be accessed below.

https://earthquake.usgs.gov/earthquakes/search/

* **Border of Turkey**

The border data, which includes the borders of all 81 cities of Turkey, can be accessed via the link below.

https://data.humdata.org/dataset/cod-ab-tur

According to metadata information, the data source is the General Command of Mapping. In fact, the Administrative Divisions dataset was prepared at a 1:1,000,000 scale and is the property of the General Command of Mapping, Turkey. This dataset was shared through http://www.hgk.msb.gov.tr/u-23-turkiye-mulki-idare-sinirlari.html for humanitarian use only.
`
)}

function _6(md){return(
md`## 5. Draft Maps
* **1990 Earthquakes in Turkey** 

Please look at this link
https://observablehq.com/d/220c2d06e58f3513
* **2023 Earthquakes in Turkey**
`
)}

function _proportionalSymbols(d3,width,height,topojson,basepolygons,path_basemap,data,radius,format,points,path_points)
{
  const svg = d3.create("svg")
     .attr("viewBox", [0, 0, width, height]); 
  
  svg.append("path") 
     .datum(topojson.feature(basepolygons, basepolygons.objects.turkey)) 
     .attr("fill", "#ccc") 
     .attr("d", path_basemap);

    svg.append("path") 
      .datum(topojson.mesh(basepolygons, basepolygons.objects.turkey, (a, b) => a !== b))
      .attr("fill", "none") 
      .attr("stroke", "white") 
      .attr("stroke-linejoin", "round") 
      .attr("stroke-width", 1) 
      .attr("d", path_basemap);
   
  const legend = svg.append("g") 
      .attr("fill", "#777")
      .attr("transform", "translate(100,550)")
      .attr("text-anchor", "middle")
      .style("font", "10px sans-serif")
    .selectAll("g")
      .data([0, d3.max([...data.values()])]) 
    .join("g");
  
    legend.append("circle") 
      .attr("fill", "#bd0026") 
      .attr("fill-opacity", 0.4) 
      .attr("stroke", "#bd0026") 
      .attr("stroke-width", 1) 
      .attr("cy", d => -radius(d))
      .attr("r", radius);
  
    legend.append("text") 
      .attr("y", d => -2 * radius(d))
      .attr("dy", "1.3em")
      .text(format);
  
  svg.append("g") 
      .attr("fill", "#bd0026")
      .attr("fill-opacity", 0.4) 
      .attr("stroke", "#bd0026") 
      .attr("stroke-width", 1) 
    .selectAll("circle") 
    .data(points.features 
    .map(d => (d.value = data.get(d.properties.ID), d)) 
    .sort((a, b) => b.value - a.value)) 
    .join("circle")
      .attr("transform", d =>`translate(${path_points.centroid(d)})`) 
      .attr("r", d => radius(data.get(d.properties.ID))) 
      .append("title")
      .text(d => `${d.properties.ID} : ${format(d.value)}`);
  
  return svg.node();
}


function _path_points(d3,projection){return(
d3.geoPath().projection(projection)
)}

function _path_basemap(d3,projection){return(
d3.geoPath().projection(projection)
)}

function _projection(d3,width,height,cities){return(
d3.geoTransverseMercator().rotate([94,0]).fitExtent([[80, 80], [width, height]], cities)
)}

function _margin(){return(
100
)}

function _height(){return(
610
)}

function _width(){return(
975
)}

function _format(d3){return(
d3.format(".2s")
)}

function _radius(d3,data){return(
d3.scaleSqrt([0, d3.max([...data.values()])], [0, 15])
)}

function _data(csv_data){return(
Object.assign(new Map(csv_data))
)}

async function _csv_data(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("2023.csv").text(),({ID, mag}) => [+ID, +mag])
)}

function _points(FileAttachment){return(
FileAttachment("2023.geojson").json()
)}

function _cities(topojson,basepolygons){return(
topojson.feature(basepolygons, basepolygons.objects.turkey)
)}

function _basepolygons(FileAttachment){return(
FileAttachment("turkey.json").json()
)}

function _simple(require){return(
require("simple-statistics@7.0.7/dist/simple-statistics.min.js")
)}

function _topojson(require){return(
require("topojson-client@3")
)}

function _d3(require){return(
require("d3@5")
)}

function _24(md){return(
md` ## 6. Planned Presentation Techniques
I planned two geographic visualization methods that could be used to visualize Turkey's 1990-2024 earthquake data. *

* ** Dorling Cartogram **

The Dorling cartogram (Dorling, 1996), named after the geographer Danny Dorling, is a method of representing absolute quantitative data with proportional circles while avoiding the superimposition of these. A Dorling cartogram does not preserve the shape, topology, or centroids of the objects and is an abstract representation of the spatial configuration of the mapped phenomena. This representation technique is often used without a background map on top. Thanks to the Dorling cartogram method, I might have shown which city in Turkey has witnessed the most and few earthquakes over the years. In this way, public institutions can focus on the cities that witness earthquakes most frequently and start the necessary precautions for these cities. The link below gives an example of the Dorling Cartogram.

https://observablehq.com/@harrystevens/dorling-cartogram

* ** Proportional Symbol Map **

Proportional symbol maps scale the size of simple symbols ( circle or square) proportionally to the data value found at that location. The basic method is to scale the shapes directly proportionate to the data. Therefore, the larger the symbol the “more” of something exists at a location. Contrary, the smallest circle illustrates the "low" of something. In this way, the exact locations and magnitudes information of earthquakes are presented. If this proportional symbol map were combined with online maps such as Google Earth or Google Maps, individuals and communities living in Turkey could easily understand the earthquake history in the regions they live in. When I searched the visualization examples about earthquakes, I came across a study about Iceland's Earthquakes. The link below is an example of the proportional symbol map I am considering.

https://observablehq.com/@luissevillano/iceland-earthquakes-map
`
)}

function _25(md){return(
md` ## References
Unlugenc, U. C., Akinci, A. C., Ocgun, A. G. (2023). 6 Şubat 2023 Kahramanmaraş-Gaziantep Depremleri; Adana İli ve Yakın Kesimlerine Yansımaları. Geosound, 57(1), 1-41.

Erdik, M., Tümsa, M. B. D., Pınar, A., Altunel, E., & Zülfikar, A. C. (2023). A preliminary report on the February 6, 2023 earthquakes in Türkiye. Research Briefs.

Michigan Technological University. (2021, October 4). Earthquake magnitude scale. https://www.mtu.edu/geo/community/seismology/learn/earthquake-measure/magnitude/

Atmaca, B., Demir, S., Günaydın, M., Altunışık, A. C., Hüsem, M., Ateş, Ş., Adanur, S. & Angın, Z. (2020). Lessons learned from the past earthquakes on building performance in Turkey. J. Struct. Eng. Appl. Mech, 3(2), 61-84.

`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["2023.csv", {url: new URL("./files/1c89489e479001e978124ce444a6fa92aa9c4c7c12cf7af92e0a68befb5f13e49a6ba632aacd460fe3996acd129dd87eb240ac93378dcb013032f5ce3547de58.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2023.geojson", {url: new URL("./files/df8c2dfa07ee799d126fc4b145ea83f4d93e124e4cd1de596cbcb8f4b9f512e27470740c6bba8f65fc8e0832895cad3a9c4a602910fc9f74a3567b6d1c1349c2.geojson", import.meta.url), mimeType: "application/geo+json", toString}],
    ["turkey.json", {url: new URL("./files/55ef7a20c3019f36db381ede3443d55090312a24f981ed08552b673f370574e2535a4ca66a078e8275a60812ba07658dd4bd0e3e0e7f5a1dd4efddab5e2a8da7.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("proportionalSymbols")).define("proportionalSymbols", ["d3","width","height","topojson","basepolygons","path_basemap","data","radius","format","points","path_points"], _proportionalSymbols);
  main.variable(observer("path_points")).define("path_points", ["d3","projection"], _path_points);
  main.variable(observer("path_basemap")).define("path_basemap", ["d3","projection"], _path_basemap);
  main.variable(observer("projection")).define("projection", ["d3","width","height","cities"], _projection);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("format")).define("format", ["d3"], _format);
  main.variable(observer("radius")).define("radius", ["d3","data"], _radius);
  main.variable(observer("data")).define("data", ["csv_data"], _data);
  main.variable(observer("csv_data")).define("csv_data", ["d3","FileAttachment"], _csv_data);
  main.variable(observer("points")).define("points", ["FileAttachment"], _points);
  main.variable(observer("cities")).define("cities", ["topojson","basepolygons"], _cities);
  main.variable(observer("basepolygons")).define("basepolygons", ["FileAttachment"], _basepolygons);
  main.variable(observer("simple")).define("simple", ["require"], _simple);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  return main;
}
