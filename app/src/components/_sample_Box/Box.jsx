import "./box.css";

import NameLabel from "../NameLabel/NameLabel";

export default function Box() {
  return (
    <div className="Box">
      <NameLabel name="Alice" />
      <NameLabel name="Bob" />
      <NameLabel name="Cathy" />
      <NameLabel name="Daniel" />
    </div>
  );
}
