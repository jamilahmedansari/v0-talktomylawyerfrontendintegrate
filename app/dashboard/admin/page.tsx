"use client"

import { useEffect, useState } from "react"
import { api } from "../../../lib/api"
import ElectricBorder from "../../../components/ElectricBorder"

interface AdminOverview {
  total_users: number
  active_subscriptions: number
  monthly_revenue: number
  total_letters_generated: number
  openai_api_costs: number
  total_employees: number
  top_employee: {
    name: string
    referral_code: string
    signup_count: number
  }
}

export default function AdminDashboard() {
  const [overview, setOverview] = useState<AdminOverview | null>(null)
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get("/admin/overview")
        setOverview(data)
      } catch (err) {
        console.error("Failed to fetch admin overview", err)
      }
    })()
  }, [])
  return (
    <div className="space-y-6 fade-in-up">
      <h1 className="text-3xl font-bold slide-in-top">Admin Dashboard</h1>
      {overview ? (
        <div className="fade-in-up" style={{ animationDelay: "0.2s" }}>
          <ElectricBorder color="#5227FF" speed={1} chaos={1} thickness={2} style={{ borderRadius: 8 }}>
            <div className="p-4 grid grid-cols-2 gap-4">
              {[
                { label: "Total Users", value: overview.total_users || 0 },
                { label: "Active Subscriptions", value: overview.active_subscriptions || 0 },
                { label: "Monthly Revenue", value: `$${(overview.monthly_revenue || 0).toFixed(2)}` },
                { label: "OpenAI Costs", value: `$${(overview.openai_api_costs || 0).toFixed(2)}` },
                { label: "Total Letters", value: overview.total_letters_generated || 0 },
                { label: "Total Employees", value: overview.total_employees || 0 },
              ].map((stat, index) => (
                <div key={stat.label} className="stagger-fade-in hover-scale">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-semibold pulse-soft">{stat.value}</p>
                </div>
              ))}
              <div className="col-span-2 stagger-fade-in hover-scale">
                <p className="text-sm text-gray-600">Top Employee</p>
                <p className="text-xl font-semibold pulse-soft">
                  {overview.top_employee?.name || "N/A"} – {overview.top_employee?.signup_count || 0} signups
                </p>
              </div>
            </div>
          </ElectricBorder>
        </div>
      ) : (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      )}
    </div>
  )
}
