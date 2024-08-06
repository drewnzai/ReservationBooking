import {CssBaseline, ThemeProvider} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {ColorModeContext, useMode} from './theme';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AccountVerification from './pages/AccountVerification';
import Login from './pages/Login';
import Register from './pages/Register';
import Entrypoint from './pages/Entrypoint';
import Home from './pages/Home';
import Available from './pages/Available';
import Reserve from './pages/Reserve';
import ReservationPage from './pages/ReservationsPage';

function App() {

  const [theme, colorMode] = useMode();
  
  return (
    <>
    {/*An error that's just a pain really, works fine*/}
    {/* @ts-ignore */}
    <ColorModeContext.Provider value={colorMode}>

    {/*An error that's just a pain really, works fine*/}
    {/* @ts-ignore */}
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      
      <BrowserRouter>
      <Routes>
        <Route element={<Entrypoint/>}>
          
        <Route path="/" element={<Home/>}/>
        <Route path="/available" element={<Available/>}/>
        <Route path="/reserve" element={<Reserve/>}/>
        <Route path='/reservations' element={<ReservationPage/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/verifyaccount" element={<AccountVerification/>}/>
      </Routes>
      </BrowserRouter>
      
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </ThemeProvider>
    </ColorModeContext.Provider>
    
    </>
  )
}

export default App