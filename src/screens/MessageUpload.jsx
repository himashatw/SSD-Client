import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

function MessageUpload() {
  const navigation = useNavigate();

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
      if (!isAuthenticated) {
        navigation("/");
      }
    };
  }, []);

  const test = async () => {
    const token = await getAccessTokenSilently();

    // console.log(token);

    axios
      .get("http://localhost:8080/worker-validate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    // console.log(getAccessTokenSilently);
  };

  return (
    <div>
      <p className="text-center mt-10 text-xl font-bold">
        Message Upload (Workers Portal)
      </p>
      <button
        onClick={() => {
          logout();
          navigation("/");
        }}
      >
        Log out
      </button>
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
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded bg-cyan-100"
            type="button"
            onClick={test}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageUpload;
