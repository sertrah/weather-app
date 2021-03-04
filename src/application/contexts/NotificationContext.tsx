import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import NotificationMessage from "../components/NotificationMessage";

type ContextProps = any;

const NotificationContext = createContext<Partial<ContextProps>  | null>(null);

const defaultConfig = {
  duration: 3000,
  mountingElement: document.body,
};
const removeById = (id: number) => (prev: any) =>
  prev.length > 0 ? prev.filter((a: any) => a.id !== id) : prev;

const  NotificationProvider = ({ children, config }: any)  => {
  const [notificationList, setNotificationList] = useState<{id: number, title?: string, message?: string}[]>([]);
  const { duration = 3000, mountingElement = document.body } = {
    ...defaultConfig,
    ...config,
  };

  const handleClose = useCallback(
    (id) => {
      clearTimeout(id);
      setNotificationList(removeById(id));
    },
    [setNotificationList]
  );

  const notify = useMemo(() => {
    const notifyFn = (notification: any) => {
      const id: any = setTimeout(() => {
        setNotificationList(removeById(id));
      }, duration);
      setNotificationList((list) => [...list, { id, ...notification }]);
    };

    const notifyStatus = (status: any) => (notification: any) =>
      notifyFn({ ...notification, status });

    notifyFn.success = notifyStatus("success");
    notifyFn.error = notifyStatus("error");

    return notifyFn;
  }, [setNotificationList, duration]);

  return (
    <>
      <NotificationContext.Provider value={notify}>
        {children}
      </NotificationContext.Provider>
      <NotificationMessage
        notifications={notificationList}
        onClose={handleClose}
        mountingElement={mountingElement}
      />
    </>
  );
}

export { NotificationContext, NotificationProvider };
