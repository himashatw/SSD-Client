import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigation = useNavigate();

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

  // isAuthenticated && navigation("/messages");

  return (
    <div>
      <p className="text-center mt-10 text-xl font-bold">Login</p>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col mt-10 w-2/3 mx-auto my-auto">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
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
