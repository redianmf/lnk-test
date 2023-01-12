// React
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";

// MUI
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

// Axios
import { API, setAuthToken } from "../../config/api";

// Calculator Buttons
const CALCULATOR_BUTTON = [
  { label: "7", action: "7" },
  { label: "8", action: "8" },
  { label: "9", action: "9" },
  { label: "÷", action: "/" },
  { label: "4", action: "4" },
  { label: "5", action: "5" },
  { label: "6", action: "6" },
  { label: "×", action: "*" },
  { label: "1", action: "1" },
  { label: "2", action: "2" },
  { label: "3", action: "3" },
  { label: "-", action: "-" },
  { label: "0", action: "0" },
  { label: "C", action: "C" },
  { label: "=", action: "=" },
  { label: "+", action: "+" },
];

const OPERATOR = ["/", "*", "-", "+", "0"];

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [spelling, setSpelling] = useState("");
  const [spellingToggle, setSpellingToggle] = useState(false);
  const [username, setUsername] = useState("");
  const [state, dispatch] = useContext(UserContext); //eslint-disable-line

  // Set username
  useEffect(() => {
    const user = localStorage.username;
    setUsername(user);
  }, []);

  //Handle click calculator button
  const handleClick = (item) => {
    try {
      // Special function
      if (item === "C") {
        setSpelling("");
        return setDisplay("");
      } else if (item === "=") {
        let calculated = eval(display); //eslint-disable-line
        let result = makeSpelling(calculated);
        setSpelling(result);
        return setDisplay(calculated.toString());
      }

      // Handle if first value invalid
      if (OPERATOR.includes(display.charAt(0))) {
        return setDisplay(item);
      }

      // Change display
      setDisplay((current) => current + item);
    } catch (error) {
      console.log(error);
      setDisplay("Err");
    }
  };

  // Handle toggle terbilang
  const handleSpellingToggle = () => {
    setSpellingToggle(!spellingToggle);
  };

  // Create terbilang
  const makeSpelling = (number) => {
    let divisionResult = 0;
    const numberSpelling = [
      " ",
      "Satu",
      "Dua",
      "Tiga",
      "Empat",
      "Lima",
      "Enam",
      "Tujuh",
      "Delapan",
      "Sembilan",
      "Sepuluh",
      "Sebelas",
    ];

    if (number < 12) {
      return numberSpelling[number];
    } else if (number < 20) {
      return makeSpelling(number - 10) + " Belas";
    } else if (number < 100) {
      divisionResult = Math.floor(number / 10);
      return (
        makeSpelling(divisionResult) + " Puluh " + makeSpelling(number % 10)
      );
    } else if (number < 200) {
      return "Seratus " + makeSpelling(number - 100);
    } else if (number < 1000) {
      divisionResult = Math.floor(number / 100);
      return (
        makeSpelling(divisionResult) + " Ratus " + makeSpelling(number % 100)
      );
    } else if (number < 2000) {
      divisionResult = Math.floor(number / 10);
      return "Seribu" + makeSpelling(number - 1000);
    } else if (number < 1000000) {
      divisionResult = Math.floor(number / 1000);
      return (
        makeSpelling(divisionResult) + " Ribu " + makeSpelling(number % 1000)
      );
    } else if (number < 1000000000) {
      divisionResult = Math.floor(number / 1000000);
      return (
        makeSpelling(divisionResult) + " Juta " + makeSpelling(number % 1000000)
      );
    } else if (number < 1000000000000) {
      divisionResult = Math.floor(number / 1000000000);
      return (
        makeSpelling(divisionResult) +
        " Miliar " +
        makeSpelling(number % 1000000000)
      );
    } else if (number < 1000000000000000) {
      divisionResult = Math.floor(number / 1000000000000);
      return (
        makeSpelling(divisionResult) +
        " Triliun " +
        makeSpelling(number % 1000000000000)
      );
    } else if (number < 1000000000000000000) {
      divisionResult = Math.floor(number / 1000000000000000);
      return (
        makeSpelling(divisionResult) +
        " Kuadriliun " +
        makeSpelling(number % 1000000000000000)
      );
    } else {
      return "Error Terbilang";
    }
  };

  // Handle Logout
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await API.get("/logout");

      if (response.status === 200) {
        localStorage.clear();
        setAuthToken(null);

        return dispatch({
          type: "LOGOUT",
        });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="container">
      <div className="container_calculator">
        <div className="username">
          <p>Hi, {username}</p>
          <Tooltip title="Logout" placement="top">
            <IconButton onClick={handleLogout} aria-label="logout">
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="calculator_display">{display}</div>
        <div className="display_spelling">
          <Button
            className={spellingToggle ? "spelling-active" : ""}
            onClick={handleSpellingToggle}
          >
            Terbilang
          </Button>
          <p>{spellingToggle ? spelling : ""}</p>
        </div>
        <Grid container spacing={1}>
          {CALCULATOR_BUTTON.map((item, index) => (
            <Grid key={index} item md={3}>
              <Button
                onClick={() => handleClick(item.action)}
                className="btn_calculator"
                fullWidth
              >
                {item.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Calculator;
