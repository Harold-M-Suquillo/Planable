import React from "react";
import ReactDOM from "react-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styles from "./Footer.module.css";

const Footer = () => {
    return ReactDOM.createPortal(
        <div id={styles["footer-container"]}>
            <div id={styles['footer-inner-container']}>
                <p>&copy; 2022 Planable. All rights reserved.</p>
                <div>
                    <FacebookIcon color="action"/>
                    <TwitterIcon color="action"/>
                    <a href="https://www.instagram.com/?hl=en" >
                        <InstagramIcon color="action"/>
                    </a>
                    <a href="www.linkedin.com/in/haroldsuquillo" target="_blank">
                        <LinkedInIcon color="action"/>
                    </a>
                </div>
            </div>
        </div>,
        document.getElementById("footer")
    );
};

export { Footer };
