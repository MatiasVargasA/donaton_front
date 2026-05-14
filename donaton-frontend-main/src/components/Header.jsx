import React from 'react';

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full px-margin-desktop h-16 bg-surface dark:bg-surface-dim border-b border-outline-variant">
      <div className="flex items-center gap-8">
        <span className="font-headline-sm text-headline-sm font-black text-secondary dark:text-secondary-fixed">Donaton Central</span>
        <nav className="hidden lg:flex gap-6">
          <a className="font-label-md text-label-md text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim pb-1" href="#">Global View</a>
          <a className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors" href="#">Local Nodes</a>
          <a className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors" href="#">Archives</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-primary w-64" placeholder="Search resources..." type="text"/>
        </div>
        <button className="bg-error text-on-error px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:opacity-90">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>emergency_home</span>
          Emergency Alert
        </button>
        <button className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
          <img alt="Administrator Avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7yrd1WfQLv8eqYYGfEtF9H30e7_pKAaXXC1DBfP8cUg3feYK3Iiu7FW6nyMT0ajrZr_rA_rnPEIcug-nkbrQ0ypCpca6lTYRa4qImc6hWjGsHF1chKxJnZZnsAsQmPDGLbg6-AfiFnZovQBuwjQBwbpXuaopNxIBwmYTx5SUDFBpHJ3WAjjti48KztL3114DHIgoWujo7-HVx_kC6mLsRVEP7UFb7t1IJB2-5sGi08jJuRH6n1kktulXZDP_nQOKY5AMx0pXd2zw"/>
        </div>
      </div>
    </header>
  );
}
