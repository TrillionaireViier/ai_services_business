import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Hammer, 
  HardHat, 
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3
} from 'lucide-react';

export default function App() {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Building2 size={28} color="#f59e0b" />
          Buildora
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#solutions">Solutions</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div>
          <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ 
            background: 'rgba(245, 158, 11, 0.1)', 
            color: '#f59e0b', 
            padding: '0.5rem 1rem', 
            borderRadius: '99px',
            fontWeight: 600,
            marginBottom: '1.5rem',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            🚀 Introducing Buildora 2.0
          </div>
          
          <h1>
            Construct the Future with <br />
            <span className="gradient-text">Unmatched Precision.</span>
          </h1>
          
          <p>
            The all-in-one construction management platform. Track progress, manage resources, and deliver projects on time with AI-powered insights.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Start Free Trial <ArrowRight size={18} />
            </button>
            <button className="btn-outline">
              Book a Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Interactive Mockup */}
      <section className="mockup-section">
        <motion.div 
          className="mockup-wrapper"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className="mockup-window">
            <div className="mockup-header">
              <div className="mockup-dot"></div>
              <div className="mockup-dot"></div>
              <div className="mockup-dot"></div>
            </div>
            <div className="mockup-body">
              <div className="mockup-sidebar">
                <div className="mockup-nav-item active"></div>
                <div className="mockup-nav-item"></div>
                <div className="mockup-nav-item"></div>
                <div className="mockup-nav-item"></div>
              </div>
              <div className="mockup-content">
                <div className="mockup-card-row">
                  <div className="mockup-card"></div>
                  <div className="mockup-card"></div>
                  <div className="mockup-card"></div>
                </div>
                <div className="mockup-chart"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="features">
        <motion.div 
          className="feature-card glass-panel"
          whileHover={{ y: -5 }}
        >
          <div className="feature-icon">
            <HardHat size={28} />
          </div>
          <h3>Project Safety</h3>
          <p>Enforce compliance protocols automatically. Our AI identifies potential hazards before they become incidents.</p>
        </motion.div>

        <motion.div 
          className="feature-card glass-panel"
          whileHover={{ y: -5 }}
        >
          <div className="feature-icon">
            <Zap size={28} />
          </div>
          <h3>Real-time Updates</h3>
          <p>Sync site data with the back office instantly. Stop waiting for end-of-day reports to make critical decisions.</p>
        </motion.div>

        <motion.div 
          className="feature-card glass-panel"
          whileHover={{ y: -5 }}
        >
          <div className="feature-icon">
            <BarChart3 size={28} />
          </div>
          <h3>Resource Tracking</h3>
          <p>Monitor materials, equipment, and labor costs in real-time to ensure you never exceed your baseline budget.</p>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '3rem', 
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)'
      }}>
        <p>&copy; 2026 Buildora Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
