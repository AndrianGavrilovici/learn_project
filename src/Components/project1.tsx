import React, { useState } from "react";

const Project1: React.FC = () => {
    const [count, setCount] = useState(0);

    const incrementCounter = () => setCount(prevState => prevState + 1);

    return (
        <div style={{ padding: '15px', textAlign: 'center' }}>
            <input readOnly value={count} />
            <button onClick={incrementCounter} >Count</button>
        </div>
    );
}
export default Project1;