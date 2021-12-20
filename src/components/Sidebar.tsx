import React from "react";

import Links from "./Links";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <Links />
    </div>
  );
};

export default React.memo(Sidebar);
