import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { saveSession } from "../utils/storage";

function FocusSession() {

    const [seconds, setSeconds] = useState(0);

    const [running, setRunning] = useState(false);

    const [coins, setCoins] = useState(0);

    const [streak, setStreak] = useState(0);

    // Timer

    useEffect(() => {

        let timer;

        if (running && seconds > 0) {

            timer = setInterval(() => {

                setSeconds((prev) => prev - 1);

            }, 1000);

        }

        if (seconds === 0 && running) {

            completeSession();

        }

        return () => clearInterval(timer);

    }, [running, seconds]);



    // Background Detection

    useEffect(() => {

        let backgroundTimer;

        const handleVisibility = () => {

            if (document.hidden && running) {

                backgroundTimer = setTimeout(() => {

                    const session = {

                        id: uuid(),

                        status: "failed",

                        reason: "app_switch",

                        synced: false,

                        updatedAt: Date.now()

                    };

                    saveSession(session);

                    setRunning(false);

                    setSeconds(0);

                    alert(
                        "Session Failed! You left the app for more than 5 seconds."
                    );

                }, 5000);

            } else {

                clearTimeout(backgroundTimer);

            }

        };

        document.addEventListener(
            "visibilitychange",
            handleVisibility
        );

        return () => {

            document.removeEventListener(
                "visibilitychange",
                handleVisibility
            );

            clearTimeout(backgroundTimer);

        };

    }, [running]);



    // Start Session

    const startSession = () => {

        if (running) return;

        setSeconds(30);

        setRunning(true);

    };



    // Give Up

    const giveUp = () => {

        const session = {

            id: uuid(),

            status: "failed",

            reason: "gave_up",

            synced: false,

            updatedAt: Date.now()

        };

        saveSession(session);

        setRunning(false);

        setSeconds(0);

    };



    // Complete Session

    const completeSession = () => {

        const session = {

            id: uuid(),

            status: "completed",

            coins: 50,

            streak: streak + 1,

            synced: false,

            updatedAt: Date.now()

        };

        saveSession(session);

        setCoins((prev) => prev + 50);

        setStreak((prev) => prev + 1);

        setRunning(false);

        setSeconds(0);

        alert("Focus Session Completed!");

    };



    return (

        <div>

            <h1>Focus Session</h1>

            <h2>{seconds}</h2>

            <button onClick={startSession}>
                Start
            </button>

            <button onClick={giveUp}>
                Give Up
            </button>

            <h3>Coins : {coins}</h3>

            <h3>Streak : {streak}</h3>

        </div>

    );

}

export default FocusSession;