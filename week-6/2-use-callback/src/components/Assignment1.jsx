import { useState, useCallback,memo } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
    const [count, setCount] = useState(0);

    // Your code starts here
    const handleIncrement = useCallback(()=> {
        //count no longer needs to be a dependency
        setCount(function(currentCount){
            return currentCount+1;
        })
    },[])

    //if you are using state var in function you have to make it dependency
    const handleDecrement= useCallback(()=> {
        setCount(function(currentCount){
            return currentCount-1;
        })
    },[])
    // Your code ends here

    return (
        <div>
            <p>Count: {count}</p>
            <CounterButtons onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </div>
    );
};

//wrap counter with memo, buttons dont need to render each time the count para re renders
const CounterButtons = memo(({ onIncrement, onDecrement }) => (
    <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
    </div>
));
