import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext();

const { Provider } = Context;

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  return <Provider value={{ token, setToken }}>{children}</Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
