sap.ui.define(['sap/ui/core/UIComponent'],
    function(UIComponent){
    return UIComponent.extend("com.rg.qm.rm.Component",{

    metadata: {
        manifest: "json"
    },

    init: function(){
        UIComponent.prototype.init.apply(this);
        this.getRouter().initialize();
    },

    // createContent:  function(){

    //     var rootView = new sap.ui.view("idRootView",{
    //         viewName: "com.rg.qm.rm.view.App",
    //         type: "XML"
    //     });

    //     var startView = new sap.ui.view("idStart",{
    //         viewName: "com.rg.qm.rm.view.Start",
    //         type: "XML"
    //     })
    //     rootView.byId("idAppCon").addPage(startView);
    //     return rootView;
    // },
    destroy: function(){}
    });
});