import { useState, useEffect } from "react";

function AgentSearch({ isFound }) {
    const [loadingDots, setLoadingDots] = useState(".");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (loadingDots.length < 4) {
                setLoadingDots(loadingDots + ".");
            } else {
                setLoadingDots(".");
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [loadingDots]);

    if (isFound) {
        return (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Agent Found!</strong>
                <span className="block sm:inline"> We have found an agent for you.</span>
            </div>
        )
    } else {
        return (
            <div>
                <p className="mb-4">Searching for an agent (Avg. Response Time: 10s){loadingDots}</p>
                <p></p>
            </div>
        )
    }
}

export default AgentSearch;