export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/spider_graph_vis/spider_graph_vis'
      ]
    }
})
};

  
  