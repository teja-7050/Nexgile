import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import type { UserRole, ClientSummary, ClientDetail } from './types';
import { fetchClients, fetchClientDetail } from './services/api';
import { Landing } from './components/Landing';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { IndividualDashboard } from './components/IndividualDashboard';
import { AdvisorWorkstation } from './components/AdvisorWorkstation';
import { AlertTriangle, RefreshCw } from 'lucide-react';

function PortalWorkspace() {
  const [role, setRole] = useState<UserRole>('advisor');
  const [activeModule, setActiveModule] = useState<'A' | 'E'>('A');
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [selectedClientDetail, setSelectedClientDetail] = useState<ClientDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load clients on initial mount
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const clientList = await fetchClients();
        setClients(clientList);
        if (clientList.length > 0) {
          const detail = await fetchClientDetail(clientList[0].id);
          setSelectedClientDetail(detail);
        } else {
          setError('Unable to load client data — check that the server is running');
        }
      } catch (err) {
        console.error('Failed to load initial clients:', err);
        setError('Unable to load client data — check that the server is running');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Handle client switching
  const handleSelectClient = async (clientId: string) => {
    setIsLoading(true);
    try {
      const detail = await fetchClientDetail(clientId);
      setSelectedClientDetail(detail);
    } catch (err) {
      console.error(`Failed to select client ${clientId}:`, err);
      setError('Unable to load client data — check that the server is running');
    } finally {
      setIsLoading(false);
    }
  };

  // Sync active module when role changes
  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'individual') {
      setActiveModule('A');
    } else if (newRole === 'advisor') {
      setActiveModule('E');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <TopBar
        role={role}
        setRole={handleRoleChange}
        selectedClientName={selectedClientDetail?.name || 'Loading...'}
      />

      <div className="flex-1 flex flex-col md:flex-row" style={{ minHeight: 0, overflow: 'hidden' }}>
        <Sidebar
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          role={role}
        />

        <main className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-base)' }}>
          {error ? (
            <div className="p-10 text-center space-y-4 max-w-md mx-auto mt-12">
              <AlertTriangle size={32} style={{ color: 'var(--loss-text)', margin: '0 auto' }} />
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {error}
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                FastAPI backend service endpoint (http://localhost:8000/api) is currently unreachable.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  borderRadius: 3,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-raised)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)')}
              >
                <RefreshCw size={13} />
                Retry Connection
              </button>
            </div>
          ) : selectedClientDetail ? (
            activeModule === 'A' ? (
              <IndividualDashboard
                client={selectedClientDetail}
                allClients={clients as any}
                onSelectClient={handleSelectClient}
                isLoading={isLoading}
              />
            ) : (
              <AdvisorWorkstation
                clients={clients}
                selectedClient={selectedClientDetail}
                onSelectClient={handleSelectClient}
                isLoading={isLoading}
              />
            )
          ) : (
            <div className="p-10 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
              Loading portfolio data…
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function LandingWrapper() {
  const navigate = useNavigate();
  return <Landing onEnterPortal={() => navigate('/portal')} />;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingWrapper />} />
        <Route path="/portal" element={<PortalWorkspace />} />
        <Route path="/dashboard" element={<PortalWorkspace />} />
        <Route path="*" element={<LandingWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
