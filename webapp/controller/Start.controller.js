sap.ui.define(['com/rg/qm/rm/controller/BaseController',
               'sap/m/MessageBox',
              'sap/m/MessageToast',
              'sap/ui/core/Fragment',
              'sap/ui/model/Filter',
              'sap/ui/model/FilterOperator'
],
    function(BaseController,MessageBox,MessageToast,Fragment,Filter,FilterOperator){
        return BaseController.extend("com.rg.qm.rm.controller.Start",{
             onInit: function(){
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("StartPage").attachMatched(this.prince, this);
             },

             prince: function(){

             },

             onIteamPress: function(oEvent){
                var sPath = oEvent.getParameter("listItem").getBindingContextPath();
                var oIndex = sPath.split("/")[sPath.split("/").length - 1];
                this.oRouter.navTo("DetailsPage",{
                    oPath : oIndex,
                });
             },

            callBack: null,
            onHandelAstCls: function(){
                debugger;
                var that = this;
                if (!this.callBack) {
                    Fragment.load({
                        name: 'com.rg.qm.rm.fragments.popup',
                        id: 'idAstClsh',
                        controller: this
                    }).then(function(oFragment){
                        that.callBack = oFragment;
                        that.getView().addDependent(that.callBack);
                        that.callBack.setTitle("Asset Class");
                        that.callBack.bindAggregation("items",{
                            path: '/ASSETCLASSet',
                            template: new sap.m.ObjectListItem({
                               title: '{ANLKL}',
                               number: '{TXK20}'
                            })
                        });
                        that.callBack.open();
                    });
                } else {

                    if(this.flg === 'X'){
                    this.callBack.bindAggregation("items",{
                        path: '/ASSETCLASSet',
                        template: new sap.m.ObjectListItem({
                           title: '{ANLKL}',
                           number: '{TXK20}'
                        })
                    });
                }
                    
                this.callBack.open();
                }
            },

            onConfirm: function(oEvent){
                var oVal = oEvent.getParameter("selectedItem").getTitle();
                this.getView().byId("idAscls").setValue(oVal);
            },
            
            flg: null,
            onSearch: function(oEvent){
                
             var oSearchValue = oEvent.getParameter("value");
             var sFilter = new Filter("ANLKL", FilterOperator.Contains, oSearchValue);
             var aFilter = [ sFilter ];
             oEvent.getSource().getBinding("items").filter(aFilter);
                this.flg = 'X';
            },

            showDetails: function(){
              debugger;
              var oCompCode = this.getView().byId("idMltCnb").getSelectedKeys();
              var oActCls   = this.getView().byId("idAscls").getValue();
              var aFilter = [];
              var oInd =  this.getView().byId("idMltCnb").getSelectedKeys()[0];

              if (!oInd) {
                MessageBox.error("Company code should not be blank");
                return;
              };

              if (!oActCls) {
                MessageBox.error("Asset Class should not be blank");
                return;
              };

              for (let i = 0; i < oCompCode.length; i++) {
                const element = oCompCode[i];
                 var sFilter = new Filter("BUKRS", FilterOperator.EQ, element);
                 aFilter.push(sFilter);
              };

              var cFilter = new Filter("ANLKL", FilterOperator.EQ, oActCls );
              aFilter.push(cFilter);
              
              this.getView().byId("idTab").getBinding("items").filter(aFilter);

            },

        });      
});