function dsBarChart(seccion, sub, archivo) {
    
    d3.csv(archivo, function(datos){
         console.log("Iniciando funcion dsBarChart");    
        var firstDatasetBarChart = datos;
        var group = "All";
        var firstDatasetBarChart_filter = datasetBarChosen(group, firstDatasetBarChart); 
        //console.log(firstDatasetBarChart_filter);
	var basics = dsBarChartBasics();
	
	var margin = basics.margin,
		width = basics.width,
	   height = basics.height,
		colorBar = basics.colorBar,
		barPadding = basics.barPadding
		;
	//console.log(firstDatasetBarChart_filter.length);				
	var xScale = d3.scale.linear()
			   .domain([0, firstDatasetBarChart_filter.length])
			   .range([0, width]);
        
	var yScale = d3.scale.linear()
		       .domain([0, d3.max(firstDatasetBarChart_filter, function(d) { if(sub==="integracion"){
                return d.integracion; 
            }else{
                return d.proceso;
            } })])
		       .range([height, 0])
		   ;	
	//Create SVG element	
	var svg = d3.select(seccion)
			.append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .attr("id","barChartPlot" + "_" + sub)
		    ;
	
	var plot = svg
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .attr("class", "cont_"+sub)
		    ;
	            
	plot.selectAll("rect")
		   .data(firstDatasetBarChart_filter)
		   .enter()
		   .append("rect")
                   .attr("class", sub)
		   .attr("x", function(d, i) {
			                      return xScale(i);
			                     })
		   .attr("width", width / firstDatasetBarChart_filter.length - barPadding)   
		   .attr("y", function(d) {
                                            if (seccion === "#barChart_proceso") {
                                                return yScale(d.proceso);
                                    }else {
                                                return yScale(d.integracion);
                                            }
			})  
		   .attr("height", function(d) {
                                                if(seccion === "#barChart_proceso"){
			                        return height-yScale(d.proceso);
                                    }else{
                                        return height-yScale(d.integracion);
                                    }
			                       })
		   .attr("fill", "lightgrey")
		   ;
	
		
	// Add y labels to plot	
	
	plot.selectAll("text")
	    .data(firstDatasetBarChart_filter)
	    .enter()
	    .append("text")
	    .text(function(d) {
                              if(sub==="proceso"){
			       return formatAsInteger(d3.round(d.proceso));
                   }else{
                       return formatAsInteger(d3.round(d.integracion));
                   }
	                      })
	    .attr("text-anchor", "middle")
	    // Set x position to the left edge of each bar plus half the bar width
	    .attr("x", function(d, i) { return (i * (width / firstDatasetBarChart_filter.length)) + ((width / firstDatasetBarChart_filter.length - barPadding) / 2);
	                              })
	    .attr("y", function(d) {
                        if(sub==="proceso"){
                            return (parseInt(yScale(d.proceso)) + parseInt(14));
                }else{
                    return (parseInt(yScale(d.integracion)) + parseInt(14));
                }
	                           })
	    .attr("class", "yAxis")
        .style("font-size", "18px");

	// Add x labels to chart	
	
	var xLabels = svg
		    .append("g")
		    .attr("transform", "translate(" + parseInt(margin.left+20) + "," + (margin.top + height)  + ")")
                    .attr("class","ejex")
		    ;
	
	xLabels.selectAll("text.xAxis")
		  .data(firstDatasetBarChart_filter)
		  .enter()
		  .append("text")
		  .text(function(d) { return d.category;})
		  .attr("text-anchor", "middle")
                  .attr("x", function(d, i) {
					     return (i * (width / firstDatasetBarChart_filter.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
				            })
                  .attr("transform", "translate(" + parseInt(margin.left+10) + "," + 0 + ")")
		  .attr("y", 15)
		  .attr("class", "xAxis")
		  
		  ;			
	 
	// Title
	
	svg.append("text")
		.attr("x", (width + margin.left + margin.right)/2)
		.attr("y", 15)
		.attr("class","title")				
		.attr("text-anchor", "middle")
		.text("Top Categorias General")
                .style("font-size", "12px")
		;
                });
         
}

function datasetBarChosen(group, firstDatasetBarChart) {
         //console.log(firstDatasetBarChart.filter(function(d) { return d.group === group;}));
	 return firstDatasetBarChart.filter(function(d) { return d.group === group;});
}

function dsBarChartBasics() {
        
		var margin = {top: 30, right: 10, bottom: 20, left: 10},
		width = 200  - margin.left - margin.right,
	         height = 150 - margin.top - margin.bottom,
		colorBar = d3.scale.category20(),
		barPadding = 8
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


function updateBarChart(group, colorChosen, seccion, titulo, sub, archivo) {
    
    d3.csv(archivo, function(datos){  
        //console.log("Iniciando ACTUALIZACION updateBarChart");
        var currentDatasetBarChart_json = datos;
		var currentDatasetBarChart = datasetBarChosen(group,currentDatasetBarChart_json );		
		var basics = dsBarChartBasics();	
		var margin = basics.margin,
			width = basics.width,
		   height = basics.height,
			colorBar = basics.colorBar,
			barPadding = basics.barPadding
			;
		
		var 	xScale = d3.scale.linear()
			.domain([0, currentDatasetBarChart.length])
			.range([0, width])
			;
                        
		//console.log("valor maximo");
		//console.log(d3.max(currentDatasetBarChart, function(d) { return parseInt(d.measure); }));	
                
                //funciona
		/*var yScale = d3.scale.linear()
	                        .domain([0, d3.max(currentDatasetBarChart, function(d) { 
                      
                                                return parseInt(d.integracion); 
                                                                                       })])
	                        .range([height,0]);*/
                        
                var yScale = d3.scale.linear()
	                        .domain([0, d3.max(currentDatasetBarChart, function(d) { 
                                                if(sub === "integracion"){
                                                return parseInt(d.integracion);
                                    }else{
                                        return parseInt(d.proceso);
                                    }
                                                                                       })])
	                        .range([height,0]);        
                        
	      
           var seleccion = seccion + " svg";
           //console.log(seleccion);
	   //var svg = d3.select("#barChart svg");
	      var svg = d3.select(seleccion);
              
	   var plot = d3.select("#barChartPlot" + "_" + sub)
	   	.datum(currentDatasetBarChart)
		   ;
	
	  		/* Note that here we only have to select the elements - no more appending! */
                        //console.log(("Aca voy!!!"));
                        //console.log(sub);
	  	plot.selectAll("."+sub)
	      .data(currentDatasetBarChart)
	      .transition()
			.duration(750)
			.attr("x", function(d, i) {
			    return xScale(i);
			})
		   .attr("width", width / currentDatasetBarChart.length - barPadding)   
		   .attr("y", function(d) {
                                           if(sub === "integracion"){
			                      return yScale(d.integracion);
                                  }else {
                                      return yScale(d.proceso);
                                  }
			                  })  
		    .attr("height", function(d) {
                        if(sub === "integracion"){
			                      return height-yScale(d.integracion);
                                  }else {
                                      return height-yScale(d.proceso);
                                  }
                                  
			                        })
			.attr("fill", colorChosen)
			;
		
		plot.selectAll("text.yAxis") // target the text element(s) which has a yAxis class defined
			.data(currentDatasetBarChart)
			.transition()
			.duration(750)
		   .attr("text-anchor", "middle")
		   .attr("x", function(d, i) {
		   		return (i * (width / currentDatasetBarChart.length)) + ((width / currentDatasetBarChart.length - barPadding) / 2);
		   })
		   .attr("y", function(d) {
                                if(sub==="integracion"){
		   		return (parseInt(yScale(d.integracion)) + parseInt(14));
                    }else{
                        return (parseInt(yScale(d.proceso)) + parseInt(14));
                    }
		   })
		   .text(function(d) {
                       if(sub==="integracion"){
				return formatAsInteger(d3.round(d.integracion));
                    }else{
                        return formatAsInteger(d3.round(d.proceso));
                    }
		   })
		   .attr("class", "yAxis")					 
		;
		

		svg.selectAll("text.title") // target the text element(s) which has a title class defined
                        .data(currentDatasetBarChart)
			.attr("x", (width + margin.left + margin.right)/2)
			.attr("y", 15)
			.attr("class","title")				
			.attr("text-anchor", "middle")
			.text( function(d){
                            
                            if(d.group==="WAVES" || d.group==="DOORS" 
                            || d.group==="DISPO" || d.group==="LPN"
                            || d.group==="LOCN"){
                                if(sub === "integracion"){
                                  return titulo + " No Aplica"
                                }else{
                                    return (titulo + " " + group);
                                }
                            }else{
                                return (titulo + " " + group);
                            }
                        }
                        )
                        
		;
                
                var labels = svg.select("g.ejex").selectAll(".xAxis");
                        
                labels.data(currentDatasetBarChart)
                        .text(function(d){ return d.category;})
                
                //oculto lo que no requiere integracion: OPCIONAL
               
                
            });
            //d3.selectAll("#barChartPlot_integracion").attr("visibility", "hidden");
            //d3.selectAll("#barChartPlot_proceso").attr("visibility", "hidden");
            }