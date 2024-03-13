import React, { ReactNode, createContext, useState } from "react";
import { NotificationType } from "../types/NotificationType";
import { NotificationContextType } from "../types/NotificationContextType";

export const NotificationContext = createContext<NotificationContextType>({
  setNotification: () => {},
  notification: undefined,
  children: undefined,
});

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notification, setNotification] = useState<NotificationType>(undefined);

  return (
    <NotificationContext.Provider
      value={{ notification, setNotification, children }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
