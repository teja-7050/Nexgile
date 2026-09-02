import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import ComponentsLab from './components/ComponentsLab';
import TaskBoard from './components/TaskBoard';
import DocsSection from './components/DocsSection';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nexgile-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nexgile-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {/* Background Orbs */}
      <div className="ambient-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="app-container">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className="main-content">
          {activeTab === 'overview' && (
            <>
              <Hero onExploreClick={() => setActiveTab('lab')} />
              <StatsSection />
              <TaskBoard />
            </>
          )}

          {activeTab === 'lab' && <ComponentsLab />}

          {activeTab === 'tasks' && <TaskBoard />}

          {activeTab === 'docs' && <DocsSection />}
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
