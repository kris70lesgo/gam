import type { AnalyticsSummary } from "@/lib/types"
import { Users, UserPlus, Activity, DollarSign, TrendingUp } from "lucide-react"

interface MetricsCardsProps {
  analytics: AnalyticsSummary
}

export default function MetricsCards({ analytics }: MetricsCardsProps) {
  const metrics = [
    {
      title: "Total Users",
      value: analytics.totalUsers.toLocaleString(),
      icon: Users,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "New Signups Today",
      value: analytics.newSignupsToday.toString(),
      icon: UserPlus,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Active Users",
      value: analytics.activeUsers.toLocaleString(),
      icon: Activity,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Revenue Today",
      value: analytics.revenueToday,
      icon: DollarSign,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      title: "Conversion Rate",
      value: analytics.conversionRate,
      icon: TrendingUp,
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Key Metrics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className={`${metric.bgColor} p-3 rounded-lg`}>
                  <IconComponent className={`w-6 h-6 ${metric.textColor}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
