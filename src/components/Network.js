import { useState } from "react";

function Network() {
  const [network, setNetwork] = useState();
  const handleSubmit = async () => {
    await fetch("http://localhost:8888/network/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(network),
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
      <h1 style={mystyle}>Network!</h1>
      <div style={row}>
        <label style={label}>Name: </label>
        <input
          style={text}
          type="text"
          onChange={(e) =>
            setNetwork({ ...network, name: e.target.value })
          }></input>
      </div>
      <div style={row}>
        <label style={label}>Address: </label>
        <input
          style={text}
          type="text"
          onChange={(e) =>
            setNetwork({ ...network, url: e.target.value })
          }></input>
      </div>
      <div style={row}>
        <label style={label}>Token: </label>
        <input
          style={text}
          type="text"
          onChange={(e) =>
            setNetwork({ ...network, token: e.target.value })
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

export default Network;

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
  width: "70%",
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
