import React, { useState } from "react";

const Project2: React.FC = () => {
    const [celsius, setCelsius] = useState(0);
    const [fahrenheit, setFahrenheit] = useState(32);
    const [errors, setErrors] = useState<boolean[]>([false, false]);


    const styled = (index: number) => ({
        background: errors[index] === false ? 'white' : 'red',
        color: errors[index] === false ? 'black' : 'white'
    });

    const toFahrenheit = (event: any) => {
        setCelsius(event.target.value);
        if (!isNaN(Number(event.target.value))) {
            setFahrenheit((event.target.value * 9 / 5) + 32);
            setErrors(prevState => ([false, false]));
        } else {
            setErrors(prevState => ([true, prevState[1]]));
        }
    };

    const toCelsius = (event: any) => {
        setFahrenheit(event.target.value);
        if (!isNaN(Number(event.target.value))) {
            setCelsius((event.target.value - 32) * 5 / 9);
            setErrors(prevState => ([false, false]));
        } else {
            setErrors(prevState => ([prevState[0], true]));
        }
    };


    return (
        <div style={{ padding: "15px", textAlign: "center" }}>
            <input style={styled(0)}
                name="celsius"
                value={celsius}
                onChange={toFahrenheit} />{" "}
            Celsius =
            <input style={styled(1)}
                name="fahrenheit"
                value={fahrenheit}
                onChange={toCelsius}
            />{" "}
            Fahrenheit
        </div>
    );
};
export default Project2;
