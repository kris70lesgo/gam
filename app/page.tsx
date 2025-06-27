"use client"

import { useState, useEffect } from "react"
import type { DashboardData } from "@/lib/types"
import { fetchDashboardData } from "@/lib/api"
import MetricsCards from "@/components/MetricsCards"
import RecentActivities from "@/components/RecentActivities"
import Notifications from "@/components/Notifications"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const dashboardData = await fetchDashboardData()
        setData(dashboardData)
      } catch (err) {
        setError("Failed to load dashboard data")
        console.error("Error loading dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.analyticsSummary.widgetTitle}</h1>
          <p className="text-gray-600">Monitor your key performance indicators and recent activities</p>
        </div>

        {/* Notifications */}
        <div className="mb-8">
          <Notifications notifications={data.notifications} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Metrics Section */}
          <div className="xl:col-span-2">
            <MetricsCards analytics={data.analyticsSummary} />
          </div>

          {/* Recent Activities Section */}
          <div className="xl:col-span-1">
            <RecentActivities activities={data.analyticsSummary.recentActivities} />
          </div>
        </div>
      </div>
    </div>
  )
}
