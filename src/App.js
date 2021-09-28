import './App.css';
import SimpleMode from './Components/Forms/simpleMode';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  return (
    <>
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={process.env.NODE_ENV === 'development' ? 20000 : 5000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <SimpleMode keyringAccts={props.keyringAccts} />
    </>
  );
}

export default App;
