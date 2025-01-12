import sleepIcon from "../vendor/img/icons/rest.png";
import workIcon from "../vendor/img/icons/work.png";
import dneIcon from "../vendor/img/icons/dne.png";
import socialIcon from "../vendor/img/icons/social.png";

const url = "ws://192.168.4.1:1337/";

const defaultStatus = [
    {name: "Sleeping", path: sleepIcon}, 
    {name: "Currently Away", path: workIcon}, 
    {name: "Do Not Disturb", path: dneIcon}, 
    {name: "Feeling Social", path: socialIcon}
];

export {defaultStatus, url};