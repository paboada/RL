function bar_causas(){
    console.log("Comienza bar causas");
     d3.csv("../data/Causales.csv", function(datos){
         console.log("Iniciando funcion dsBarChart");    
        var firstDatasetBarChart = datos;
        //console.log("Datos Cargados");
        //console.log(firstDatasetBarChart);    
        var group = "All";
        var firstDatasetBarChart_filter = datasetBarChosen(group, firstDatasetBarChart); 
        //console.log(firstDatasetBarChart_filter);
	var basics = BarChartBasics();
	var max_long_palabra = max_lon_causa(firstDatasetBarChart_filter);
        console.log(max_long_palabra);
	var margin = basics.margin,
		width = basics.width,
	   height = basics.height,
		colorBar = basics.colorBar,
		barPadding = basics.barPadding
		;
        
        
        var letter_scale = d3.scale.linear().domain([0,max_long_palabra]).range([0, width/2]);
                        
        var xScale = d3.scale.linear()
			   .domain([0,d3.max(firstDatasetBarChart_filter, function(d) { 
                                   return parseInt(d.measure)  
                                   })])
			   .range([0, width]);
                   
        var yScale = d3.scale.linear()
		       .domain([0,firstDatasetBarChart_filter.length])
		       .range([0,height])
		   ;
        //Create SVG element	
	var svg = d3.select("#barChart_causas")
		    .append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .attr("id","barChartPlot_causas")
		    ;
        
        var plot = svg.append("g")
                    .attr("class", "cont")
		    ;
        
        //barras
        plot.selectAll("rect")
		   .data(firstDatasetBarChart_filter)
		   .enter()
		   .append("rect")
		   .attr("x", letter_scale(max_long_palabra))
		   .attr("width", function(d) {return(xScale(d.measure/2));})   
		   .attr("y", function(d, i) { return  (i * (height / firstDatasetBarChart_filter.length + barPadding)) + (height / firstDatasetBarChart_filter.length - barPadding);} ) 
                   .attr("height",(height / firstDatasetBarChart_filter.length - barPadding))
                   .attr("fill", "lightgrey")
                   //.attr("transform", "translate(" + letter_scale(max_long_palabra) + "," + 0 + ")")
                   .attr("class", "rect_causa")
		   ;
        
        //texto para numeros de barras
        plot.selectAll("text")
	    .data(firstDatasetBarChart_filter)
	    .enter()
	    .append("text")
	    .text(function(d) {return formatAsInteger(d3.round(d.measure));})
	    .attr("x", function(d) {return(xScale(d.measure/2));})
	    .attr("y", function(d, i) { return (i * (height / firstDatasetBarChart_filter.length + barPadding)+ (height / firstDatasetBarChart_filter.length - barPadding));})
	    .attr("class", "yAxis_causa")
            .style("font-size", (height / firstDatasetBarChart_filter.length))
            .attr("transform", "translate(" + letter_scale(max_long_palabra) + "," + 13  + ")")
            .style("fill","black")
            
    ;
    
    var xLabels = svg.append("g")
		     //.attr("transform", "translate(" + 0 + "," + margin.top  + ")")
                     .attr("id","ejex")
		    ;
    
         //leyendas de cada barra--> ejemplo Datos Comerciales
    xLabels.selectAll("text.xAxis")
		  .data(firstDatasetBarChart_filter)
		  .enter()
		  .append("text")
		  .text(function(d) { return d.causa;})
                  .attr("x",0)
                  .attr("y", function(d, i) { return  (i * (height / firstDatasetBarChart_filter.length + barPadding)) + (height / firstDatasetBarChart_filter.length - barPadding);})
		  .attr("transform", "translate(" + 0 + "," + 13 + ")")
		  .attr("class", "xaxis_causa")
                  .style("font-size", (height / firstDatasetBarChart_filter.length));	
                    
    });
}



function datasetBarChosen(group, firstDatasetBarChart) {
         //console.log("Datos Filtrados con el tag : " + group);
         //console.log(firstDatasetBarChart.filter(function(d) { return d.group === group;}));
	 return firstDatasetBarChart.filter(function(d) { return d.group === group;});
}


function update_causas(group, colorChosen, archivo) {
    
     d3.csv(archivo, function(datos){  
        console.log("Iniciando ACTUALIZACION update_causas");
        var datos_sin_fitro = datos;
                //console.log(datos);
		var datos_filtrados = datasetBarChosen(group,datos_sin_fitro );
                //console.log(datos_filtrados);
                 
               var max_long_palabra = max_lon_causa(datos_filtrados);
               
                
		var basics = BarChartBasics();	
		var margin = basics.margin,
			width = basics.width,
		   height = basics.height,
			colorBar = basics.colorBar,
			barPadding = basics.barPadding
			;
        
         //console.log(d3.max(datos_filtrados, function(d) { //console.log(d.measure); return d.measure }));
         var letter_scale = d3.scale.linear().domain([0,max_long_palabra]).range([0, width/2]);
         
         //var prueba = d3.scale.linear().domain([0,10]).range([0, 800]);
         //console.log(max_long_palabra);
         //console.log(prueba(max_long_palabra));
         //console.log(d3.select("#barChartPlot_causas").select(".ejex"));
         
        var xScale = d3.scale.linear()
			   .domain([0,d3.max(datos_filtrados, function(d) { 
                                   return parseInt(d.measure)  
                                   })])
			   .range([0, width]);
                  
         d3.select("#barChartPlot_causas")
             .selectAll(".rect_causa")
		   .data(datos_filtrados)
		   .transition()
	           .duration(750)
                   .attr("x", letter_scale(max_long_palabra))
		   .attr("width", function(d) {return(xScale(d.measure/2));})
                   .attr("fill", colorChosen)
           
		   ;
         
             
      //actualizo labels de barras
      var labelsy = d3.select("#barChartPlot_causas").selectAll(".xaxis_causa").data(datos_filtrados);
      labelsy.text(function(d) { return d.causa;})
             .attr("transform", "translate(" + 0 + "," + 13 + ")");
  
  
      var labelsx = d3.select("#barChartPlot_causas").selectAll(".yAxis_causa").data(datos_filtrados);
       labelsx.transition()
	      .duration(750)
              .text(function(d) { return d.measure;})
              .attr("x", function(d) {return(xScale(d.measure/2));})
              .attr("transform", "translate(" + letter_scale(max_long_palabra) + "," + 13  + ")")
         ;
      
});
}

function BarChartBasics() {
        
		var margin = {top: 30, right: 50, bottom: 20, left: 10},
		width = 800  - margin.left - margin.right,
	         height = 150 - margin.top - margin.bottom,
		colorBar = d3.scale.category20(),
		barPadding = 5
		;
		
		return {
			margin : margin, 
			width : width, 
			height : height, 
			colorBar : colorBar, 
			barPadding : barPadding
		}			
		;
                }

function max_lon_causa(datos_filtrados){
    var maxima  = d3.max(datos_filtrados, function(d) { 
                                   //console.log(d.causa + " mide " + d.causa.length)
                                   return d.causa.length; 
                                   })
    //console.log("maximo valor para la palabra" + maxima);
    console.log(document.getElementById("ejex"))
  var a = document.getElementById("ejex");
    return maxima;
    
    
}
