import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { CardUI } from "../../UI/CardUI";
import styles from "./HomePage.module.css";
import image from "../../Static/main-image.svg"
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

const HomePage = () => {
    return (
        <div id={styles["main-container"]}>
            <section id={styles['image-header-container']} >
                <div className={styles['header-text-container']} >
                    <h2> A Minimalist Project Mangement Tool for Individual Development</h2>
                    <p>A minimalist Project Mangement Tool for individual project mangement</p>
                    <div>
                        <p>
                            <CloseTwoToneIcon color="error" fontSize="medium"  sx={{ mb: -.75 }}/>
                            No Sprints
                        </p>
                        <p>
                            <CloseTwoToneIcon color="error" fontSize="medium"  sx={{ mb: -.75 }}/>
                            No Project Management Methodologies
                        </p>
                        <p>
                            <CloseTwoToneIcon color="error" fontSize="medium"  sx={{ mb: -.75 }}/>
                            No Micromanagement
                        </p>
                    </div>
                </div>
                <img className={styles.border} src={image} alt="person coding"/>
            </section>
            <Grid
                mt={5}
                container
                rowSpacing={3}
                columnSpacing={{ xs: 2, md: 6 }}
            >
                <Grid xs={12} md={4}>
                    <CardUI />
                </Grid>
                <Grid xs={12} md={4}>
                    <CardUI />
                </Grid>
                <Grid xs={12} md={4}>
                    <CardUI />
                </Grid>
            </Grid>
        </div>
    );
};
export { HomePage };
