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
  text: string | undefined;
  success: boolean | undefined;
  setNotification: Dispatch<SetStateAction<NotificationType>>;
}) => {
  const baseStyles =
  "flex justify-center items-center transition-opacity duration-1000 ease-in-out transition-visibility";
  const modalStyles = success ? "bg-green-100" : "bg-red-100";

  return createPortal(
    <div
      className={`${baseStyles} ${modalStyles} ${
        text ? "opacity-100 visible h-auto py-4" : "opacity-0 invisible h-0"
      }`}
    >
      <div className={`relative rounded-lg p-4 shadow-lg ${success? "bg-green-200" : "bg-red-200"}`}>
        <h1 className="text-l text-black font-bold mb-4">
          {success ? "Success" : "Error"}
        </h1>
        <span className="text-black">{text}</span>
        <FontAwesomeIcon
          className="absolute top-2 right-2 pointer-events-auto cursor-pointer"
          icon={faTimes}
          size="lg"
          color="black"
          onClick={() => {
            setNotification({
              success: success as boolean,
              text: "",
            });
          }}
        />
      </div>
    </div>,
    document.getElementById("notification-modal") as HTMLElement
  );
};
