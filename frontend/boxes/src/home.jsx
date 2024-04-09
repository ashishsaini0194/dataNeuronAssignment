import React, { useEffect, useState } from "react";

import { Resizable } from "re-resizable";

function Home() {
  const [allData, setAllData] = useState();

  const [processedData, setProcessedData] = useState({});

  const [boxNo, setBoxNo] = useState(1);

  const [textData, setTextData] = useState();

  const getAllData = () => {
    fetch("http://localhost:3002/getAllData")
      .then(async (data) => {
        const myData = await data.json();
        setAllData(myData);
        manipulateData(myData);
      })
      .catch((err) => {
        console.log({ err });
        alert(err?.message);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  //   console.log({ allData });

  const sendData = () => {
    console.log(textData, boxNo);
    fetch("http://localhost:3002/add", {
      method: "post",
      body: JSON.stringify({ text: textData, boxNum: boxNo }),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        getAllData();
        // alert(data?.message || "added successfully");
      })
      .catch((err) => {
        console.log({ err });
        alert(err?.message);
      });
  };

  const updateData = (textData, id) => {
    // console.log(textData, id);
    fetch(`http://localhost:3002/update/${id}`, {
      method: "put",
      body: JSON.stringify({ text: textData, boxNum: boxNo }),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => getAllData())
      .catch((err) => {
        console.log({ err });
        alert(err?.message);
      });
  };

  const manipulateData = (data) => {
    const obj = {};
    // console.log(data);
    data?.res?.forEach((each) => {
      //   console.log(each);
      if (obj[each.boxNum]) {
        obj[each.boxNum] = [each, ...obj[each.boxNum]];
      } else {
        obj[each.boxNum] = [each];
      }
    });
    // console.log(obj);
    setProcessedData({ ...obj });
  };
  //   useEffect(() => {
  //     console.log(processedData);
  //   }, [processedData]);

  return (
    <div>
      <div>
        <label>box no : </label>{" "}
        <input
          onChange={(e) => {
            setBoxNo(e.target.value);
          }}
          type="number"
          max={3}
          min={1}
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
            width: "50%",
            height: 400,
          }}
          //   size={"50%"}
          style={{ border: "1px solid black", margin: 5 }}
        >
          <View boxData={processedData[1]} updateData={updateData} />
        </Resizable>
        <Resizable
          defaultSize={{
            width: "50%",
            height: 400,
          }}
          style={{ border: "1px solid black", margin: 5 }}
        >
          <View boxData={processedData[2]} updateData={updateData} />
        </Resizable>
      </div>
      <div style={{ display: "flex" }}>
        <Resizable
          defaultSize={{
            width: "100%",
            height: 400,
          }}
          style={{ border: "1px solid black", marginTop: 5 }}
        >
          <View boxData={processedData[3]} updateData={updateData} />
        </Resizable>
      </div>
    </div>
  );
}

export default Home;

function View({ boxData, updateData }) {
  const [textData1, setTextData1] = useState();
  return (
    <div>
      {!boxData && <p>Please add Data</p>}
      {boxData?.map((each) => {
        return (
          <div key={each?._id}>
            <span>{each?.text}</span>

            <input
              type="text"
              onChange={(e) => {
                setTextData1(e.target.value);
              }}
            />

            <button
              onClick={() => {
                updateData(textData1, each._id);
              }}
            >
              update
            </button>
          </div>
        );
      })}
    </div>
  );
}
