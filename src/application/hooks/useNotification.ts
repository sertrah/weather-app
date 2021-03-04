import { useContext } from "react";
import { NotificationContext } from "../contexts";


export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw Error(
      "Hey for use `useNotification`, check if u arent use  `NotificationProvider`."
    );
  }

  return context;
};
