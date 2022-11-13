import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function AccessRequired() {
  const { logout, isAuthenticated } = useAuth0();

  const navigation = useNavigate();

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

  return (
    <div>
      {" "}
      <h3>Contact admin to get access</h3>
      <button
        onClick={() => {
          logout();
          navigation("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AccessRequired;
