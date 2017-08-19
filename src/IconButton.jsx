import React,{Component} from "react";

const IconButton = ({icon,theStyle,theClass,onClick}) => (
<button type="button" style={theStyle} className={"icon-button " + theClass} onClick={onClick}>{icon}</button>
);
export default IconButton;
