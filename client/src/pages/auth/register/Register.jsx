// React
import { useState } from "react";
import { Link } from "react-router-dom";

// MUI
import { TextField, Button, Alert } from "@mui/material";

// Axios
import { API } from "../../../config/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  //Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        email,
        password,
      };

      await API.post("/register", data);
      setRegisterSuccess(true);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="container_auth">
      <div className="container_form">
        <h3>Calculator App</h3>
        {registerSuccess && <Alert severity="success">Register Success!</Alert>}
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          fullWidth
        />
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
          Register
        </Button>
        <h5>
          Already have account?{" "}
          <Link to="/login">
            <b>Click here.</b>
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Register;
