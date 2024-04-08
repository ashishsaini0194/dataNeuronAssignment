import React, { useEffect, useState } from "react";

import { Resizable } from "re-resizable";

function Home() {
  const [allData, setAllData] = useState();

  const [boxNo, setBoxNo] = useState(1);

  const [textData, setTextData] = useState();

  const getAllData = () => {
    fetch("http://localhost:3002/getAllData")
      .then(async (data) => setAllData(await data.json()))
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  console.log({ allData });

  const sendData = () => {
    console.log(textData, boxNo);
    fetch("http://localhost:3002/add", {
      method: "post",
      body: JSON.stringify({ text: textData, boxNum: boxNo }),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => getAllData())
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <div>
      <div>
        <label>box no : </label>{" "}
        <input
          onChange={(e) => {
            setBoxNo(e.target.value);
          }}
          type="number"
          defaultValue={1}
        />
        <label>text : </label>
        <input
          onChange={(e) => {
            setTextData(e.target.value);
          }}
          type="text"
        />
        <button onClick={sendData}>send Data</button>
      </div>
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
