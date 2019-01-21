import { action, observable } from "mobx";

export class DataModel {
  @observable
  twitterMessages=[];
 
  @observable
  processflow;

  @observable
  trafficData;

  @observable
  selectedNode="All";

  @observable
  searchText="";
 
 
  @action
  setMessages(twitterMessages){
    this.twitterMessages=twitterMessages;
  }

  @action
  setTrafficData(trafficData){
    this.trafficData=trafficData;
  }

  @action
  setProcessflow(processflow){
    this.processflow=processflow;
  }


  @action
  setSelectedNode(selectedNode){
    this.selectedNode=selectedNode;
  }

  @action
  setSearchText(searchText){
    this.searchText=searchText;
  }

}


