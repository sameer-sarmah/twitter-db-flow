import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { DataModel } from "./process-flow/models/DataModel";
import { MessageFlowComponent } from "./process-flow/message-flow";
import "./style.css";


const dataModel=new DataModel();
ReactDOM.render(
  <Provider DataModel={dataModel}>
    <React.Fragment>
      <MessageFlowComponent />
    </React.Fragment>
  </Provider>,
  document.querySelector("#root")
);

