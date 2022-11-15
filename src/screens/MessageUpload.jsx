import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Toaster, toast } from "react-hot-toast";

function MessageUpload() {
  const navigation = useNavigate();
  const msgText = React.useRef();

  const {
    loginWithRedirect,
    loginWithPopup,
    logout,

    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  React.useLayoutEffect(() => {
    return () => {
      validateAccess();
    };
  }, []);

  const validateAccess = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to access this page");
      navigation("/");
    }

    const token = await getAccessTokenSilently();
    const decoded = jwt_decode(token);

    if (decoded.permissions.length === 0) {
      navigation("/admin-contact");
      // toast.error("Please contact administator to get access");
    }
  };

  const onClickHandler = async () => {
    if (msgText.current.value === "") {
      toast.error("Please enter a message");
      return;
    }

    const token = await getAccessTokenSilently();

    axios
      .post(
        "http://localhost:8080/worker-validate",
        {
          message: msgText.current.value,
          email: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const responseMessage = res.data.message || "Successfull";
        toast.success(responseMessage);
        msgText.current.value = "";
        console.log(res.data);
      })
      .catch((err) => {
        const errorMsg = err.response.data.message || "Something went wrong";
        toast.error(errorMsg);
        console.log(err);
      });
  };

  return (
    <div>
      <Toaster />
      <p className="text-center mt-10 text-xl font-bold">
        Message Upload (Workers Portal)
      </p>
      <div className="justify-end flex">
        <button
          className="bg-red-500 p-2 rounded text-white mt-5 mr-5"
          onClick={() => {
            logout();
            navigation("/");
          }}
        >
          Log out
        </button>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col mt-10 w-2/3 mx-auto my-auto">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="message"
            type="text"
            placeholder="type here"
            ref={msgText}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded bg-cyan-100"
            type="button"
            onClick={onClickHandler}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageUpload;
