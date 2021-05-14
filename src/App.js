import logo from './logo.svg';
import './App.css';
import Signin from './Components/Login/signin';
import SimpleMode from './Components/Forms/simpleMode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  return (
    <>
      {/* <Signin /> */}
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // style={{ width: "42%" }} 
      />
      <SimpleMode keyringAccts={props.keyringAccts} />
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
