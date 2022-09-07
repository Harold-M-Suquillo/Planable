import "./App.css";
import { useState, useEffect } from "react";
import { Header } from "./Components/Header/Header";
import { AuthContextProvider } from "./Utils/AuthContextProvider";
import { theme } from "./Utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { HomePage } from './Components/HomePage/HomePage';
import { Footer } from './UI/Footer'

function App() {
    // Manage and handle the user changing page
    const [page, setPage] = useState("Planable");
    const changePageHandler = (newPage) => {
        console.log("new page");
        setPage(newPage);
    };

    // Have the slider move back to original value
    useEffect(() => {
        setPage("Planable");
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                <AuthContextProvider>
                    <Header onPageChange={changePageHandler} page={page} />
                    {page === 'Planable' && <HomePage/>}
                </AuthContextProvider>
                <Footer/>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
