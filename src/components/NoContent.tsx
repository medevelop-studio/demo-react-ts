import React from "react";
import { INocontent } from "../interfaces/ICommon";

const NoContent: React.FC<INocontent> = (props) => {
  return (
    <div className="no-content">
      <span>{props.translate("No content")} :( <span role="img" aria-label="Thinking Face">🤔</span></span>
    </div>
  );
};

export default React.memo(NoContent);
