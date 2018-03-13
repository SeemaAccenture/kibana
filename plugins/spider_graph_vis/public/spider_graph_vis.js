import optionsTemplate from './options_template.html';
import { VisController } from './graph_vis_controller';
import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';

function SpiderGraphVisProvider(Private) {
   const VisFactory = Private(VisFactoryProvider);
   const Schemas = Private(VisSchemasProvider);
   
     return  VisFactory.createBaseVisualization({
        name: 'spider_graph_vis',
		title: 'Spider Web Vis',
		icon: 'fa fa-gear',
		description: 'Spider Web Visualization',
		category: CATEGORY.OTHER,
		visualization: VisController,
		visConfig: {
		  defaults: {
			// add default parameters
			backgroundColor: '#e7e7e7'
		  },
		},
		editorConfig: {
		  optionsTemplate: optionsTemplate,
		  schemas: new Schemas([
			{
			  group: 'metrics',
			  name: 'metric',
			  title: 'Metric',
			  min: 1,
			  aggFilter: ['!derivative', '!geo_centroid'],
			  defaults: [
				{ type: 'count', schema: 'metric' }
			  ]
			}, {
			  group: 'buckets',
			  name: 'segment',
			  title: 'Bucket Split',
			  min: 0,
			  max: 1,
			  aggFilter: ['!geohash_grid', '!filter']
			}
		  ]),
		},
		responseHandler: 'tabify'
	})
}
VisTypesRegistryProvider.register(SpiderGraphVisProvider);

 