import React from "react"
import { NotificationType } from "./NotificationType"

export type NotificationContextType = {
    setNotification: React.Dispatch<React.SetStateAction<NotificationType | undefined>>
    notification: NotificationType | undefined
    children: React.ReactNode
}