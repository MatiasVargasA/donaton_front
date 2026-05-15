import React from 'react';

export default function Header({ toggleSidebar }) {
  return (
    <header className="fixed-top bg-surface border-bottom px-3 px-md-4 d-flex align-items-center justify-content-between z-3" style={{ height: '64px', left: 'var(--header-left, 280px)', transition: 'left 0.3s ease' }}>
      <style>{`
        @media (max-width: 991.98px) {
          header { left: 0 !important; }
        }
      `}</style>
      
      <div className="d-flex align-items-center gap-2 gap-md-4">
        <button 
          className="btn d-lg-none p-1 text-on-surface-variant" 
          onClick={toggleSidebar}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        
        <span className="h5 fw-black text-secondary mb-0 d-none d-sm-block">Donaton Central</span>
        
        <nav className="d-none d-lg-flex gap-4 ms-2">
          <a className="small fw-semibold text-primary border-bottom border-primary border-2 pb-1 text-decoration-none" href="#">Global View</a>
          <a className="small fw-semibold text-on-surface-variant hover-text-primary text-decoration-none" href="#">Local Nodes</a>
          <a className="small fw-semibold text-on-surface-variant hover-text-primary text-decoration-none" href="#">Archives</a>
        </nav>
      </div>

      <div className="d-flex align-items-center gap-2 gap-md-3">
        <div className="position-relative d-none d-md-block" style={{ width: '240px' }}>
          <input 
            className="form-control form-control-sm bg-surface-container-low border-outline-variant rounded-pill px-3 py-1.5" 
            placeholder="Search resources..." 
            type="text"
          />
          <span className="material-symbols-outlined position-absolute end-0 top-50 translate-middle-y me-3 text-on-surface-variant small">search</span>
        </div>
        
        <button className="btn btn-danger btn-sm rounded-pill px-3 fw-bold d-none d-sm-block">
          Emergency Alert
        </button>
        
        <div className="d-flex gap-1">
          <button className="btn btn-icon rounded-circle text-on-surface-variant hover-bg-light p-2">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="btn btn-icon rounded-circle text-on-surface-variant hover-bg-light p-2">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
      
      <style>{`
        .hover-text-primary:hover { color: var(--primary) !important; }
        .hover-bg-light:hover { background-color: var(--surface-container-high); }
        .btn-icon { line-height: 1; }
      `}</style>
    </header>
  );
}
