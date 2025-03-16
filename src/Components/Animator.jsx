import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updatePosition);
        return () => window.removeEventListener("mousemove", updatePosition);
    }, []);

    return (
        <motion.div
        className="cursor"
        animate={{ x: position.x - 10, y: position.y - 10 }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
        />
    );
};

export default AnimatedCursor