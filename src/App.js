import './App.css';
import { Header } from './Components/Header/Header';
import { AuthContextProvider } from './Contexts/AuthContextProvider';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <AuthContextProvider>
          <Header/>
        </AuthContextProvider>
      </SnackbarProvider>
    </ThemeProvider>



  );
}

export default App;
