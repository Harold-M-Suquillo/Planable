import './App.css';
import { Header } from './Components/Header/Header';
import { AuthContextProvider } from './AuthContextProvider';

function App() {
  return (
    <AuthContextProvider>
      <Header/>
    </AuthContextProvider>
  );
}

export default App;
