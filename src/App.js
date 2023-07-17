import React, { useRef, useState } from "react";

import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import MyImage from "./images/headshot.jpg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { async } from "@firebase/util";
import ProfileId from "./components/ProfileId";

firebase.initializeApp({
  apiKey: "AIzaSyBDD5-pTsPU0XOMamR48GEqDaaQ4KoVmsg",
  authDomain: "super-chat-a2a37.firebaseapp.com",
  projectId: "super-chat-a2a37",
  storageBucket: "super-chat-a2a37.appspot.com",
  messagingSenderId: "102292896548",
  appId: "1:102292896548:web:beb105f19eeec6423691b1",
  measurementId: "G-KB7HJ7P4D8",
});

const firestore = firebase.firestore();
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬 SuperChat!</h1>

        <SignOut />
      </header>

      <section>{user ? <ChatRoom user={user} /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <h1>Welcome to SuperChat!</h1>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p className="community">
        Thank you for checking out super chat. New features will be available
        soon!
      </p>
      <ProfileId />
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom({ user }) {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(400);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = user;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      email: user.email,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} email={user.email} />
          ))}

        <span ref={dummy}></span>
      </main>

      <form className="messages" onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

function ChatMessage({ message, email }) {
  const { text, uid, photoURL } = message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <h1>{email}</h1>
      <img src={photoURL || MyImage} alt="Profile" />
      <p>{text}</p>
    </div>
  );
}

export default App;
