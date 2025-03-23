import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import Weather from "../images/weather.png";
import cloud from "../images/Clouds.png";
import rain from "../images/Rain.png";
import clear from "../images/Clear.png";
import mist from "../images/mist.png";
import haze from "../images/haze.png";
import smoke from "../images/smoke.png";
import foggy from "../images/foggy.png";
import err from "../images/error.png";

const Myapp = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = "56a17927c98d281f369ac11cfea901fe";

    const handleInput = (event) => {
        setSearch(event.target.value);
    };

    const myFun = async () => {
        if (!search.trim()) {
            setError("Please Enter Name");
            setData(null);
            return;
        }

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
            );
            const jsonData = await response.json();

            if (jsonData.cod === "404") {
                setError("Please Enter Valid Name!");
                setData(null);
            } else {
                setData(jsonData);
                setError('');
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Something went wrong. Please try again.");
            setData(null);
        }

        setSearch('');
    };

    const getWeatherImage = (weather) => {
        switch (weather) {
            case "Clouds":
                return cloud;
            case "Rain":
                return rain;
            case "Clear":
                return clear;
            case "Mist":
                return mist;
            case "Haze":
                return haze;
            case "Smoke" :
                return smoke;
            case "Foggy":
                return foggy;
            default:
                return Weather;
        }
    };

    return (
        <div className='container'>
            <div className='inputs'>
                <input
                    placeholder='Enter city'
                    value={search}
                    onChange={handleInput}
                />
                {/* <button onClick={myFun}>
                    <i className="search"></i>
                </button> */}
                <FaSearch
                    onClick={myFun}
                    role="button"
                    aria-label="Search"
                />
            </div>
            <div>
                {error && (
                    <div className='errorPage'>
                        <p>{error}</p>
                        <img src={err} alt="Error" />
                    </div>
                )}
                {
                    !data && (
                        <div className='weathers'>
                            <img
                                src={Weather}
                                alt={"Weather"}
                            />
                        </div>
                    )
                }
                {data && data.weather && (
                    <div className='weathers'>
                        <h2 className='cityName'>{data.name}</h2>
                        {getWeatherImage(data.weather[0].main) && (
                            <img
                                src={getWeatherImage(data.weather[0].main)}
                                alt={data.weather[0].main}
                            />
                        )}
                        <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
                        <p className='climate'>{data.weather[0].description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Myapp;

