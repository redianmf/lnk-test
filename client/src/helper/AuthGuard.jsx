import { useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { UserContext } from "../context/userContext";
import { setAuthToken, API } from "../config/api";

function AuthGuard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (!localStorage.token) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, [state]);

  const checkUser = async () => {
    try {
      if (!localStorage.token) {
        return dispatch({
          type: "LOGOUT",
        });
      }

      const response = await API.get("/check-auth");
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "LOGOUT",
        });
      }

      // Set user
      localStorage.username = response.data.data.user.name;

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
    setIsLoading(false);
    //eslint-disable-next-line
  }, []);

  return isLoading ? (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  ) : (
    <Outlet />
  );
}

export default AuthGuard;
