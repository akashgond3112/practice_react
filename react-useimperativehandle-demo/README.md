# React useImperativeHandle Demo

This project demonstrates the power of React's `useImperativeHandle` hook for exposing child component functionality to parent components.

## What is useImperativeHandle?

The `useImperativeHandle` hook allows a child component to selectively expose certain functions or values to a parent component when using `ref`. This creates a clean interface between components while maintaining proper encapsulation.

## Project Overview

This demo showcases a reusable form input component with built-in validation that exposes validation methods to its parent component.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/react-useimperativehandle-demo.git
   cd react-useimperativehandle-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## How It Works

The project contains two main components:

1. `ValidatedInput`: A custom input component that:
   - Handles its own state for the input value
   - Manages validation internally
   - Exposes specific methods to the parent via `useImperativeHandle`

2. `Form`: A parent component that:
   - Uses `ref` to interact with the child component
   - Calls the exposed methods when needed

## Code Example

```jsx
// ValidatedInput.js
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const ValidatedInput = forwardRef((props, ref) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    validate: () => {
      const valid = value.length >= 3;
      setIsValid(valid);
      return valid;
    },
    focus: () => {
      inputRef.current.focus();
    },
    getValue: () => value,
    reset: () => setValue('')
  }));

  return (
    <div>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setIsValid(true);
        }}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
        {...props}
      />
      {!isValid && <div style={{ color: 'red' }}>Input must be at least 3 characters</div>}
    </div>
  );
});

export default ValidatedInput;
```

```jsx
// Form.js
import React, { useRef } from 'react';
import ValidatedInput from './ValidatedInput';

function Form() {
  const inputRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.validate()) {
      console.log('Form submitted with:', inputRef.current.getValue());
      inputRef.current.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ValidatedInput ref={inputRef} placeholder="Enter at least 3 characters" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
```

## Key Benefits

1. **Clean Component Interface**: Only expose what's necessary
2. **Maintainable Code**: Keep component logic encapsulated
3. **Reusability**: Create components that can be used in various contexts
4. **Performance**: Avoid unnecessary re-renders from prop changes

## When to Use

`useImperativeHandle` is particularly useful when:

- You need to trigger actions in a child component from a parent
- You want to access values from a child component without prop drilling
- You're building reusable component libraries
- You need to integrate with third-party libraries that use imperative code

## Further Reading

- [React Documentation on useImperativeHandle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)
- [React Documentation on forwardRef](https://reactjs.org/docs/react-api.html#reactforwardref)