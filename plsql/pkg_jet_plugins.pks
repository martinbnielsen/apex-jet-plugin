create or replace PACKAGE pkg_jet_plugins AS

    FUNCTION render (
        p_region                IN apex_plugin.t_region,
        p_plugin                IN apex_plugin.t_plugin,
        p_is_printer_friendly   IN BOOLEAN
    ) RETURN apex_plugin.t_region_render_result;
    
    FUNCTION ajax (
        p_region   IN apex_plugin.t_region,
        p_plugin   IN apex_plugin.t_plugin
    ) RETURN apex_plugin.t_region_ajax_result;
    
  -- Helper programs

    PROCEDURE setregioncontext (
        p_region IN apex_plugin.t_region
    );

  -- JET COmponent example procedures

    PROCEDURE pictochartexample (
        p_user IN VARCHAR2
    );

    PROCEDURE chartexample (
        p_type IN VARCHAR2
    );

    PROCEDURE diagramexample;

    PROCEDURE ganttexample;

    PROCEDURE dialgaugeexample;

END pkg_jet_plugins;