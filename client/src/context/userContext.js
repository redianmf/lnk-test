import { createContext, useReducer } from "react";
import { setAuthToken } from "../config/api";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      localStorage.setItem("username", payload.name);
      setAuthToken(payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      setAuthToken(null);
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
