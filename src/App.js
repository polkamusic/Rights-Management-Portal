import logo from './logo.svg';
import './App.css';
import SimpleMode from './Components/Forms/simpleMode';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: "42%" }} 
      /> */}
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        hideProgressBar={true}
        pauseOnHover
        progress={0}
      />
      <SimpleMode keyringAccts={props.keyringAccts} />
    </>
  );
}

export default App;
