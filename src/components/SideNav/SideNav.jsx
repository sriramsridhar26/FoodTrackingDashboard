import React from "react";
import './SideNav.css'
import { Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/Logo.png"
function SideNav() {
    return (
        <>
            <div className="sidenav">
                <div className="sidenavbox">
                    {/* <h2 className="logo">ZERO</h2> */}
                    <div className="logo">
                        <img src={logo} width="100px" height="100px" style={{borderRadius: '50%'}}/>
                    </div>

                    <div className="sidenavitems">
                        <div class="custom-button">
                            <FontAwesomeIcon icon={faHouse} /> &nbsp;
                            Home
                        </div>
                        <div class="custom-button">
                            <FontAwesomeIcon icon={faUser} /> &nbsp;
                            Profile
                        </div>
                        <div class="custom-button">
                            <FontAwesomeIcon icon={faLock} /> &nbsp;
                            Admin
                        </div>

                    </div>


                </div>

            </div>
        </>


    )

}

export default SideNav;