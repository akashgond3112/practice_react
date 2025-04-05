// Form.js
import React, { useRef } from "react";
import ValidatedInput from "./ValidatedInput";

function Form() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.validate()) {
      console.log("Form submitted with:", inputRef.current.getValue());
      inputRef.current.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ValidatedInput
        ref={inputRef}
        placeholder="Enter at least 3 characters"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
