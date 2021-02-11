import React, { useState } from "react";

const Project1: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    return (
        <div style={{padding: '15px', textAlign:'center'}}>
            <input readOnly value={count} />
            <button onClick={() => setCount(count + 1)} >Count</button>
        </div>
    );
}
export default Project1;