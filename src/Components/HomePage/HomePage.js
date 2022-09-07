import React from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import styles from "./HomePage.module.css";
import image from "../../Static/main-image.svg";
import AddTaskIcon from "@mui/icons-material/AddTask";
import BarChartIcon from "@mui/icons-material/BarChart";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import TerminalIcon from '@mui/icons-material/Terminal';
import Typography from "@mui/material/Typography";

const HomePage = () => {
    return (
        <div id={styles["main-container"]}>
            <section id={styles["image-header-container"]}>
                <div className={styles["header-text-container"]}>
                    <h2> Quickly Coordinate Impactful Action </h2>
                    <p>
                        Maximize timely deliverables for real-time goals.
                        Intrinsically incubate intuitive opportunities and 
                        real-time potentialities for maximum growth.
                    </p>
                    <div>
                        <p>
                            <CloseTwoToneIcon
                                color="error"
                                fontSize="medium"
                                sx={{ mb: -0.75 }}
                            />
                           No procrastination
                        </p>
                        <p>
                            <CloseTwoToneIcon
                                color="error"
                                fontSize="medium"
                                sx={{ mb: -0.75 }}
                            />
                            No Distractions
                        </p>
                        <p>
                            <CloseTwoToneIcon
                                color="error"
                                fontSize="medium"
                                sx={{ mb: -0.75 }}
                            />
                            No Micromanagement
                        </p>
                    </div>
                </div>
                <img
                    className={styles.border}
                    src={image}
                    alt="person coding"
                />
            </section>


            <section id={styles['about-container']}>
                <div>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "light" }}
                    >
                        <AccountTreeIcon
                            sx={{ mr: 1, fontSize: 35, mb: -1.25, color: "#6C63FF" }}
                        />
                        Track Progress
                    </Typography>
                    <Typography variant="body2" gutterBottom align='justify'>
                        Distinctively re-engineer revolutionary meta-services and premium architectures.
                        Intrinsically incubate intuitive opportunities and real-time potentialities. 
                    </Typography>
                </div>
                <div>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "light" }}
                    >
                        <AddTaskIcon sx={{ mr: 1, fontSize: 35, mb: -1.25, color: "#6C63FF" }} />
                        Deploy
                    </Typography>
                    <Typography variant="body2" gutterBottom align='justify'>
                    Dynamically reinvent market-driven opportunities and ubiquitous interfaces. Energistically
                    fabricate an expanded array of niche markets through robust products.
                    </Typography>
                </div>
                <div>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "light" }}
                    >
                        <BarChartIcon sx={{ fontSize: 42, mb: -1.5 , color: "#6C63FF"}} />
                        View Analytics
                    </Typography>
                    <Typography variant="body2" gutterBottom align='justify'>
                    Efficiently enable enabled sources and cost effective products. Completely synthesize 
                    principle-centered information after ethical communities.
                    </Typography>
                </div>
                <div id={styles['last-container']}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "light" }}
                    >
                        <TerminalIcon sx={{ mr: 1, fontSize: 42, mb: -1.5 , color: "#6C63FF"}} />
                        Leverage
                    </Typography>
                    <Typography variant="body2" gutterBottom align='justify'>
                    Quickly cultivate optimal processes and tactical architectures. 
                    Objectively seize scalable metrics whereas proactive e-services.
                    </Typography>
                </div>
            </section>

            <section>


            </section>
        </div>
    );
};
export { HomePage };
