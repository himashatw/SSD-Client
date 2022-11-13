import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function Login() {
  const navigation = useNavigate();

  const authenticationHandler = async () => {
    const token = await getAccessTokenSilently();
    const decoded = jwt_decode(token);
    console.log(decoded);

    // if(decoded.permissions.includes("worker")){
    //   navigation("/worker");

    if (decoded.permissions.length === 0) {
      return navigation("/admin-contact");
      // toast.error("Please contact administator to get access");
    }

    if (decoded.permissions.includes("read:managers")) {
      return navigation("/files");
    }

    if (decoded.permissions.includes("read:workers")) {
      return navigation("/messages");
    }
  };

  const {
    loginWithRedirect,
    loginWithPopup,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const callAPI = () => {
    axios
      .get("http://localhost:8080/")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const protectedAPI = async () => {
    const token = await getAccessTokenSilently();

    try {
      const res = await axios.get("http://localhost:8080/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }

    return;
    // console.log(token);

    await axios
      .get("http://localhost:8080/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  if (isAuthenticated) {
    authenticationHandler();
  }

  // isAuthenticated && navigation("/messages");

  return (
    <div>
      <Toaster />
      <p className="text-center mt-10 text-xl font-bold">Login</p>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col mt-10 w-2/3 mx-auto my-auto">
        <div className="flex items-center justify-center">
          <button
            className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded bg-cyan-100"
            type="button"
            onClick={loginWithPopup}
          >
            Sign In with Popup
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded bg-cyan-100"
            type="button"
            onClick={loginWithRedirect}
          >
            Sign In with Redirect
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded bg-cyan-100"
            type="button"
            onClick={logout}
          >
            Log out
          </button>
        </div>

        {isAuthenticated && <h3>user is {JSON.stringify(user, null, 2)}</h3>}
        <h3>
          user is{" "}
          {isAuthenticated ? (
            <span className="text-green-500">Authenticated</span>
          ) : (
            <span className="text-red-500">Not Authenticated</span>
          )}
        </h3>
        <ul>
          <li>
            <button onClick={callAPI}>Call API</button>
          </li>
          <li>
            <button onClick={protectedAPI}>Call protect API</button>
          </li>
        </ul>

        <button
          onClick={() => {
            navigation("/messages");
          }}
        >
          Call MSGS
        </button>
      </div>
    </div>
  );
}

export default Login;
