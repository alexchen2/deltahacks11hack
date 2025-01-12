
import "../../vendor/css/setStatus.css";
import { wsConnect, doSend } from "../../Network/webSocket";

import {useEffect, useState} from "react";

const handlePanelTap = (index, focus, setFocus, setFocusStyle) => {
    // doSend("");

    setFocus([
        ...(new Array(Math.max(0, index)).fill(0)), 
        1, 
        ...(new Array(Math.max(0, focus.length - index - 1)).fill(0))
    ])
}

const StatusPanel = ({ name, iconPath, index, focus, setFocus }) => {
    const [focusStyle, setFocusStyle] = useState("spanel-focus");
    const panelStyle = `spanel-${index + 1}`;
    const iconStyle = `spanel-${index + 1}-dark`;

    useEffect(() => {
        if (focus[index] == 1) {
            setFocusStyle("spanel-focus");
        } else {
            setFocusStyle("");
        }
    }, [focus[index]])

    return(
        <div 
            className={`spanel-wrapper ${panelStyle} ${focusStyle}`}
            onClick={() => { handlePanelTap(index, focus, setFocus, setFocusStyle) }}
        >
            <span className="spanel-text">{ name }</span>
            <div className={`spanel-circle ${iconStyle}`}>
                <img className="spanel-img" src={iconPath} alt="" />
            </div>
        </div>
    );
}

export default StatusPanel;