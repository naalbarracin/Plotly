function Metadata(person) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var results = metadata.filter(sampleObj => sampleObj.id == person);
      var list = d3.select("#sample-metadata");
      
      list.html("");

      Object.entries(results[0]).forEach(([key, value]) => {

        list.append("tr").text(`${key.toUpperCase()}: ${value}`);
      
    });  
    });
  }// End function Metadata(person)
  
  function Plots(person) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var results = samples.filter(sampleObj => sampleObj.id == person);
  
      var plot1data = [
        {
          x: results[0].otu_ids,
          y: results[0].sample_values,
          text: results[0].otu_labels,
          mode: "markers",
        }
      ];
  
      Plotly.newPlot("bubble", plot1data);
  
      var y = results[0].otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var plat2data = [
        {
          y: y,
          x: results[0].sample_values.slice(0, 10).reverse(),
          text: results[0].otu_labels.slice(0, 10).reverse(),
          type: "bar"
        }
      ];

  
      Plotly.newPlot("bar", plat2data);
    });
  }// End function Plots(person)
  
 
  function optionChanged(nextperson) {
    Plots(nextperson);
    Metadata(nextperson);
  }// End function optionChanged(nextperson)
  


 var selector = d3.select("#selDataset");
  
 d3.json("samples.json").then((data) => {
   var people = data.names;

   people.forEach((person) => {
     selector
       .append("option")
       .text(person)
       .property("value", person);
   });

   Plots(people[0]);
   Metadata(people[0]);
 });