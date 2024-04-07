import React, { useState, useCallback } from 'react';
import { useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. 
// Use useRef to create a variable that persists across renders without causing additional renders when it changes.

//can use a global variable : never use global var, outside react comp
export function Assignment2() {
    //useref used when you want to have access to a variable acrooss renders which is not a state variable
    const [, forceRender] = useState(0);

    //can be used to store any value string, part of react lifecylce
    const numberOfRerenders = useRef(0);
    const handleReRender = () => {
        // Update state to force re-render
        forceRender(Math.random());
    };
    numberOfRerenders.current = numberOfRerenders.current + 1;

    return (
        <div>
            <p>This component has rendered {numberOfRerenders} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};