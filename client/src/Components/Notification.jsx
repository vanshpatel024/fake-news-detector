import React, { useState, useEffect, useRef } from "react";
import "../StyleSheets/Notification.css";

let enqueueNotification = () => {};

function Notification() {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [fadeInStart, setFadeInStart] = useState(false);
    const queueRef = useRef([]);
    const processingRef = useRef(false);
    const currentMessageRef = useRef(""); // To track the current msg

    const processQueue = () => {
        if (processingRef.current || queueRef.current.length === 0) return;

        const nextMsg = queueRef.current.shift();
        processingRef.current = true;
        setMessage(nextMsg);
        currentMessageRef.current = nextMsg; // Update current message ref
        setFadeInStart(true);
        setFadeOut(false);
        setVisible(true);

        // Fade in
        setTimeout(() => {
            setFadeInStart(false);
        }, 20);

        // Start fade + cleanup
        setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setVisible(false);
                processingRef.current = false;
                currentMessageRef.current = ""; // Clear current message
                processQueue();
            }, 300); // fade duration
        }, 2700);
    };

    useEffect(() => {
        enqueueNotification = (msg) => {
            if (!msg) return;

            // not showing duplicate mssgs in a row
            if (queueRef.current.includes(msg) || currentMessageRef.current === msg) return;

            queueRef.current.push(msg);
            processQueue();
        };

        return () => {
            queueRef.current = [];
            processingRef.current = false;
        };
    }, []);

    if (!visible) return null;

    return (
        <div className={`notification ${fadeInStart ? "fade-in-start" : ""} ${fadeOut ? "fade-out" : ""}`}>
            {message}
        </div>
    );
}

export const showNotification = (msg) => {
    enqueueNotification(msg);
};

export default Notification;
