import Settings from "./Settings";
import Home from "./Home";
import TabBar from "../Components/TabBar";
import { useState } from "react";

const Main = ({webSocket}) => {
    const [currentTab, setCurrentTab] = useState(1);
    return (
        <>
            <TabBar changeTab={setCurrentTab} />
            {
                currentTab == 0 
                ? <Home />  
                : <Settings webSocket={webSocket}/>
            }
        </>
    )
}

export default Main