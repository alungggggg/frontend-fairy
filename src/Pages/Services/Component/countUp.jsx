import React, { useEffect, useState } from 'react';

const CountUp = ({ start, end, duration }) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * (end - start) + start));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [start, end, duration]);

    return <div>{count}</div>;
};

export default CountUp;