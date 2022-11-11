import React from "react";
import Loading from "../components/Loading";

function MessageUpload() {
  return (
    <div>
      <p className="text-center mt-10 text-xl font-bold">
        Message Upload (Workers Portal)
      </p>
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
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageUpload;
