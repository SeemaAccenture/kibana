import Highcharts from 'highcharts';
require('highcharts/highcharts-more.js')(Highcharts);
import _ from 'lodash';
import $ from 'jquery';

class VisController {
  constructor(el, vis) {
    this.vis = vis;
    this.el = el;
	
    this.container = document.createElement('div');
    this.container.id = 'containerDiv';
	this.container.width = '700px';
	this.container.height = '400px';
	this.container.setAttribute('style', `background-color: ${this.vis.params.backgroundColor}`);
    this.el.appendChild(this.container);
	
  }
  
   destroy() {
     this.el.innerHTML = '';
   } 
  
	//async
	render(visData, status) {
    this.container.innerHTML = '';
	const table = visData.tables[0];
	const metrics = {};
	let chart;
	let bucketAgg;
	
	let column, m, row, title;
	let categories = [];
	let series = [];
	let main_cat = [];
	
	if(table.columns.length > 1){
		
		for (m = 0; m < table.columns.length-1; m++) {					
			main_cat.push(table.columns[m]['title']);
		}				
		
		for (m = 0; m < table.rows.length; m++) {				
			categories.push(table.rows[m][0]);
			series.push(table.rows[m][1]);
			
		}			
	}
	if(categories.length > 1 && series.length > 1){
		title = main_cat[0] + " vs Count";
		
	}else{	  
		title = 'Spider Web Chart Title';
		categories = ['TestA', 'TestB'];
		series = ['200', '450'];
	}	
	
	
	const metricDiv = document.createElement('div');
	metricDiv.id = 'containerDiv';
	metricDiv.width = '700px';
	metricDiv.height = '400px';	
	this.container.appendChild(metricDiv);		
		
	chart = new Highcharts.Chart({
			
		chart: {
			renderTo: 'containerDiv',
			polar: true,
			type: 'line',
			backgroundColor: `${this.vis.params.backgroundColor}`
		},
		
		title: {
			text: title,
			x: -80
		},
		
		pane: {
			size: '80%'
		},
		
		xAxis: {
			categories:	categories,	
			tickmarkPlacement: 'on',
			lineWidth: 0
		},
			
		yAxis: {
			gridLineInterpolation: 'polygon',
			lineWidth: 0,
			min: 0
		},
		
		tooltip: {
			shared: true,
			valuePrefix: ''
		},
		
		legend: {
			align: 'right',
			verticalAlign: 'top',
			y: 100,
			layout: 'vertical'
		},
		
		series: [{
			name: main_cat[1],
			data: series,
			pointPlacement: 'on'
		}]

	});
	
    return new Promise(resolve => {
      resolve('when done rendering');
    });
  }  
};
export { VisController };
 