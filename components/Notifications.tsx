"use client"

import type { Notification } from "@/lib/types"
import { AlertTriangle, Info, X } from "lucide-react"
import { useState } from "react"

interface NotificationsProps {
  notifications: Notification[]
}

export default function Notifications({ notifications }: NotificationsProps) {
  const [dismissedNotifications, setDismissedNotifications] = useState<string[]>([])

  const getNotificationIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return AlertTriangle
      case "info":
        return Info
      default:
        return Info
    }
  }

  const getNotificationStyles = (severity: string) => {
    switch (severity) {
      case "high":
        return {
          container: "bg-red-50 border-red-200",
          icon: "text-red-600",
          text: "text-red-800",
          button: "text-red-400 hover:text-red-600",
        }
      case "info":
        return {
          container: "bg-blue-50 border-blue-200",
          icon: "text-blue-600",
          text: "text-blue-800",
          button: "text-blue-400 hover:text-blue-600",
        }
      default:
        return {
          container: "bg-gray-50 border-gray-200",
          icon: "text-gray-600",
          text: "text-gray-800",
          button: "text-gray-400 hover:text-gray-600",
        }
    }
  }

  const handleDismiss = (notificationId: string) => {
    setDismissedNotifications((prev) => [...prev, notificationId])
  }

  const visibleNotifications = notifications.filter((notification) => !dismissedNotifications.includes(notification.id))

  if (visibleNotifications.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {visibleNotifications.map((notification) => {
        const IconComponent = getNotificationIcon(notification.severity)
        const styles = getNotificationStyles(notification.severity)

        return (
          <div key={notification.id} className={`${styles.container} border rounded-lg p-4 flex items-start space-x-3`}>
            <div className={`${styles.icon} mt-0.5`}>
              <IconComponent className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <p className={`${styles.text} text-sm font-medium`}>{notification.message}</p>
              {!notification.read && <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2"></span>}
            </div>

            <button
              onClick={() => handleDismiss(notification.id)}
              className={`${styles.button} transition-colors duration-150`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
