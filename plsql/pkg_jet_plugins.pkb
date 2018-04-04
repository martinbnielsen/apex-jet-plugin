create or replace PACKAGE BODY pkg_jet_plugins AS

  g_current_region     apex_plugin.t_region;

  -- Set the current region context

  PROCEDURE setregioncontext (
    p_region IN apex_plugin.t_region
  )
    IS
  BEGIN
    g_current_region := p_region;
  END;
    
    -- Plugin render function

  FUNCTION render (
    p_region                IN apex_plugin.t_region,
    p_plugin                IN apex_plugin.t_plugin,
    p_is_printer_friendly   IN BOOLEAN
  ) RETURN apex_plugin.t_region_render_result IS

    c_region_static_id   CONSTANT VARCHAR2(255) := apex_escape.html_attribute(p_region.static_id);
    v_path               VARCHAR2(1000) := p_plugin.attribute_01;
    v_version            VARCHAR2(100) := p_plugin.attribute_02;
    v_jet_comp           VARCHAR2(100) := p_region.attribute_02;
    v_height             VARCHAR2(100) := p_region.attribute_03;
    v_max_width          VARCHAR2(100) := p_region.attribute_04;
    v_maximize           VARCHAR2(100) := p_region.attribute_05;
    v_js_options         VARCHAR2(2000) := nvl(p_region.attribute_06,'{}');
    v_init_js            VARCHAR2(2000);
    g_default_height     CONSTANT VARCHAR2(100) := '300px';
    g_js_path            CONSTANT VARCHAR2(300) := p_plugin.file_prefix || 'js/';
    g_css_path           CONSTANT VARCHAR2(300) := p_plugin.file_prefix || 'css/';
  BEGIN
    ------------
    -- Debugging
    ------------
    apex_plugin_util.debug_region(p_plugin,p_region);

    ---------------------
    -- Load static files
    ---------------------
    
    apex_css.add_file(p_name => 'oj-alta-notag-min',p_directory => v_path || 'css/libs/oj/v' || v_version || '/alta/');
    --apex_css.add_file(p_name => 'apex-jet-plugin', p_directory => g_css_path);
           
    ----------------------
    -- Add placeholder div
    ----------------------
    sys.htp.p('<div class="a-generic-jet" id="' || c_region_static_id || 
      '_visual" style="min-width: 100px; float:left; width:100%; max-width:' || 
      nvl(v_max_width,'100%') || '; height:' || nvl(v_height,g_default_height) || '; max-height:100%"></div>');

    -- Add Inline CSS for the maximize region
    IF
      v_maximize = 'Y'
    THEN
      apex_css.add('.is-maximized #' || c_region_static_id || '_visual {height: 80vh!important;}');
    END IF;
      
    -----------------------
    -- Initialize the chart
    -----------------------

    v_init_js := 'jet.' || v_jet_comp || '.init(' || '"#' || c_region_static_id || '_visual", ' || -- pRegionId
      '"' || apex_plugin_util.page_item_names_to_jquery(p_region.ajax_items_to_submit) || '", ' || '"' || apex_plugin.get_ajax_identifier || 
      '",' || -- pApexAjaxIdentifier
      v_js_options || ')';
                     
    apex_javascript.add_onload_code(p_code => v_init_js);

    ---------------------------------      
    -- Add support for region refresh
    ---------------------------------      
    apex_javascript.add_onload_code('apex.jQuery("#' || c_region_static_id || '").bind("apexrefresh", function(){' || v_init_js || '});');

    RETURN NULL;
  END render;

    -- Plugin AJAX function

  FUNCTION ajax (
    p_region   IN apex_plugin.t_region,
    p_plugin   IN apex_plugin.t_plugin
  ) RETURN apex_plugin.t_region_ajax_result IS
    c              SYS_REFCURSOR;
    l_plsql_code   VARCHAR2(32767) := p_region.attribute_01;
  BEGIN
    apex_debug.message('Callback = ' || l_plsql_code);
    
        -- Set current region context
    pkg_jet_plugins.setregioncontext(p_region);
    apex_plugin_util.execute_plsql_code(p_plsql_code => l_plsql_code);
    RETURN NULL;
  END ajax;

  PROCEDURE pictochartexample (
    p_user IN VARCHAR2
  ) IS
    c         SYS_REFCURSOR;
    l_query   VARCHAR2(32767);
  BEGIN
    apex_debug.message('pictochartExample - called - input ' || p_user);
    l_query := g_current_region.source;
    OPEN c FOR l_query;

    apex_json.open_object;
    apex_json.write('items',c);
  
    -- add settings
    apex_json.write('animationOnDisplay','auto');
    apex_json.write('columnCount',3);
    apex_json.write('layout','');
    apex_json.close_object;
  END;

  PROCEDURE chartexample (
    p_type IN VARCHAR2
  ) IS
    c         SYS_REFCURSOR;
    l_query   VARCHAR2(32767);
  BEGIN
    --dbms_lock.sleep(3);
    apex_debug.message('ChartExample - called - type ' || p_type);
    l_query := g_current_region.source;
    --open c for l_query;
    --apex_json.open_object;
    --apex_json.write('items', c);
    htp.prn('{
  "series": [{"name": "Series 1", "items": [42]},
             {"name": "Series 2", "items": [55]},
             {"name": "Series 3", "items": [36]},
             {"name": "Series 4", "items": [22]},
             {"name": "Series 5", "items": [22]}],
  "groups": ["Group A"],
  "type": "'
|| nvl(p_type,'bar') || '",
  "hideAndShowBehavior": "on",
"pieCenter": {
          "label": "This is the center",
          "labelStyle": "font-size:20px;color:#999999;background-color:white;",
          "pieInnerRadius": 0.5
        }
}'
);
  
    -- add settings
    --apex_json.write('type' , 'bar');
    --apex_json.close_object;
  END;

  PROCEDURE diagramexample
    IS
  BEGIN
    htp.prn('{
  	"nodes": [{
			"id": "N0",
			"label": "Node 789",
			"icon": {
				"color": "#fdffcc",
				"width": 10,
				"height": 10
			}
		},
		{
			"id": "N1",
			"label": "Node 1",
			"icon": {
				"color": "#2190e5",
				"width": 20,
				"height": 20
			}
		},
		{
			"id": "N2",
			"label": "Node 2",
			"icon": {
				"color": "#5ea7d9",
				"width": 30,
				"height": 30
			}
		}
	],
	"links": [{
			"id": "L0",
			"startNode": "N0",
			"endNode": "N1"
		},
		{
			"id": "L1",
			"startNode": "N1",
			"endNode": "N2"
		},
		{
			"id": "L2",
			"startNode": "N2",
			"endNode": "N0"
		}
	]
}'
);
  END;

  PROCEDURE ganttexample
    IS
  BEGIN
    htp.prn('{"rows":
     [
  {
    "id": "r1",
    "tasks": [
      {
        "id":"task1",
        "start": "2016-01-04T00:00:00.000Z",
        "end": "2016-01-10T00:00:00.000Z",
        "label":"Label 1",
        "labelPosition": "end"
      }
    ]
  },
  {
    "id": "r2",
    "tasks": [
      {
        "id":"task2",
        "start": "2016-01-10T00:00:00.000Z",
        "end": "2016-01-24T00:00:00.000Z",
        "label":"Label 2",
        "labelPosition": "innerCenter"
      }
    ]
  },
  {
    "id": "r3",
    "tasks": [
      {
        "id":"task3",
        "start": "2016-01-25T00:00:00.000Z",
        "end": "2016-02-05T00:00:00.000Z",
        "label":"Label 3",
        "labelPosition": "innerStart"
      }
    ]
  }]}'
);
  END;

  PROCEDURE dialgaugeexample
    IS
  BEGIN
    apex_json.open_object;
    apex_json.write('value',50);
    apex_json.close_object;
  END;

END pkg_jet_plugins;