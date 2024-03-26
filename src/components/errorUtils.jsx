import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling


const handleWarning = (m) => {
  toast.warning(m, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000, // Duration in milliseconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

}

const handleSuccess = (m) => {
  toast.success(m, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000, // Duration in milliseconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

}

const handle401Error = () => {
  toast.error("Session expired", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000, // Duration in milliseconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const handle403Error = () => {
  toast.error("You are not allowed to perform this action", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000, // Duration in milliseconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const handle404Error = () => {
  toast.error("Whatever you requested is not here.", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000, // Duration in milliseconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const handle400Error = () => {
  toast.error("Something wrong happened... ", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000, // Duration in milliseconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const handleAPIError = async (error, msg) => {

  let resp = error.response;
  if (!resp) {
    try{
      if (error.toLowerCase().includes('request canceled')) {
        return;
      }
    }
    catch(e){
      resp = error;
      // lazy
    }
  }


  if (resp && resp.status === 401) {
    handle401Error();
  } else {
    if (resp && resp.status === 403) {
      handle403Error(msg);
    } else {
      if (resp && resp.status === 404) {
        handle404Error(msg);
      } else {
        handle400Error("Oops, something went wrong");
        console.error(msg || "Something went wrong");
      }
    }
  }
}
export { handleAPIError, handleSuccess, handleWarning };