import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ImpactoSocial() {
  const [stats, setStats] = useState({ lives: 0, resources: 0, projects: 0 });

  useEffect(() => {
    // Animation for counting up when page mounts
    const targetStats = { lives: 1200000, resources: 15400000, projects: 45 };
    let currentStats = { lives: 0, resources: 0, projects: 0 };
    
    const interval = setInterval(() => {
      let done = true;
      const newStats = { ...currentStats };
      
      if (currentStats.lives < targetStats.lives) {
        newStats.lives = Math.min(targetStats.lives, currentStats.lives + 24000);
        done = false;
      }
      if (currentStats.resources < targetStats.resources) {
        newStats.resources = Math.min(targetStats.resources, currentStats.resources + 308000);
        done = false;
      }
      if (currentStats.projects < targetStats.projects) {
        newStats.projects = Math.min(targetStats.projects, currentStats.projects + 1);
        done = false;
      }
      
      currentStats = newStats;
      setStats(newStats);
      
      if (done) clearInterval(interval);
    }, 20);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        
        {/* Hero Section: Nuestro Impacto */}
        <section className="position-relative rounded-4 overflow-hidden mb-5 text-white" style={{ minHeight: '340px' }}>
          <div className="position-absolute w-100 h-100 top-0 start-0 z-0">
            <img 
              className="w-100 h-100 object-fit-cover" 
              alt="Humanitarian aid distribution center" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH83iGczQg1vJ2ctaluGVAeMPh-m0ECY9Tfob7A0G0_81AOmY3-X9uIpMCEw-gruFd3ndk4-dz3Nr7Ae2aNbRrF7mhoce9Our_Nv6PD3HCTME011ozoQS6OeO2FHH3dQ0JpG7kOPlVr-G612ygRRciUfyROmUBELth2qMl-AjYfoQyCN5SyhBPmfluhfY0u4N7CBR-hHQCgiNvU4u4vlMcTPTYBYhbPKWvI2m0bSLQAZsjhJBaemcVej1R9FGy9MnoZIvvsLAAtGE" 
            />
            {/* Dark primary blue overlay gradient */}
            <div 
              className="position-absolute w-100 h-100 top-0 start-0 z-0 opacity-85" 
              style={{ background: 'linear-gradient(90deg, #001a40 0%, rgba(0, 63, 135, 0.4) 100%)' }}
            ></div>
          </div>
          
          <div className="position-relative z-1 p-4 p-md-5 d-flex flex-column justify-content-center h-100" style={{ minHeight: '340px', maxWidth: '750px' }}>
            <span className="badge bg-warning bg-opacity-25 text-warning rounded-pill px-3 py-2 border border-warning border-opacity-50 align-self-start mb-3 fw-bold uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
              Resumen Global 2024
            </span>
            <h2 className="display-5 fw-bold text-white mb-3">Nuestro Impacto</h2>
            <p className="fs-5 text-white-50 mb-4 lh-lg">
              Gracias a tu generosidad, hemos logrado transformar realidades en las zonas más vulnerables. Cada donación se traduce en recursos tangibles y esperanza renovada para miles de personas.
            </p>
            
            <div className="d-flex flex-wrap gap-4 mt-2">
              <div>
                <h3 className="h2 fw-bold text-white mb-0">{(stats.lives / 1000000).toFixed(1)}M+</h3>
                <span className="small text-white-50 fw-semibold">Vidas Tocadas</span>
              </div>
              <div className="vr bg-white opacity-25 d-none d-sm-block" style={{ height: '45px' }}></div>
              <div>
                <h3 className="h2 fw-bold text-white mb-0">${(stats.resources / 1000000).toFixed(1)}M</h3>
                <span className="small text-white-50 fw-semibold">Recursos Distribuidos</span>
              </div>
              <div className="vr bg-white opacity-25 d-none d-sm-block" style={{ height: '45px' }}></div>
              <div>
                <h3 className="h2 fw-bold text-white mb-0">{stats.projects}</h3>
                <span className="small text-white-50 fw-semibold">Proyectos Activos</span>
              </div>
            </div>
          </div>
        </section>

        {/* KPIs Grid */}
        <div className="row g-4 mb-5">
          {/* Card 1: Alimento */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm p-4 bg-white rounded-4 h-100 transition-all hover-translate">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="p-3 bg-danger bg-opacity-10 rounded-3 text-danger d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <span className="material-symbols-outlined fs-4">restaurant</span>
                </div>
                <h6 className="fw-bold text-secondary mb-0">Alimento</h6>
              </div>
              <h3 className="h3 fw-bold text-dark mb-3">450,000 <span className="fs-6 text-secondary fw-normal">kg</span></h3>
              <div className="progress rounded-pill bg-light mb-2" style={{ height: '6px' }}>
                <div className="progress-bar bg-danger rounded-pill" role="progressbar" style={{ width: '85%' }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="text-secondary small fw-medium" style={{ fontSize: '0.75rem' }}>85% de la meta anual</span>
            </div>
          </div>

          {/* Card 2: Kits Medicos */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm p-4 bg-white rounded-4 h-100 transition-all hover-translate">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="p-3 bg-primary bg-opacity-10 rounded-3 text-primary d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <span className="material-symbols-outlined fs-4">medical_services</span>
                </div>
                <h6 className="fw-bold text-secondary mb-0">Kits Médicos</h6>
              </div>
              <h3 className="h3 fw-bold text-dark mb-3">12,840</h3>
              <div className="progress rounded-pill bg-light mb-2" style={{ height: '6px' }}>
                <div className="progress-bar bg-primary rounded-pill" role="progressbar" style={{ width: '62%' }} aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="text-secondary small fw-medium" style={{ fontSize: '0.75rem' }}>62% de la meta anual</span>
            </div>
          </div>

          {/* Card 3: Voluntarios */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm p-4 bg-white rounded-4 h-100 transition-all hover-translate">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="p-3 bg-success bg-opacity-10 rounded-3 text-success d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <span className="material-symbols-outlined fs-4">groups</span>
                </div>
                <h6 className="fw-bold text-secondary mb-0">Voluntarios</h6>
              </div>
              <h3 className="h3 fw-bold text-dark mb-3">3,500+</h3>
              <div className="progress rounded-pill bg-light mb-2" style={{ height: '6px' }}>
                <div className="progress-bar bg-success rounded-pill" role="progressbar" style={{ width: '92%' }} aria-valuenow="92" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="text-secondary small fw-medium" style={{ fontSize: '0.75rem' }}>92% de la meta anual</span>
            </div>
          </div>

          {/* Card 4: Agua Potable */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm p-4 bg-white rounded-4 h-100 transition-all hover-translate">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="p-3 bg-warning bg-opacity-10 rounded-3 text-warning-emphasis d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <span className="material-symbols-outlined fs-4">water_drop</span>
                </div>
                <h6 className="fw-bold text-secondary mb-0">Agua Potable</h6>
              </div>
              <h3 className="h3 fw-bold text-dark mb-3">8.2M <span className="fs-6 text-secondary fw-normal">L</span></h3>
              <div className="progress rounded-pill bg-light mb-2" style={{ height: '6px' }}>
                <div className="progress-bar bg-warning rounded-pill" role="progressbar" style={{ width: '78%' }} aria-valuenow="78" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="text-secondary small fw-medium" style={{ fontSize: '0.75rem' }}>78% de la meta anual</span>
            </div>
          </div>
        </div>

        {/* News and Map Grid (Asymmetric) */}
        <div className="row g-4 mb-5">
          {/* Novedades Feed */}
          <div className="col-12 col-lg-8">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h3 className="h4 fw-bold text-dark mb-0">Novedades</h3>
              <button onClick={() => toast.success('Mostrando todas las novedades')} className="btn btn-link text-primary fw-bold text-decoration-none d-flex align-items-center gap-1">
                Ver todo <span className="material-symbols-outlined fs-5">chevron_right</span>
              </button>
            </div>
            
            <div className="d-flex flex-column gap-4">
              {/* News Card 1 */}
              <div className="card border-0 shadow-sm p-3 bg-white rounded-4 transition-all hover-border-primary cursor-pointer">
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-md-4">
                    <div className="rounded-3 overflow-hidden" style={{ height: '140px' }}>
                      <img 
                        className="w-100 h-100 object-fit-cover" 
                        alt="Logistics worker in warehouse" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSOFbVmd5DHdg7v23kBby0bX4pCVOz7bmmfkqrWQoznpqDyRDw7ZriO2MBHJi-kKFjJgWaTi6BRRTS2b3yjdItmR3VERNuimSegOekws_61Kb7x2eoulta1Wq19_iLLqvIqTlxhHWNdfUoL2O8wX6pVqfv26UjVIDYJHtVgblzT6Q_tc-cyUI19jHzztoY1vlUz759HAbg3I7g2AnRZq7kxcoxid4iy_Kl00cmb9FFtCYlp2X0HBKJi8Qqco-2xS_zkxDiRg2VIw4" 
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-8">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-danger bg-opacity-10 text-danger rounded px-2 py-1 small fw-bold text-uppercase" style={{ fontSize: '0.65rem' }}>Emergencia</span>
                      <span className="text-secondary small">Hace 2 horas</span>
                    </div>
                    <h5 className="fw-bold text-dark mb-2">Respuesta rápida: Inundaciones en la Región Norte</h5>
                    <p className="text-secondary small mb-0 lh-base">
                      Hemos desplegado 3 unidades móviles con kits de higiene y alimentos para asistir a las 500 familias afectadas por las recientes lluvias.
                    </p>
                  </div>
                </div>
              </div>

              {/* News Card 2 */}
              <div className="card border-0 shadow-sm p-3 bg-white rounded-4 transition-all hover-border-primary cursor-pointer">
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-md-4">
                    <div className="rounded-3 overflow-hidden" style={{ height: '140px' }}>
                      <img 
                        className="w-100 h-100 object-fit-cover" 
                        alt="Water well in rural area" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlkNN6wk9eiEpkd06HUquZSd3gwOHG3Zue_O9rMK1ndzF0J6KEkSin5WNxtrLMMGl-gDpiaSfxQRmTMTcZsyINHh_QFvDWbxD2Yj0qRbF2GnsF8j-mvqorq4M11i2mjfWJQA8nuEP8uEEmdmJLEApxLcDZhlyHK_wjks4lYPiGDyOqi17J0Pp1CP_Ic-kuywEQJa9PaBrLBQBAFUzEDcwXgRI1nrQEU-FBFCsM6jLAu9CJeZYvXxBzG05cw3ooOG6h0W7J5PoU178" 
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-8">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-success bg-opacity-10 text-success rounded px-2 py-1 small fw-bold text-uppercase" style={{ fontSize: '0.65rem' }}>Hito</span>
                      <span className="text-secondary small">Ayer</span>
                    </div>
                    <h5 className="fw-bold text-dark mb-2">Inauguración del pozo de agua #24 en Chaco</h5>
                    <p className="text-secondary small mb-0 lh-base">
                      Después de 3 meses de trabajo, la comunidad de San Pedro finalmente cuenta con acceso directo a agua potable, beneficiando a 120 familias.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Map Container */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm p-4 bg-white rounded-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <h3 className="h5 fw-bold text-dark mb-1">Mapa de Impacto</h3>
                <p className="text-secondary small mb-4">Presencia activa en 12 regiones</p>
              </div>
              
              <div className="flex-grow-1 position-relative rounded-3 overflow-hidden border" style={{ minHeight: '220px' }}>
                <img 
                  className="w-100 h-100 object-fit-cover opacity-75" 
                  alt="Topographical map" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6Tu3705HVNBajG9u6J0voqiP4EKhaZGO7fzG0pAzyA8ZnmWTAadARq3CkLitiSDWLuI0_a9kFtQysRC8P4jNo_aSgyGygYHcK-JFmPhAC3_paE0yHQ2xfT6UzmQXMpiZc5z20etEX52IaPRw69Z2NOBfJvCievpJzHk_Ekw_bc2SqvrR2O9Ite6c8c7kkqKb5ub3MbVXEG1vvEW58mi0tyHq1rhBegho5C2SpGKxwohnV_8xIMuiioMwEDDoKk8ilc1Ac2MUkKLg" 
                />
                
                {/* Simulated hotspots */}
                <div className="position-absolute" style={{ top: '25%', left: '33%', width: '24px', height: '24px' }}>
                  <span className="position-absolute bg-primary rounded-circle animate-ping opacity-75" style={{ width: '16px', height: '16px' }}></span>
                  <span className="position-absolute bg-primary rounded-circle border border-white shadow-sm" style={{ width: '12px', height: '12px', top: '2px', left: '2px' }}></span>
                </div>
                
                <div className="position-absolute" style={{ bottom: '33%', right: '25%', width: '24px', height: '24px' }}>
                  <span className="position-absolute bg-primary rounded-circle animate-ping opacity-75" style={{ width: '16px', height: '16px' }}></span>
                  <span className="position-absolute bg-primary rounded-circle border border-white shadow-sm" style={{ width: '12px', height: '12px', top: '2px', left: '2px' }}></span>
                </div>
                
                {/* Floating legend */}
                <div className="position-absolute bottom-0 start-0 m-2 p-2 bg-white bg-opacity-90 rounded border shadow-sm" style={{ maxWidth: '180px' }}>
                  <div className="d-flex align-items-center gap-1.5 mb-0.5">
                    <span className="bg-primary rounded-circle" style={{ width: '6px', height: '6px' }}></span>
                    <span className="small text-secondary fw-bold text-uppercase" style={{ fontSize: '8px' }}>Zona Activa</span>
                  </div>
                  <p className="small text-dark fw-bold mb-0" style={{ fontSize: '10px' }}>Norte: 45 proyectos</p>
                </div>
              </div>

              <button onClick={() => toast.success('Abriendo mapa interactivo de proyectos')} className="btn btn-primary w-100 fw-bold mt-4 py-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2">
                <span className="material-symbols-outlined">map</span>
                Explorar Mapa
              </button>
            </div>
          </div>
        </div>

        {/* Historias de Exito Section */}
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="h4 fw-bold text-dark mb-1">Historias de Éxito</h3>
            <p className="text-secondary mb-0">El impacto real de tu ayuda a través de testimonios directos.</p>
          </div>
          
          <div className="d-flex gap-4 overflow-x-auto pb-3 custom-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
            {/* Story 1 */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden flex-shrink-0 cursor-pointer transition-all hover-translate" style={{ width: '360px', scrollSnapAlign: 'start' }}>
              <div style={{ height: '180px' }}>
                <img 
                  className="w-100 h-100 object-fit-cover" 
                  alt="Ramirez family" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDU2cKEVMiI6zu7jqehH42obmxjWwyHfVbchD1lN4cfzPE3pk0xttC593yqwMgsobAR7sug75s7ov35a0YfKFW9FaH0llXLsy6N-CAj1Svpkc4T4XbRv6QfBjOxfoewOU1b0hXFEO3VgQuViXl_ZiY4YhljfLzXTQueDgy3f6DBQf0rSwmyAXCdh3pnZvgVIHBeMfdB11bCyBJL_g9YMIIZOSB9LwnU6q5GccTxt_hASg4pBeh9HMwcjvX1WpM5iL4z3fPzUVaecI" 
                />
              </div>
              <div className="p-4 d-flex flex-column h-100 justify-content-between" style={{ minHeight: '220px' }}>
                <div>
                  <span className="text-danger small fw-bold text-uppercase tracking-widest block mb-2" style={{ fontSize: '0.65rem' }}>Comedor Comunitario</span>
                  <h5 className="fw-bold text-dark mb-3">La familia Ramírez y su cocina de esperanza</h5>
                  <p className="text-secondary small italic mb-0">
                    "Gracias al apoyo de Donaton, hoy servimos 200 platos diarios. No solo damos comida, damos un espacio de seguridad para los niños del barrio."
                  </p>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <div className="d-flex align-items-center gap-2">
                    <img alt="Juan Ramirez" className="rounded-circle object-fit-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb5cSxWJ8HzOh9qZCq7JW2rZ1dAkF0D9z6NUmeLlgyVtsahLpISj9C5r6dc7lBz9Uw8Xvm_waNxcQgVLzsMhAsB86x0PCN7HVl55TPlGy-3ubDIJLEAO0jojUE41j8I8CPtKv8ArXiD5lq19DFTOOvatYseApRUg8qSh6E8KCXAXWVyL-_lUMD5uBnNVSyFVdkwLz7ZCQT7aWxuYCeMwjYxLKPp5ioJv2FCwmshOtL4jZNctCbeb24Ff0zXpj8cImb4FmGjytrXUE" style={{ width: '32px', height: '32px' }} />
                    <span className="small fw-semibold text-dark">Juan Ramírez</span>
                  </div>
                  <button onClick={() => toast.success('Reproduciendo video testimonial')} className="btn btn-link text-primary p-0 d-flex align-items-center">
                    <span className="material-symbols-outlined fs-3">play_circle</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden flex-shrink-0 cursor-pointer transition-all hover-translate" style={{ width: '360px', scrollSnapAlign: 'start' }}>
              <div style={{ height: '180px' }}>
                <img 
                  className="w-100 h-100 object-fit-cover" 
                  alt="Classroom students" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8WrGrvLovCZJzmcwcVpZquT4yOl6KOp19vRdzgb9nL08fSxiZqIm6o5zn6HorInDQ8P364-2lmbPD7eaJLvYUxxd6dZ9ecoeShhDoWP1TqFoZmPXuOBunOeGQyzA5IzZ38czvfarrtz52P52JyHcJlEnpdkAmhAZBl7b8zNmjkw0v2vCZAnUGXpw60J1_5jlSPmP9tVY0ScZh9hU3eUkdckY6xF2EXwnLFOt5cUtsOYx3O0nGEZaIK2t1u8X6ksv2vPsUHTBqgp8" 
                />
              </div>
              <div className="p-4 d-flex flex-column h-100 justify-content-between" style={{ minHeight: '220px' }}>
                <div>
                  <span className="text-primary small fw-bold text-uppercase tracking-widest block mb-2" style={{ fontSize: '0.65rem' }}>Educación</span>
                  <h5 className="fw-bold text-dark mb-3">Becas Futuro: El sueño de Lucía</h5>
                  <p className="text-secondary small italic mb-0">
                    "Nunca pensé que podría estudiar ingeniería. El kit escolar y la beca mensual me permitieron enfocarme en mis estudios y no en la falta de recursos."
                  </p>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <div className="d-flex align-items-center gap-2">
                    <img alt="Lucia Fernandez" className="rounded-circle object-fit-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT0ObGx5efQCssYwu3jfRig9HVW7vGqAB6z3-DFpfpVm3T1qJLUy4KrHFww_zov5XaiKQzH274J0tT2Y9wFSvGISm4tFacKD472fafeRQG3OXde80VZDoAqFSDUCJrj_WxpXqQpsinen6RXqcv0pHK0IGGczFTo384eez_LmYNR0ErRC1QJ0s6mYQm_h88TgRjYiydz6WVJnBYfMdRjZ9z29HKB0KQjb3orMksBOvpoScdOrTLekjhI1oiLH-gC00-g10zYlUCTc0" style={{ width: '32px', height: '32px' }} />
                    <span className="small fw-semibold text-dark">Lucía Fernández</span>
                  </div>
                  <button onClick={() => toast.success('Reproduciendo video testimonial')} className="btn btn-link text-primary p-0 d-flex align-items-center">
                    <span className="material-symbols-outlined fs-3">play_circle</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden flex-shrink-0 cursor-pointer transition-all hover-translate" style={{ width: '360px', scrollSnapAlign: 'start' }}>
              <div style={{ height: '180px' }}>
                <img 
                  className="w-100 h-100 object-fit-cover" 
                  alt="Rural mobile clinic" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1k2oj02mvynPX71MDzfRFN1F19HEec0P6v5GK4wcE09kkUQJJYG7Wobw9lno1U0iLwaPIpcBkHaeK5CmVfUzZy0f10byzF4vFK92WbRPy3Vsxbk_LKInUZvAbCTKiUsyqA2OVFwpvWGO-EV1To9e7BccxGaThUOhkByeSWR6VgxnNEz9A28n_U3f5WKPHIMMzpi0VZruIkFRpkamawEdMyceV2JBjnSwJrw5GgBRlNtUoXUS6VwPZm5zyD9IsK9WN4boJWdsxrcM" 
                />
              </div>
              <div className="p-4 d-flex flex-column h-100 justify-content-between" style={{ minHeight: '220px' }}>
                <div>
                  <span className="text-success small fw-bold text-uppercase tracking-widest block mb-2" style={{ fontSize: '0.65rem' }}>Salud Rural</span>
                  <h5 className="fw-bold text-dark mb-3">Clínicas móviles: Salud a un paso</h5>
                  <p className="text-secondary small italic mb-0">
                    "Antes teníamos que viajar 5 horas para ver a un médico. Ahora la clínica viene al pueblo cada mes. Es un alivio inmenso para todos los abuelos."
                  </p>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <div className="d-flex align-items-center gap-2">
                    <img alt="Marta Diaz" className="rounded-circle object-fit-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJvAn3dGWh64AAhK0-KVADV7emuk_b_XID74E3T5k9wh2pTb9gDvim0rmxxlVCqE1iC0-T1XuuvKeG1BedLerB_Q6nzW-gf_Tw5C_1ibZNHPM2Ma3BiQKU_leI1omLIeJWMs_AOAXhTf-tJw2lNisVwWI8Gis8QPCZnPVTSukHbeRgi38-mpmOgC8JMvOmha8NxxNA8CbyQd97z6Hl_zi2KvTaBcu1FfjNgEgnoER4uYPXCScYW3Wu-d2hyX-vniTQHK-xsNoXMuM" style={{ width: '32px', height: '32px' }} />
                    <span className="small fw-semibold text-dark">Marta Díaz</span>
                  </div>
                  <button onClick={() => toast.success('Reproduciendo video testimonial')} className="btn btn-link text-primary p-0 d-flex align-items-center">
                    <span className="material-symbols-outlined fs-3">play_circle</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-translate { transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out; }
        .hover-translate:hover { transform: translateY(-4px); box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important; }
        .hover-border-primary { border: 1px solid transparent !important; transition: border-color 0.2s ease; }
        .hover-border-primary:hover { border-color: var(--bs-primary) !important; }
        .cursor-pointer { cursor: pointer; }
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}} />
    </div>
  );
}
