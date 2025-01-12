import sleepIcon from "../vendor/img/icons/rest.png";
import workIcon from "../vendor/img/icons/work.png";
import dneIcon from "../vendor/img/icons/dne.png";
import socialIcon from "../vendor/img/icons/social.png";

const url = "ws://192.168.4.1:1337/";

const defaultStatus = [
    {name: "Sleeping", path: sleepIcon, msg: "S"}, 
    {name: "Currently Away", path: workIcon, msg: "CA"}, 
    {name: "Do Not Disturb", path: dneIcon, msg: "BPK"}, 
    {name: "Feeling Social", path: socialIcon, msg: "DND"}
];

export {defaultStatus, url};