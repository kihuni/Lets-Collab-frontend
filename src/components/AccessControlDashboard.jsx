// src/components/AccessControlDashboard.jsx
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './AccessControlDashboard.module.css';

function AccessControlDashboard({ token }) {
  const [auditLogs, setAuditLogs] = useState([]);
  const [error, setError] = useState('');
  const [hasAccess, setHasAccess] = useState(true);

  const fetchAuditLogs = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/audit_logs/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuditLogs(response.data);
      setHasAccess(true);
    } catch (err) {
      // Line 20: 'err' was unused here
      if (err.response && err.response.status === 403) {
        setHasAccess(false);
        setError('You do not have permission to view audit logs.');
      } else {
        setError(`Failed to fetch audit logs: ${err.message}`); // Use err.message
      }
    }
  }, [token]);

  const fetchPermissions = useCallback(async () => {
    try {
      await axios.get('http://localhost:8000/api/permissions/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Permissions are currently hardcoded, endpoint call kept for future use
    } catch (err) {
      // Line 31: 'err' was unused here
      setError(`Failed to fetch permissions: ${err.message}`); // Use err.message
    }
  }, [token]);
  // Keeping this function for future use when permissions are implemented
  const _createPermission = async (role, resource, action) => {
    try {
      await axios.post(
        'http://localhost:8000/api/permissions/',
        { role, resource, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPermissions();
    } catch (err) {
      // Line 46: 'err' was unused here
      setError(`Failed to create permission: ${err.message}`); // Use err.message
    }
  };
  // Keeping this function for future use when permissions are implemented
  const _deletePermission = async (permissionId) => {
    try {
      await axios.delete(`http://localhost:8000/api/permissions/${permissionId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPermissions();
    } catch (err) {
      // Line 62: 'err' was unused here
      setError(`Failed to delete permission: ${err.message}`); // Use err.message
    }
  };

  useEffect(() => {
    fetchAuditLogs();
    // fetchPermissions(); // Uncomment if you add this functionality
  }, [fetchAuditLogs]);

  const permissions = [
    { role: 'admin', project: 'All', task: 'All', audit_logs: 'Read' },
    { role: 'member', project: 'Assigned', task: 'Edit Assigned', audit_logs: 'None' },
    { role: 'guest', project: 'None', task: 'Read (Time-bound)', audit_logs: 'None' },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Access Control Dashboard</h2>
      {error && <p className={styles.error}>{error}</p>}

      {/* Permission Table */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Permission Overview</h3>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeaderRow}>
              <th className={styles.tableHeader}>Role</th>
              <th className={styles.tableHeader}>Projects</th>
              <th className={styles.tableHeader}>Tasks</th>
              <th className={styles.tableHeader}>Audit Logs</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>{perm.role}</td>
                <td className={styles.tableCell}>{perm.project}</td>
                <td className={styles.tableCell}>{perm.task}</td>
                <td className={styles.tableCell}>{perm.audit_logs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Audit Logs */}
      {hasAccess ? (
        <div>
          <h3 className={styles.sectionTitle}>Audit Logs</h3>
          {auditLogs.length ? (
            <ul className={styles.list}>
              {auditLogs.map((log) => (
                <li key={log.id} className={styles.listItem}>
                  User {log.user} performed {log.action} on {log.resource} at{' '}
                  {new Date(log.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noItems}>No audit logs available.</p>
          )}
        </div>
      ) : (
        <p className={styles.noItems}>Audit logs are restricted to admins only.</p>
      )}
    </div>
  );
}

export default AccessControlDashboard;