import React from 'react';

export default function Header() {
  return (
    <header className="d-flex justify-content-between align-items-center w-100 px-4 py-3 bg-white border-bottom">
      <div className="d-flex align-items-center gap-4">
        <span className="fs-5 fw-bold text-primary">Donaton Central</span>
        <nav className="d-none d-lg-flex gap-4">
          <a className="text-decoration-none text-primary fw-semibold border-bottom border-primary border-2 pb-1" href="#">Global View</a>
          <a className="text-decoration-none text-secondary" href="#">Local Nodes</a>
          <a className="text-decoration-none text-secondary" href="#">Archives</a>
        </nav>
      </div>
      <div className="d-flex align-items-center gap-3">
        <div className="position-relative d-none d-md-block">
          <input className="form-control rounded-pill ps-4" placeholder="Search resources..." type="text" style={{ width: '250px' }}/>
        </div>
        <button className="btn btn-danger rounded-pill fw-bold d-flex align-items-center gap-2">
          <span className="material-symbols-outlined fs-5">emergency_home</span>
          Emergency Alert
        </button>
        <button className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center text-secondary">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="rounded-circle overflow-hidden border" style={{ width: '32px', height: '32px' }}>
          <img alt="Administrator Avatar" className="w-100 h-100" style={{ objectFit: 'cover' }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7yrd1WfQLv8eqYYGfEtF9H30e7_pKAaXXC1DBfP8cUg3feYK3Iiu7FW6nyMT0ajrZr_rA_rnPEIcug-nkbrQ0ypCpca6lTYRa4qImc6hWjGsHF1chKxJnZZnsAsQmPDGLbg6-AfiFnZovQBuwjQBwbpXuaopNxIBwmYTx5SUDFBpHJ3WAjjti48KztL3114DHIgoWujo7-HVx_kC6mLsRVEP7UFb7t1IJB2-5sGi08jJuRH6n1kktulXZDP_nQOKY5AMx0pXd2zw"/>
        </div>
      </div>
    </header>
  );
}
