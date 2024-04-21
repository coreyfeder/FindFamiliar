import { useState } from "react";
import "./nameLabel.css";

export default function NameLabel(props) {
  const [name, setName] = useState("John")
  return (
    <div className="NameLabel">
      <p>{name}</p>
      <button
        onClick={() => {
          setName("Jane");
        }}
      >
        Change
      </button>
    </div>
  );
}
