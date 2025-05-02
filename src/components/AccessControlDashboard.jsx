// src/components/AccessControlDashboard.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import  './AccessControlDashboard.module.css';

function AccessControlDashboard({ token }) {
  const [auditLogs, setAuditLogs] = useState([]);
  const [error, setError] = useState('');

  const fetchAuditLogs = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/audit_logs/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuditLogs(response.data);
    } catch {
      setError('Failed to fetch audit logs. Check permissions as of now.');
    }
  }, [token]); // Dependencies: token

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  // Mock permission data (since we don’t fetch this from Permit.io directly)
  const permissions = [
    { role: 'admin', project: 'All', task: 'All', audit_logs: 'Read' },
    { role: 'member', project: 'Assigned', task: 'Edit Assigned', audit_logs: 'None' },
    { role: 'guest', project: 'None', task: 'Read (Time-bound)', audit_logs: 'None' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Access Control Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Permission Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Permission Overview</h3>
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Projects</th>
              <th className="p-3 text-left">Tasks</th>
              <th className="p-3 text-left">Audit Logs</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{perm.role}</td>
                <td className="p-3">{perm.project}</td>
                <td className="p-3">{perm.task}</td>
                <td className="p-3">{perm.audit_logs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Audit Logs */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Audit Logs</h3>
        {auditLogs.length ? (
          <ul className="space-y-2">
            {auditLogs.map((log) => (
              <li key={log.id} className="bg-white p-4 rounded-lg shadow-md">
                User {log.user} performed {log.action} on {log.resource} at{' '}
                {new Date(log.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No audit logs available.</p>
        )}
      </div>
    </div>
  );
}

export default AccessControlDashboard;