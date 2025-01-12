import { useState } from "react";

// Local imports
import "../vendor/css/settings.css";
import SettingsHeader from "../Components/SettingsHeader";
import StatusPanel from "../Components/Subsettings/StatusPanel";

import { url, defaultStatus } from "../data/constants";


const Settings = () => {
    const [statusList, setStatusList] = useState([
        ...defaultStatus
    ]);

    const [panelFocus, setPanelFocus] = useState([
        1, ...(new Array(defaultStatus.length - 1).fill(0))
    ]);

    return (
        <div>
            <SettingsHeader headerText="Select Status" btnText="Back" />
        
            <div className="status-wrapper">
                <div className="status-list">
                    {statusList.map((statusInfo, index) => {
                        const status = statusInfo["name"];
                        const path = statusInfo["path"];

                        return (
                            <StatusPanel
                                key={index}
                                name={status}
                                iconPath={path}
                                index={index}
                                focus={panelFocus}
                                setFocus={setPanelFocus}
                            />
                        );
                    })}
                    <></>
                </div>
            </div>
        </div>
    )
};

export default Settings;