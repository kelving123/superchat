import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { createUserWithEmailAndPassword } from "firebase/compat/auth";

export default function ProfileId() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log("User created successfully");
      // Redirect or perform any other action upon successful user creation
    } catch (error) {
      console.error("Error creating user:", error);
      // Show an error message or perform any other action on failed user creation
    }
  };

  const handlePassword = (e) => {
    e.preventDefault();
    console.log(password);
    setPassword("");
  };

  return (
    <div className="profile">
      <form className="user" onSubmit={handleSignUp}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
