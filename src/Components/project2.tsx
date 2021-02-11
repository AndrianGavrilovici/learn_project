import React, { useEffect, useMemo, useState } from "react";

const Project2: React.FC = () => {
    const [celsius, setCelsius] = useState<number>(0);
    const [fahrenheit, setFahrenheit] = useState<number>(32);
    const [colored, setColored] = useState<boolean>(false);


    const styled = useMemo (() => ({
        background: colored ? 'white' : 'red',
        color: colored ? 'black' : 'white'
    }), [colored]);

    const toFahrenheit = (event: any) => {
        setCelsius(event.target.value);
        if (Number(event.target.value)) {
            setFahrenheit((event.target.value * 9/5) + 32);
            setColored(true);
        }
        else if (String(event.target.value)){
            setColored(false);
        }
    };
    const toCelsius = (event: any) => {
        setFahrenheit(event.target.value);
        if (Number(event.target.value)) {
            setCelsius((event.target.value - 32) * 5/9);
            setColored(true);
        }
        else if(String(event.target.value)) {
            setColored(false);
        }
    };
    

    return (
        <div style={{ padding: "15px", textAlign: "center" }}>
            <input style={styled}
                name="celsius" 
                value={celsius} 
                onChange={toFahrenheit} />{" "}
            Celsius =
            <input
                name="fahrenheit"
                value={fahrenheit}
                onChange={toCelsius}
            />{" "}
            Fahrenheit
        </div>
    );
};
export default Project2;
