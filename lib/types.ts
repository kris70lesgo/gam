export interface RecentActivity {
  id: string
  type: string
  description: string
  timestamp: string
}

export interface AnalyticsSummary {
  widgetTitle: string
  totalUsers: number
  newSignupsToday: number
  activeUsers: number
  revenueToday: string
  conversionRate: string
  recentActivities: RecentActivity[]
}

export interface Notification {
  id: string
  message: string
  severity: "high" | "info"
  read: boolean
}

export interface DashboardData {
  analyticsSummary: AnalyticsSummary
  notifications: Notification[]
}
