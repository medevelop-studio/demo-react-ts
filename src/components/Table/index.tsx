import React from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import { withTranslate } from "react-redux-multilingual";

import { theadTemplate, tbodyTemplate } from "./templates";
import { IProfile } from "../../interfaces/IProfile";

interface ITable {
  style: object,
  tableData: {
    _styles: object[],
    _template: string,
    head: object[]
    body: object[]
  },
  tbodyHeight: string,
  additionalData: IProfile,
  searchedId?: number;
  externalDataObj?: object;
  handlers: any,
  translate: (text: string) => string
}

const Table: React.FC<ITable> = props => {

  return (
    <CSSTransition in={!!props.tableData.body.length} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
      <div
        style={props.style}
        className={cn("table", {
          "tbody-height": props.tbodyHeight
        })}
      >
        <table
          style={props.style}
        >
          <thead>
            {theadTemplate({
              ...props.tableData,
              additionalData: props.additionalData || {},
              translate: props.translate
            })}
          </thead>
          <tbody>
            {tbodyTemplate({
              ...props.tableData,
              handlers: props.handlers || {},
              additionalData: props.additionalData || {},
              searchedId: props.searchedId ? props.searchedId : undefined,
              externalDataObj: props.externalDataObj ? props.externalDataObj : undefined,
              translate: props.translate
            })}
          </tbody>
        </table>
      </div>
    </CSSTransition>
  );
};

export default withTranslate(Table);
