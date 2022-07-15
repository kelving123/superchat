import React from "react";
import { useState } from "react";
export default function ProfileId() {
  const [username, setUserName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    setUserName("");
  };

  return (
    <div className="profile">
      <form className="user" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Your Display Name"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}
