import {useState} from "react";
import "../vendor/css/tabBar.css";

import homeIcon from "../vendor/img/icons/home.png";
import cogIcon from "../vendor/img/icons/settings.png";

const handleTabClick = (changeTab, index, tabsBG, setTabsBG) => {
    
    changeTab(index);

    if (index == 0) {
        setTabsBG(["tab-focus", ""]);
    } else {
        setTabsBG(["", "tab-focus"]);
    }
}


const TabBar = ({changeTab}) => {
    const [tabsBG, setTabsBG] = useState(["tab-focus", ""]);

    return (
        <div className="tabs-container">
            {/* Tab 0: Home */}
            <div className={`tab-bg ${tabsBG[0]}`}
                onClick={() => {handleTabClick(changeTab, 0, tabsBG, setTabsBG)}}
            >
                <div className="tab-wrapper">
                    <img className="tab-icon" src={homeIcon} alt="" />
                    <span className="tab-label">
                        Home
                    </span>
                </div>
            </div>

            {/* Tab 1: Settings/Set Status */}
            <div className={`tab-bg ${tabsBG[1]}`}
                onClick={() => {handleTabClick(changeTab, 1, tabsBG, setTabsBG)}}            
            > 
                <div className="tab-wrapper">
                    <img className="tab-icon" src={cogIcon} alt="" />
                    <span className="tab-label">
                        Settings
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TabBar;