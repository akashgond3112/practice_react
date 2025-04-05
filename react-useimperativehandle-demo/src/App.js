import React, { useRef } from "react";
import "./App.css";

// Import the ValidatedInput component
// Note: In a real project, this would typically be in a separate file
import { ValidatedInput } from "./components/ValidatedInput";

function App() {
  // Create a ref to access the ValidatedInput methods
  const inputRef = useRef(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Access the validate method exposed by the child component
    if (inputRef.current.validate()) {
      // If valid, get the current value using the exposed method
      console.log("Form submitted with:", inputRef.current.getValue());

      // Reset the input using the exposed method
      inputRef.current.reset();

      // Show success message to the user
      alert("Form submitted successfully!");
    } else {
      // Focus the input if validation fails
      inputRef.current.focus();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>useImperativeHandle Demo</h1>
        <p>
          This example demonstrates how to expose a child component's
          functionality to a parent component using the useImperativeHandle
          hook.
        </p>

        {/* Form using the ValidatedInput component */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="validated-input">
                Enter at least 3 characters:
              </label>
              <ValidatedInput
                ref={inputRef}
                id="validated-input"
                placeholder="Type something..."
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>

        <div className="instructions">
          <h2>Try these actions:</h2>
          <ol>
            <li>Submit with less than 3 characters to see validation error</li>
            <li>Enter valid text and submit to see success message</li>
            <li>Check the console to see the submitted value</li>
          </ol>
        </div>
      </header>
    </div>
  );
}

export default App;
