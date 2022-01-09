import { createContext, useReducer } from "react";
import Notification from "./Notification";

export const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return { ...action.payload };
      case "REMOVE_NOTIFICATION":
        return null;
      default:
        return state;
    }
  }, null);
  return (
    <NotificationContext.Provider value={dispatch}>
      {state ? <Notification {...state} /> : null}
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
