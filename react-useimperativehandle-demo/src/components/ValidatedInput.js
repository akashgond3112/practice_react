import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

// ValidatedInput component using forwardRef to accept a ref from parent
export const ValidatedInput = forwardRef((props, ref) => {
  // State for the input value
  const [value, setValue] = useState("");

  // State for tracking validation status
  const [isValid, setIsValid] = useState(true);

  // Ref to access the DOM input element directly
  const inputRef = useRef(null);

  // Expose specific methods to the parent component
  useImperativeHandle(ref, () => ({
    // Method to validate the input
    validate: () => {
      // Our validation rule: input must be at least 3 characters
      const valid = value.length >= 3;

      // Update the validation state
      setIsValid(valid);

      // Return validation result to parent
      return valid;
    },

    // Method to programmatically focus the input
    focus: () => {
      inputRef.current.focus();
    },

    // Method to get the current input value
    getValue: () => value,

    // Method to reset the input
    reset: () => setValue(""),
  }));

  return (
    <div className="validated-input-container">
      <input
        // Connect our inputRef to the DOM element
        ref={inputRef}
        // Controlled component pattern
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          // Reset validation state on change
          setIsValid(true);
        }}
        // Apply styling based on validation state
        style={{
          borderColor: isValid ? "#ccc" : "red",
          padding: "8px",
          borderWidth: "2px",
          borderStyle: "solid",
          borderRadius: "4px",
        }}
        // Spread any additional props passed to the component
        {...props}
      />

      {/* Show validation message when input is invalid */}
      {!isValid && (
        <div style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>
          Input must be at least 3 characters
        </div>
      )}
    </div>
  );
});
