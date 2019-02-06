//by: Pablo Andres Boada Aragon. creado a partir de modificaciones de codigos usados en la comunidad d3js 
function dsPieChart(){

 d3.csv("../data/HistoricoPorcentual.csv", function(datos) 
    {
      
	var dataset = datos;        
	var 	width = 300,
		   height = 300,
		   outerRadius = Math.min(width, height) / 2,
		   innerRadius = outerRadius * .999,   
		   // for animation
		   innerRadiusFinal = outerRadius * .5,
		   innerRadiusFinal3 = outerRadius* .45,
		   color = d3.scale.category20()    
		   ;
	    
	var vis = d3.select("#pieChart")
	     .append("svg:svg") 
	     .data([dataset])                   
	     .attr("width", width)          
	     .attr("height", height)
             .attr("class", "contenedor_pie")
             //.style("background", "#AED6F1" )
             //.style("stroke", "black")
	     .append("svg:g")
	     .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
        
				
   var arc = d3.svg.arc()
               .outerRadius(outerRadius).innerRadius(innerRadius);
   
   var arcFinal = d3.svg.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);
   var arcFinal3 = d3.svg.arc().innerRadius(innerRadiusFinal3).outerRadius(outerRadius);

   var pie = d3.layout.pie()           
        .value(function(d) { return d.measure; });

   //crear arcos para los nuevos elementos de los datos
        //console.log("creando arcs");
        var arcs = vis.selectAll("g.slice")     
                      .data(pie)                         
                      .enter()                            
                      .append("svg:g")             
                      .attr("class", "slice")
                      .on("mouseover", mouseover)
                      .on("mouseout", mouseout)
                      .on("click", up);
                      ;
        
        var total_casos = 0;          
         datos.forEach(function(d) {
                                    //console.log(d.measure)
                                    total_casos = parseInt(total_casos) + parseInt(d.measure);
                                   });     
        
        //console.log("total_casos" + ' ' + total_casos);
        arcs.append("svg:path")
               .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
               .attr("d", arc)     //this creates the actual SVG path using the associated data (pie) with the arc drawing function
	       .append("svg:title") //mouseover title showing the figures
	       .text(function(d) {  //console.log(d.data.measure);
                                    return d.data.category + ' ' + formatAsPercentage(d.data.measure/total_casos); });			

        d3.selectAll("g.slice").selectAll("path").transition()
			    .duration(750)
			    .delay(10)
			    .attr("d", arcFinal )
			    ;
                            
                  
                            
        // Add a label to the larger arcs, translated to the arc centroid and rotated.
	  // source: http://bl.ocks.org/1305337#index.html
	  arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; })
	  		.append("svg:text")
	      .attr("dy", ".35em")
	      .attr("text-anchor", "middle")
	      .attr("transform", function(d) { return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")"; })
	      //.text(function(d) { return formatAsPercentage(d.value); })
	      .text(function(d) { return d.data.category; })
              .style("font-size", "13px")
	      ;
	   
	   // Computes the label angle of an arc, converting from radians to degrees.
		function angle(d) {
		    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
		    return a > 90 ? a - 180 : a;
		}   
		// Pie chart title			
		vis.append("svg:text")
	     	.attr("dy", ".35em")
	      .attr("text-anchor", "middle")
	      .text("Clic en la categoria")
	      .attr("class","title")
              .style("font-size", "13px")
	      ;	 
              
              function mouseover() {
                  //console.log("mouseover");
	  d3.select(this).select("path").transition()
	      .duration(750)
	        		.attr("d", arcFinal3)
	        		;
	}
	
        function mouseout() {
	 d3.select(this).select("path").transition()
	   .duration(750)
	        		.attr("d", arcFinal)
	        		;
	}
        
        function up(d, i) {
                           //var seccion_integracion1 = "#barChart_integracion";
                           //var titulo = "Integracion";
                           //var sub = "integracion";
                           //var archivo = "../data/CodesResolution.csv";
	                   //updateBarChart(d.data.category, color(i), seccion_integracion1, titulo, sub, archivo);
                           //var seccion_integracion2 = "#barChart_proceso";
                           //var titulo = "Proceso";
                           //var sub = "proceso";
                            
	                   //updateBarChart(d.data.category, color(i), seccion_integracion2, titulo, sub, archivo);                           
			   updateLineChart(d.data.category, color(i));
                           
                           //actualizar causas
                           var archivo = "../data/Causales.csv";
                           update_causas(d.data.category, color(i), archivo);
                           var archivo2 = "../data/Elementos.csv";
                           update_causas_elementos(d.data.category, color(i), archivo2);
                           
			 
	}
          });
          
}

