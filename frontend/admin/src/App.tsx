import {CssBaseline, ThemeProvider} from '@mui/material';
import { ColorModeContext, useMode } from './theme'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';


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
