// React
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// MUI
import { TextField, Button } from "@mui/material";

// Axios
import { API } from "../../../config/api";

// Context
import { UserContext } from "../../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext); //eslint-disable-line

  //Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
        password,
      };

      const response = await API.post("/login", data);

      if (response.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });

        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="container_auth">
      <div className="container_form">
        <h3>Calculator App</h3>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          type="email"
          fullWidth
        />
        <TextField
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          fullWidth
        />
        <Button onClick={handleSubmit} className="btn_submit_auth" fullWidth>
          Login
        </Button>
        <h5>
          Don't have account?{" "}
          <Link to="/register">
            <b>Click here.</b>
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
