import './App.css';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RightsManagement from './Components/Forms/rightsManagement';

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
      <RightsManagement keyringAccts={props.keyringAccts} />
    </>
  );
}

export default App;
