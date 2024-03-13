import React, { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { NotificationType } from "../types/NotificationType";

export const NotificationModal = ({
  text,
  success,
  setNotification,
}: {
  text: string;
  success: boolean;
  setNotification: Dispatch<SetStateAction<NotificationType>>;
}) => {
  const baseStyles = "flex justify-center items-center px-4 py-4";
  const modalStyles = success ? "bg-green-100" : "bg-red-100";

  return createPortal(
    <div className={`${baseStyles} ${modalStyles}`}>
      <div className={`relative rounded-lg p-4 shadow-lg`}>
        <h1 className="text-xl text-black font-bold mb-4">
          {success ? "Success" : "Error"}
        </h1>
        <span className="text-black">{text}</span>
        <FontAwesomeIcon
          className="absolute top-2 right-2 pointer-events-auto"
          icon={faTimes}
          size="lg"
          color="black"
          onClick={() => {
            setNotification({
              text: "",
              success: false,
            });
          }}
        />
      </div>
    </div>,
    document.getElementById("notification-modal") as HTMLElement
  );
};
