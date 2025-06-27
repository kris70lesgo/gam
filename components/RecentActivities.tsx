import type { RecentActivity } from "@/lib/types"
import { UserPlus, CreditCard, LogIn, Settings, Clock } from "lucide-react"

interface RecentActivitiesProps {
  activities: RecentActivity[]
}

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "New User":
        return UserPlus
      case "Transaction":
        return CreditCard
      case "Login":
        return LogIn
      case "Update":
        return Settings
      default:
        return Clock
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "New User":
        return "text-green-600 bg-green-50"
      case "Transaction":
        return "text-blue-600 bg-blue-50"
      case "Login":
        return "text-purple-600 bg-purple-50"
      case "Update":
        return "text-orange-600 bg-orange-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>

      <div className="space-y-4">
        {activities.map((activity) => {
          const IconComponent = getActivityIcon(activity.type)
          const colorClasses = getActivityColor(activity.type)

          return (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
            >
              <div className={`p-2 rounded-lg ${colorClasses}`}>
                <IconComponent className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{activity.type}</span>
                  <span className="text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{activity.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-150">
          View All Activities
        </button>
      </div>
    </div>
  )
}
