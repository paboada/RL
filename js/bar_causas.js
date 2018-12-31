function bar_causas(){
    console.log("Comienza bar causas");
     d3.csv("../data/Causales.csv", function(datos){
         console.log("Iniciando funcion dsBarChart");    
        var firstDatasetBarChart = datos;
        //console.log("Datos Cargados");
        //console.log(firstDatasetBarChart);    
        var group = "All";
        var firstDatasetBarChart_filter = datasetBarChosen(group, firstDatasetBarChart); 
        
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
			   .domain([0,d3.max(firstDatasetBarChart, function(d) { 
                                   return parseInt(d.measure)  
                                   })])
			   .range([0, width]);
                   
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
            .style("font-size", (height / firstDatasetBarChart_filter.length - barPadding))
            .attr("transform", "translate(" + letter_scale(max_long_palabra) + "," + margin.top/2  + ")")
            .style("fill","black")
            
    ;
    
    console.log(firstDatasetBarChart_filter.length);
    
    var yLabels = svg.append("g")
		     //.attr("transform", "translate(" + 0 + "," + margin.top  + ")")
                     .attr("id","ejey")
		    ;
    
         //leyendas de cada barra--> ejemplo Datos Comerciales
    yLabels.selectAll("text.xAxis")
		  .data(firstDatasetBarChart_filter)
		  .enter()
		  .append("text")
		  .text(function(d) { return d.causa;})
                  .attr("x",0)
                  .attr("y", function(d, i) { return  (i * (height / firstDatasetBarChart_filter.length + barPadding)) + (height / firstDatasetBarChart_filter.length - barPadding);})
		  .attr("transform", "translate(" + 0 + "," + margin.top/2 + ")")
		  .attr("class", "xaxis_causa")
                  .style("font-size", "13px");	
          
    
                    
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
        var group_causa = "All";
        var data_causa = datasetBarChosen(group_causa, datos_sin_fitro);
                
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
			   .domain([0,d3.max(datos_sin_fitro, function(d) { 
                                   return parseInt(d.measure)  
                                   })])
			   .range([0, width]);
         
         /*console.log("Datos VIZ actuales");
         console.log(d3.select("#barChartPlot_causas").selectAll(".rect_causa"));
         console.log("Mapeados con")
         console.log(datos_filtrados);*/
         
         
         //BARRAS
         var barras = d3.select("#barChartPlot_causas").select(".cont")  //g que contiene los elementos
                        .selectAll(".rect_causa")      //rect bar
                        .data(datos_filtrados);
                
        /*console.log("Resultado")
        console.log(barras); */
        //enter
        barras.enter()
              .append("rect")
              .attr("x", 0)
              .attr("width",0)   
	      .attr("y",0) 
              .attr("height",0)
              .attr("class", "rect_causa");
        //exit
        barras.exit().remove();        
        //update      
        barras.attr("x", letter_scale(max_long_palabra))
              .attr("y", function(d, i) { return  (i * (height / parseInt(data_causa.length) + barPadding)) + (height / parseInt(data_causa.length) - barPadding);} ) 
              .transition()
              .duration(1000)
              .attr("width", function(d) {return(xScale(d.measure/2));})
              .attr("height",(height / parseInt(data_causa.length) - barPadding)) //los nuevos elementos no tienen estas propiedades, y los viejos son de los datos anteriores
              .attr("fill", colorChosen); 
        
       
      //CATEGORIAS BARRAS
      var labelsy = d3.select("#barChartPlot_causas")
                      .selectAll(".xaxis_causa")
                      .data(datos_filtrados);
      //enter
      labelsy.enter().append("text").attr("class","xaxis_causa");
      //exit
      labelsy.exit().remove();
      //update
      labelsy.text(function(d) { return d.causa;}) //a los nuevos elementos se debe actualizar todo, los viejos tienen los attr viejos pero los nuevos tienen por defecto
             .attr("x",0)
             .attr("y", function(d, i) { return  (i * (height / parseInt(data_causa.length) + barPadding)) + (height / parseInt(data_causa.length) - barPadding);})
             .attr("transform", "translate(" + 0 + "," + margin.top/2 + ")")
             .style("font-size", "13px");
  
      //numeros de las barras
      var labelsx = d3.select("#barChartPlot_causas")
                      .selectAll(".yAxis_causa")
                      .data(datos_filtrados);
      //enter
      labelsx.enter().append("text").attr("class","yAxis_causa");
      //exit
      labelsx.exit().remove();
      //update
      console.log(letter_scale(max_long_palabra) + " " + margin.top/2);
      labelsx.transition()
                .duration(750)
                .text(function(d) {return formatAsInteger(d3.round(d.measure));})
                .attr("x", function(d) {return(xScale(d.measure/2));})
                .attr("y", function(d, i) { return (i * (height / parseInt(data_causa.length) + barPadding)+ (height / parseInt(data_causa.length) - barPadding));})
                .attr("class", "yAxis_causa")
                .style("font-size", (height / parseInt(data_causa.length) - barPadding))
                .attr("transform", "translate(" + letter_scale(max_long_palabra) + "," + margin.top/2  + ")")
                .style("fill","black")
      
         ;
    });
}

function BarChartBasics() {
        
		var margin = {top: 30, right: 50, bottom: 20, left: 10},
		width = 800  - margin.left - margin.right,
	         height = 280 - margin.top - margin.bottom,
		colorBar = d3.scale.category20(),
		barPadding = 3
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
    console.log("maximo valor para la palabra " + maxima);
    //console.log(document.getElementById("ejex"))
  //var a = document.getElementById("ejex");
    return maxima;
    
    
}
