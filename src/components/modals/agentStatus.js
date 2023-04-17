import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import AvatarImg from '../../assets/avatar.jpeg'
import { CircularProgress } from "@mui/material";

function AgentStatus({ isFound }) {
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

    return (
        //create a element with a cricle and the name Agent Found: George Schulz 
        <div className="flex gap-x-2 mb-4 items-center">
            {/* <div style={{
                borderRadius: '15px',
                width: '15px',
                height: '15px',
                backgroundColor: isFound ? '#449e48' : '#f3e260',
                border: isFound ? '1px solid #357a38' : '1px solid #bd903c',
                marginTop: '5px',
                borderShadow: '0 0 0 1px #fff'
            }}></div> */}
            {/** add a green border below */}
            { isFound && <Avatar src={AvatarImg} className="border-1" style={{ border: '4px solid green' }} />}
            {!isFound && <CircularProgress color="inherit" /> }
            <div className="flex flex-col">
                <p className="font-bold">{isFound ? 'Agent Found: G Schulz' : `Searching for an available agent${loadingDots}`} </p>
                <p>{isFound ? 'Avg. Response Time: 8 sec' : 'Agents Available 24/7'}</p>
            </div>
        </div>
    )
}

export default AgentStatus;