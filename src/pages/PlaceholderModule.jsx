import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { Construction } from 'lucide-react';

const PlaceholderModule = ({ title }) => {
  const location = useLocation();
  const moduleName = title || location.pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'Module';

  return (
    <div className="main-content">
      <Header title={moduleName} />
      <div className="page-wrapper">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          minHeight: '60vh'
        }}>
          <div className="card" style={{ textAlign: 'center', maxWidth: 480, padding: '3rem 2.5rem' }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 'var(--radius-xl)',
              background: 'var(--color-primary-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-5)',
              color: 'var(--color-primary)'
            }}>
              <Construction size={28} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
              {moduleName}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-5)' }}>
              This module is currently being built. The database tables are ready and the PHP APIs are planned. The UI will be wired up shortly.
            </p>
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 14px',
              display: 'inline-block',
              fontSize: 12,
              color: 'var(--text-muted)',
              fontFamily: 'monospace'
            }}>
              {location.pathname}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderModule;
