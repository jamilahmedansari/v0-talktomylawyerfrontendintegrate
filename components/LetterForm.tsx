'use client';

import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import ProgressModal from './ProgressModal';

interface FormData {
  sender_name: string;
  sender_email: string;
  sender_address: string;
  recipient_name: string;
  recipient_address: string;
  county: string;
  state: string;
  issue_type: string;
  description: string;
  desired_outcome: string;
}

export default function LetterForm() {
  const [form, setForm] = useState<FormData>({
    sender_name: '',
    sender_email: '',
    sender_address: '',
    recipient_name: '',
    recipient_address: '',
    county: '',
    state: '',
    issue_type: '',
    description: '',
    desired_outcome: ''
  });
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<{ generated_text?: string; download_url?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);
    setMessage('Submitting request...');
    try {
      const { data } = await api.post('/letters/generate', {
        sender_details: {
          full_name: form.sender_name,
          address: form.sender_address,
          email: form.sender_email
        },
        recipient_details: {
          full_name: form.recipient_name,
          address: form.recipient_address,
          county: form.county,
          state: form.state
        },
        case_details: {
          issue_type: form.issue_type,
          description: form.description,
          desired_outcome: form.desired_outcome,
          key_dates: [],
          evidence: []
        }
      });
      setJobId(data.job_id);
    } catch (err) {
      console.error('Failed to submit letter request', err);
      setLoading(false);
    }
  };

  // Poll status
  useEffect(() => {
    if (!jobId) return;
    let intervalId: NodeJS.Timeout;
    const poll = async () => {
      try {
        const { data } = await api.get(`/letters/status/${jobId}`);
        setProgress(data.progress || 0);
        setMessage(data.message || 'Processing...');
        if (data.status === 'completed') {
          setResult({ generated_text: data.generated_text, download_url: data.download_url });
          setLoading(false);
          clearInterval(intervalId);
        }
      } catch (err) {
        console.error('Failed to poll status', err);
        setLoading(false);
        clearInterval(intervalId);
      }
    };
    poll();
    intervalId = setInterval(poll, 3000);
    return () => clearInterval(intervalId);
  }, [jobId]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Generate a New Letter</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Sender Name</label>
            <input type="text" name="sender_name" value={form.sender_name} onChange={handleChange} className="w-full border rounded-md p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Sender Email</label>
            <input type="email" name="sender_email" value={form.sender_email} onChange={handleChange} className="w-full border rounded-md p-2" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Sender Address</label>
            <input type="text" name="sender_address" value={form.sender_address} onChange={handleChange} className="w-full border rounded-md p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Recipient Name</label>
            <input type="text" name="recipient_name" value={form.recipient_name} onChange={handleChange} className="w-full border rounded-md p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Recipient Address</label>
            <input type="text" name="recipient_address" value={form.recipient_address} onChange={handleChange} className="w-full border rounded-md p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">County</label>
            <input type="text" name="county" value={form.county} onChange={handleChange} className="w-full border rounded-md p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input type="text" name="state" value={form.state} onChange={handleChange} className="w-full border rounded-md p-2" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Issue Type</label>
            <input type="text" name="issue_type" value={form.issue_type} onChange={handleChange} className="w-full border rounded-md p-2" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded-md p-2" rows={3} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Desired Outcome</label>
            <input type="text" name="desired_outcome" value={form.desired_outcome} onChange={handleChange} className="w-full border rounded-md p-2" required />
          </div>
        </div>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" disabled={loading}>
          {loading ? 'Submitting...' : 'Generate Letter'}
        </button>
      </form>
      {loading && <ProgressModal progress={progress} message={message} />}
      {result && (
        <div className="mt-6 p-4 border rounded-md bg-green-50">
          <h2 className="font-semibold mb-2">Letter Generated</h2>
          {result.generated_text && <pre className="text-sm whitespace-pre-wrap mb-2">{result.generated_text}</pre>}
          {result.download_url && (
            <a href={result.download_url} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Download PDF</a>
          )}
        </div>
      )}
    </div>
  );
}
