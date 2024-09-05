import {CssBaseline, ThemeProvider} from '@mui/material';
import { ColorModeContext, useMode } from './theme'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Entrypoint from './pages/Entrypoint';
import Login from './pages/Login';
import ReservationDetail from './pages/ReservationDetail';
import Complete from './pages/Complete';


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
          <Route path="/reservation/:id" element={<ReservationDetail />} />
          <Route path="/reservation/complete/:id" element={<Complete/>}/>
          </Route>

          <Route path="/login" element={<Login/>}/>
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
