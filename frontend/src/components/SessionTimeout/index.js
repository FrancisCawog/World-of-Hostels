import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const SessionTimeout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        dispatch(logout());
        history.push("/");
      }, 60 * 30 * 1000);
    };

    const activityEvents = [
      "click",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart"
    ];

    activityEvents.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timer);
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [dispatch]);

  return null;
};

export default SessionTimeout;
