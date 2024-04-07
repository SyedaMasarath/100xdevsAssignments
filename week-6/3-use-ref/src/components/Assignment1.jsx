import { useEffect, useRef } from "react";

// Create a component with a text input field and a button. 
// When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
    const inputBoxRef = useRef(); 

    //refer an element without IDs and document dom syntax
    useEffect(() => {
        inputBoxRef.current.focus;
    }, []);

    const handleButtonClick = () => {
        inputBoxRef.current.focus;
    };

    return (
        <div>
            <input ref={inputBoxRef} type="text" placeholder="Enter text here" />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};
