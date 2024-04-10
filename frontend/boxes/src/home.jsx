import React, { useEffect, useState } from "react";

import { Resizable } from "re-resizable";

function Home() {
  const [allData, setAllData] = useState();

  const [processedData, setProcessedData] = useState({});

  const [boxNo, setBoxNo] = useState(1);

  const [textData, setTextData] = useState();

  const getAllData = () => {
    fetch("https://data-neuron-assignment-backend.vercel.app/getAllData")
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
    fetch("https://data-neuron-assignment-backend.vercel.app/add", {
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
    fetch(`https://data-neuron-assignment-backend.vercel.app/update/${id}`, {
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
        {allData?.logData.map((each, index) => {
          return (
            <p key={index}>
              {each._id} api has been called : {each?.count}
            </p>
          );
        })}
      </div>
      <div>
        <label>box no : </label>{" "}
        <select onChange={(e) => setBoxNo(e.target.value)} name="box num">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
        {/* <input
          onChange={(e) => {
            if (typeof e.target.value === "number") {
              setBoxNo(e.target.value);
            }
          }}
          type="number"
          max={3}
          min={1}
          defaultValue={1}
        /> */}
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
