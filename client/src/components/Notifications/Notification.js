import { useState, useEffect, useContext } from "react";
import { NotificationContext } from "./NotificationProvider";
import "./Notification.css";

function Notification({ message, type }) {
  const [width, setWidth] = useState(0);
  const [hide, setHide] = useState(false);
  const dispatch = useContext(NotificationContext);
  const barStartHadler = () => {
    const id = setInterval(() => {
      setWidth((oldWidth) => {
        if (oldWidth === 100) {
          clearInterval(id);
          return;
        }
        return (oldWidth += 1);
      });
    }, 20);
  };
  useEffect(() => {
    barStartHadler();
  }, []);
	useEffect(() => {
		if (width === 100) {
			setHide(true);
			setTimeout(() => {
				dispatch({
					type: "REMOVE_NOTIFICATION"
				});
			}, 2000);
		}
	}, [width, dispatch])
  return (
    <div className={`notification-wrapper ${hide ? "hide" : ""}`}>
      <div className={"notification"}>
        <span className="notification-content">{message}</span>
      </div>
      <div
        className={`bar ${type === "SUCCESS" ? "success" : "error"}`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}

export default Notification;
