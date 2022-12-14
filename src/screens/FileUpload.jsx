import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FileUpload() {
  const { logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const navigation = useNavigate();
  const [uploads, setUploads] = React.useState("");

  const msgText = React.useRef();

  const validateAccess = async () => {
    if (!isAuthenticated) {
      navigation("/");
    }
  };

  React.useLayoutEffect(() => {
    return () => {
      validateAccess();
    };
  }, []);

  const upload = (e) => {
    setUploads(e.target.files[0]);
  };

  const uploadFile = async (e) => {
    if (uploads === "") {
      toast.error("Please select a file");
      return;
    }

    const token = await getAccessTokenSilently();

    e.preventDefault();
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("file", uploads);

    try {
      const response = await fetch("http://localhost:8080/manager-validate", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const notificationMessage = data.message || "File uploaded successfully";
      toast.success(notificationMessage);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
        "http://localhost:8080/manager-validate-msg",
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
        File/Message Upload (Managers Portal)
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
            File
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="message"
            type="file"
            placeholder="type here"
            onChange={upload}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded bg-cyan-100"
            type="button"
            onClick={uploadFile}
          >
            Upload
          </button>
        </div>
      </div>
      <hr />
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

export default FileUpload;
