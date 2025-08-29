"use client"

import { useEffect, useState } from "react"
import { api } from "../../../lib/api"
import CometCounter from "../../../components/CometCounter"
import ElectricBorder from "../../../components/ElectricBorder"

interface EmployeeDashboardData {
  referral_code: string
  total_signups: number
  signup_history: Array<{ user_id: string; signup_date: string; subscription_status: string }>
  weekly_stats: Array<{ week: string; signups: number }>
}

export default function EmployeeDashboard() {
  const [data, setData] = useState<EmployeeDashboardData | null>(null)
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get("/employee/dashboard")
        setData(data)
      } catch (err) {
        console.error("Failed to fetch employee dashboard", err)
      }
    })()
  }, [])
  return (
    <div className="space-y-6 fade-in-up">
      <h1 className="text-3xl font-bold slide-in-top">Employee Dashboard</h1>
      {data ? (
        <>
          <div className="flex items-center space-x-4 fade-in-left">
            <CometCounter count={data.total_signups} />
            <div className="fade-in-right">
              <p className="text-lg font-medium">Referral Code:</p>
              <p className="text-2xl font-semibold pulse-soft">{data.referral_code}</p>
            </div>
          </div>
          <div className="fade-in-up" style={{ animationDelay: "0.3s" }}>
            <ElectricBorder color="#5227FF" speed={1} chaos={1} thickness={2} style={{ borderRadius: 8 }}>
              <div className="p-4">
                <h2 className="font-semibold mb-2">Signup History</h2>
                <ul className="max-h-56 overflow-y-auto space-y-1">
                  {data.signup_history && data.signup_history.length > 0 ? (
                    data.signup_history.map((signup, index) => (
                      <li
                        key={signup.user_id}
                        className="text-sm stagger-fade-in hover-scale p-2 rounded hover:bg-gray-50 transition-colors"
                      >
                        {new Date(signup.signup_date).toLocaleDateString()} – {signup.subscription_status}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500 fade-in">No signup history available</li>
                  )}
                </ul>
              </div>
            </ElectricBorder>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      )}
    </div>
  )
}
