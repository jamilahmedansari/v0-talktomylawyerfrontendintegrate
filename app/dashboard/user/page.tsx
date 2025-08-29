"use client"

import { useEffect, useState } from "react"
import { api } from "../../../lib/api"
import ElectricBorder from "../../../components/ElectricBorder"

export default function UserDashboard() {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const { data } = await api.get("/letters/history")
        setHistory(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Failed to fetch history", err)
        setError("Failed to load letter history")
        setHistory([])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="space-y-6 fade-in-up">
      <h1 className="text-3xl font-bold slide-in-top">User Dashboard</h1>
      <div className="fade-in-up" style={{ animationDelay: "0.2s" }}>
        <ElectricBorder color="#5227FF" speed={1.2} chaos={1} thickness={2} style={{ borderRadius: 12 }}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Letter History</h2>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
                <span className="ml-2">Loading your letter history...</span>
              </div>
            ) : error ? (
              <p className="text-red-600 fade-in">{error}</p>
            ) : history.length === 0 ? (
              <p className="fade-in">No letters generated yet.</p>
            ) : (
              <ul className="space-y-2">
                {history.map((item, index) => (
                  <li
                    key={item.job_id}
                    className="border rounded-md p-2 flex items-center justify-between stagger-fade-in hover-scale transition-all hover:shadow-md"
                  >
                    <div>
                      <p className="font-medium">{item.issue_type}</p>
                      <p className="text-sm text-gray-600">{new Date(item.created_at).toLocaleString()}</p>
                    </div>
                    {item.download_url && (
                      <a
                        href={item.download_url}
                        className="text-indigo-600 hover:underline animate-button"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ElectricBorder>
      </div>
    </div>
  )
}
