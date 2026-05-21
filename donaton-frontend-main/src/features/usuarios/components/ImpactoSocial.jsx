import React, { useEffect, useState } from 'react';

export default function ImpactoSocial() {
  const [stats, setStats] = useState({ lives: 0, meals: 0, kits: 0 });

  useEffect(() => {
    // Animation for counting up
    const targetStats = { lives: 1248, meals: 4820, kits: 312 };
    let currentStats = { lives: 0, meals: 0, kits: 0 };
    
    const interval = setInterval(() => {
      let done = true;
      const newStats = { ...currentStats };
      
      for (const key in targetStats) {
        if (currentStats[key] < targetStats[key]) {
          newStats[key] = Math.min(targetStats[key], currentStats[key] + Math.ceil(targetStats[key] / 50));
          done = false;
        }
      }
      
      currentStats = newStats;
      setStats(newStats);
      
      if (done) clearInterval(interval);
    }, 20);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-5">
          <div>
            <h2 className="display-6 fw-bold mb-1">Impacto Social</h2>
            <p className="text-secondary mb-0">Visualizando el cambio real que han logrado tus contribuciones.</p>
          </div>
          <button className="btn btn-primary rounded-pill px-4 py-3 d-flex align-items-center gap-2 shadow-sm fw-bold">
            <span className="material-symbols-outlined">file_download</span>
            Descargar Reporte Anual
          </button>
        </div>

        {/* Bento Grid - Impact Overview */}
        <div className="row g-4 mb-5">
          {/* Personal Impact Score */}
          <div className="col-lg-4">
            <div className="bg-white rounded-4 border p-4 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden h-100 shadow-sm">
              <h5 className="text-secondary fw-bold text-uppercase tracking-wider mb-4">Puntaje de Impacto</h5>
              <div className="position-relative d-flex align-items-center justify-content-center" style={{ width: '190px', height: '190px' }}>
                <svg className="w-100 h-100" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="95" cy="95" r="85" fill="transparent" stroke="#e9ecef" strokeWidth="12" />
                  <circle cx="95" cy="95" r="85" fill="transparent" stroke="#0d6efd" strokeWidth="12" strokeDasharray="534" strokeDashoffset="96" style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
                </svg>
                <div className="position-absolute d-flex flex-column align-items-center justify-content-center">
                  <span className="display-4 fw-bold text-primary mb-0">82</span>
                  <span className="small text-secondary fw-bold">Percentil</span>
                </div>
              </div>
              <p className="small text-secondary text-center mt-4 mb-0">Estás en el 18% superior de donantes. Tu consistencia marca una diferencia medible.</p>
            </div>
          </div>

          {/* Core Stats & Map */}
          <div className="col-lg-8">
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="bg-white border rounded-4 p-4 d-flex flex-column justify-content-between h-100 shadow-sm hover-shadow transition-all cursor-pointer">
                  <div className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center mb-3" style={{ width: '48px', height: '48px' }}>
                    <span className="material-symbols-outlined fs-4">groups</span>
                  </div>
                  <div>
                    <p className="small fw-bold text-secondary text-uppercase mb-1">Vidas Tocadas</p>
                    <p className="fs-3 fw-bold mb-3">{stats.lives.toLocaleString()}</p>
                    <div className="progress" style={{ height: '6px' }}>
                      <div className="progress-bar bg-primary" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-white border rounded-4 p-4 d-flex flex-column justify-content-between h-100 shadow-sm hover-shadow transition-all cursor-pointer">
                  <div className="rounded-circle bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center mb-3" style={{ width: '48px', height: '48px' }}>
                    <span className="material-symbols-outlined fs-4">restaurant</span>
                  </div>
                  <div>
                    <p className="small fw-bold text-secondary text-uppercase mb-1">Comidas Provistas</p>
                    <p className="fs-3 fw-bold mb-3">{stats.meals.toLocaleString()}</p>
                    <div className="progress" style={{ height: '6px' }}>
                      <div className="progress-bar bg-warning" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-white border rounded-4 p-4 d-flex flex-column justify-content-between h-100 shadow-sm hover-shadow transition-all cursor-pointer">
                  <div className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center mb-3" style={{ width: '48px', height: '48px' }}>
                    <span className="material-symbols-outlined fs-4">medical_services</span>
                  </div>
                  <div>
                    <p className="small fw-bold text-secondary text-uppercase mb-1">Kits Médicos</p>
                    <p className="fs-3 fw-bold mb-3">{stats.kits.toLocaleString()}</p>
                    <div className="progress" style={{ height: '6px' }}>
                      <div className="progress-bar bg-success" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Geographic Map Visualization */}
            <div className="bg-dark rounded-4 overflow-hidden position-relative shadow-sm" style={{ minHeight: '320px' }}>
              <div className="position-absolute top-0 start-0 m-4 z-2 bg-white p-3 rounded-3 shadow-sm border" style={{ opacity: 0.9 }}>
                <h6 className="fw-bold mb-1">Alcance Geográfico</h6>
                <p className="small text-secondary mb-0">Zonas de ayuda activas</p>
              </div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFcbKjLwem7abJqD0YDhv-SkM3j7oOay3DwdCW63Y_8QMz5p-PlNPGbvapA_uZpPP43CZCYpofXurBdJN8mtBxQfT_BzgHLOiNWI47YSYoOK6N4gHZC9BvWNdgXFlJC-tJS1GdPKy15a7E3lTyDfd15yaaaKXFaAztE4CN5zVRSitPD90ReCoD4A2uFqL_7oYs6vJbrCDUjrX7nxdBQIy4lql0xAjiea0u8acA50VjylTRjLn9QcKXqD1-GnPbc9lezKnPmh3mfo4" 
                alt="Map" 
                className="w-100 h-100 object-fit-cover opacity-75" 
                style={{ filter: 'grayscale(100%)' }} 
              />
              <div className="position-absolute top-50 start-50 translate-middle pointer-events-none">
                <div className="position-relative">
                  {/* Ping dots using Bootstrap utilities where possible, or inline styles */}
                  <div className="position-absolute bg-primary rounded-circle" style={{ width: '12px', height: '12px', top: '-50px', left: '-80px', boxShadow: '0 0 0 4px rgba(13,110,253,0.3)' }}></div>
                  <div className="position-absolute bg-warning rounded-circle" style={{ width: '12px', height: '12px', top: '40px', left: '160px', boxShadow: '0 0 0 4px rgba(255,193,7,0.3)' }}></div>
                  <div className="position-absolute bg-success rounded-circle" style={{ width: '12px', height: '12px', bottom: '-80px', left: '240px', boxShadow: '0 0 0 4px rgba(25,135,84,0.3)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stories & Achievements Section */}
        <div className="row g-4">
          {/* Impact Stories */}
          <div className="col-lg-8">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h3 className="fw-bold mb-0">Historias de Impacto</h3>
              <a href="#" className="text-primary fw-bold text-decoration-none d-flex align-items-center gap-1 hover-underline">
                Ver todas <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
              </a>
            </div>
            
            <div className="row g-4">
              <div className="col-md-6">
                <div className="bg-white border rounded-4 overflow-hidden shadow-sm h-100 cursor-pointer hover-shadow transition-all">
                  <div className="position-relative" style={{ height: '200px' }}>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDws50vKih2Uy7_EcjJFx7jL_cu-q3kOmMGJsMrr9brcXtZY7MMBP4AADvogst6XeladnW6mQXiITq5Vn6c49RIyjhjfZO8iWIUs4cMEqoOjlnM3LL9IpdbddY9EnLfyYEBye_wB2d_BE9M3qU7dnSZmXtPjngiV8UFrIEhlaxySDVqn7ucaG9uIGB7q7b3DufVp541VycQaF99FlHGgbIjIsKu6OgHC8N9H0Sl1kEAXPMkXaLpqcNSJOC6yBHe0wxE6SXDbrKgHVo" alt="Story" className="w-100 h-100 object-fit-cover" />
                    <span className="badge bg-success position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow-sm">EDUCACIÓN</span>
                  </div>
                  <div className="p-4 d-flex flex-column h-100">
                    <h5 className="fw-bold mb-2">Nuevo Centro Comunitario</h5>
                    <p className="small text-secondary mb-4 flex-grow-1">Tu donación financió el techo solar sostenible para esta instalación educativa que atiende a más de 200 estudiantes diarios.</p>
                    <div className="d-flex justify-content-between align-items-center pt-3 border-top small text-secondary">
                      <span>Actualizado hace 2 días</span>
                      <span className="d-flex align-items-center gap-1"><span className="material-symbols-outlined text-danger" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>favorite</span> 1.2k</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bg-white border rounded-4 overflow-hidden shadow-sm h-100 cursor-pointer hover-shadow transition-all">
                  <div className="position-relative" style={{ height: '200px' }}>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJnmiSyhyvwlYPrLXj2o4xJcAa8BTTCDMq1AW-jB64l-wkB3wTHo15TKF8V-Zf0FAeUX9DDmGjwnjMjfI1ZUJ4XBo3Tv7qXVcQglBjAvQKtJ8hMXwPPQCxbXx5eHFFbxKARBn5748R8DbzkIQ7ZBq_chCADfNp59-N-wcYbhE0dKjyTK-kbn9cPqiWmXhch92oAuHhMzF4K3nFrNiTYrmXtx65cF7m8Y1HnuoEj6wqypOHD_EKSEhn0BvG9xdbMrU6gABJVwRlB_I" alt="Story" className="w-100 h-100 object-fit-cover" />
                    <span className="badge bg-primary position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow-sm">SALUD</span>
                  </div>
                  <div className="p-4 d-flex flex-column h-100">
                    <h5 className="fw-bold mb-2">Éxito en Campaña de Vacunación</h5>
                    <p className="small text-secondary mb-4 flex-grow-1">Más de 500 kits médicos fueron desplegados a la clínica rural que apoyas, llegando a comunidades aisladas.</p>
                    <div className="d-flex justify-content-between align-items-center pt-3 border-top small text-secondary">
                      <span>Actualizado hace 1 semana</span>
                      <span className="d-flex align-items-center gap-1"><span className="material-symbols-outlined text-danger" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>favorite</span> 842</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="col-lg-4">
            <h3 className="fw-bold mb-4">Logros</h3>
            <div className="bg-white border rounded-4 p-4 shadow-sm">
              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle border border-warning border-2 text-warning d-flex align-items-center justify-content-center bg-warning bg-opacity-10" style={{ width: '56px', height: '56px', flexShrink: 0 }}>
                    <span className="material-symbols-outlined fs-3" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  </div>
                  <div className="flex-grow-1">
                    <p className="fw-bold mb-0">Primer Respondedor</p>
                    <p className="small text-secondary mb-2">Contribuyó en las primeras 24h de 3 crisis.</p>
                    <div className="progress" style={{ height: '6px' }}>
                      <div className="progress-bar bg-warning" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle border border-primary border-2 text-primary d-flex align-items-center justify-content-center bg-primary bg-opacity-10" style={{ width: '56px', height: '56px', flexShrink: 0 }}>
                    <span className="material-symbols-outlined fs-3" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                  <div className="flex-grow-1">
                    <p className="fw-bold mb-0">Héroe Regular</p>
                    <p className="small text-secondary mb-2">6 meses consecutivos de apoyo mensual.</p>
                    <div className="progress" style={{ height: '6px' }}>
                      <div className="progress-bar bg-primary" style={{ width: '66%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 opacity-50" style={{ filter: 'grayscale(100%)' }}>
                  <div className="rounded-circle border border-success border-2 text-success d-flex align-items-center justify-content-center bg-success bg-opacity-10 border-dashed" style={{ width: '56px', height: '56px', flexShrink: 0, borderStyle: 'dashed' }}>
                    <span className="material-symbols-outlined fs-3">public</span>
                  </div>
                  <div className="flex-grow-1">
                    <p className="fw-bold mb-0">Enviado Global</p>
                    <p className="small text-secondary mb-2">Apoya proyectos en 5 continentes distintos.</p>
                    <div className="progress" style={{ height: '6px' }}>
                      <div className="progress-bar bg-success" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-light border text-primary w-100 fw-bold mt-4 py-2 hover-bg-light transition-all">Ver Todas Las Insignias</button>
            </div>

            {/* Small Impact Summary Card */}
            <div className="mt-4 bg-primary p-4 rounded-4 text-white shadow-sm">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-warning">auto_awesome</span>
                <p className="fw-bold mb-0">Insight de Impacto</p>
              </div>
              <p className="small mb-3 text-white-50">Al cambiar a donaciones recurrentes, aumentaste tu eficiencia de impacto anual en un <span className="fw-bold text-white">14%</span> por reducción de gastos logísticos.</p>
              <div className="d-flex gap-2">
                <span className="badge bg-white bg-opacity-25 py-2 px-3 rounded-pill text-white">MÉTRICA DE EFICIENCIA</span>
                <span className="badge bg-white text-primary py-2 px-3 rounded-pill">+14.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hover-shadow:hover { box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; transform: translateY(-2px); }
        .cursor-pointer { cursor: pointer; }
        .hover-underline:hover { text-decoration: underline !important; }
      `}} />
    </div>
  );
}
