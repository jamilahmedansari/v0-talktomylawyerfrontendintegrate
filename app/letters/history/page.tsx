'use client';

import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import ElectricBorder from '../../../components/ElectricBorder';

export default function LetterHistory() {
  const [history, setHistory] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/letters/history');
        setHistory(data);
      } catch (err) {
        console.error('Failed to fetch history', err);
      }
    })();
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Letter History</h1>
      <ElectricBorder color="#5227FF" speed={1} chaos={1} thickness={2} style={{ borderRadius: 8 }}>
        <div className="p-4">
          {history.length === 0 ? (
            <p>No letters generated yet.</p>
          ) : (
            <ul className="space-y-2">
              {history.map((item) => (
                <li key={item.job_id} className="border rounded-md p-2 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.issue_type}</p>
                    <p className="text-sm text-gray-600">{new Date(item.created_at).toLocaleString()}</p>
                  </div>
                  {item.download_url && (
                    <a href={item.download_url} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
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
  );
}
