import React from "react";

import { Resizable } from "re-resizable";

function Home() {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Resizable
          defaultSize={{
            width: 320,
            height: 200,
          }}
          //   size={"50%"}
          style={{ border: "1px solid black", margin: 5 }}
        >
          Sample with default size
        </Resizable>
        <Resizable
          defaultSize={{
            width: 320,
            height: 200,
          }}
          style={{ border: "1px solid black", margin: 5 }}
        >
          Sample with default size
        </Resizable>
      </div>
      <div style={{ display: "flex" }}>
        <Resizable
          defaultSize={{
            width: 320,
            height: 200,
          }}
          style={{ border: "1px solid black", marginTop: 5 }}
        >
          Sample with default size
        </Resizable>
      </div>
    </div>
  );
}

export default Home;
