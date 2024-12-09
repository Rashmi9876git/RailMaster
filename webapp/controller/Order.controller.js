sap.ui.define(['com/rg/qm/rm/controller/BaseController',
               'sap/ui/core/routing/History'
],
     function(BaseController,History){
        return BaseController.extend("com.rg.qm.rm.controller",{

            onInit: function(){
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("DetailsPage").attachMatched(this.harculas, this);
            },

            harculas: function(oEvent){
                debugger;
            var oSpath = oEvent.getParameter("arguments").oPath;
            var oIndex = "/" + oSpath;
            this.getView().bindElement(oIndex , {
                expand : 'To_Order'
            })
            },

            onPressBack: function(){
                
                const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				
				this.oRouter.navTo("StartPage", {}, true);
            }

            },

        });

});