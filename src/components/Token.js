import { useState, useEffect } from "react";
import Select from "react-select";

function Token() {
  const [token, setToken] = useState();
  const options = [];

  useEffect(async () => {
    await fetch("http://localhost:8888/network")
      .then((res) => res.json())
      .then((result) => {
        result.forEach((item) =>
          options.push({ value: item._id, label: item.name })
        );
      })
      .catch((error) => console.log(error));
  }, [options]);

  const handleSubmit = async () => {
    await fetch("http://localhost:8888/token/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Success:" + data.toString());
      })
      .catch((error) => {
        alert("Error:" + error.toString());
      });
  };

  return (
    <div style={container}>
      <h1 style={mystyle}>Token!</h1>
      <div style={row}>
        <label style={label}>Chain: </label>
        <div style={select_div}>
          <Select
            options={options}
            onChange={(e) => setToken({ ...token, chain_id: e.value })}
          />
        </div>
      </div>
      <div style={row}>
        <label style={label}>Name: </label>
        <input
          style={text}
          type="text"
          onChange={(e) =>
            setToken({ ...token, name: e.target.value })
          }></input>
      </div>
      <div>
        <label style={label}>Address: </label>
        <input
          style={text}
          type="text"
          onChange={(e) =>
            setToken({ ...token, address: e.target.value })
          }></input>
      </div>
      <div style={verticalCenter}>
        <button style={button} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Token;

const container = {
  width: "500px",
  margin: "auto",
};

const row = {
  alignItems: "center",
  justifyContent: "center",
  height: "40px",
  marginBottom: "15px",
};

const mystyle = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
};

const label = {
  margin: "10px",
  fontSize: "20px",
  width: "20%",
  height: "25px",
  display: "inline-block",
  color: "gray",
};

const text = {
  height: "25px",
  width: "360px",
  border: "2px solid gray",
  borderRadius: "5px",
};

const verticalCenter = {
  display: "flex",
  justifyContent: "center",
};

const button = {
  height: "35px",
  width: "80px",
  marginTop: "25px",
  border: "2px solid lightgreen",
  borderRadius: "5px",
  backgroundColor: "lightgreen",
  color: "white",
  cursor: "pointer",
};

const select_div = {
  width: "370px",
  display: "inline-block",
};
