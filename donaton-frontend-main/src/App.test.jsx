import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// 1. "Vaciamos" las habitaciones más pesadas para que el robot no intente cargar mapas o APIs
vi.mock('./features/logistica/components/PanelControlGlobal', () => ({ default: () => <div>Panel Control Falso</div> }));
vi.mock('./features/usuarios/components/Login', () => ({ default: () => <div>Login Falso</div> }));
vi.mock('./features/usuarios/components/RegistroUsuario', () => ({ default: () => <div>Registro Falso</div> }));

// 2. Apagamos la seguridad temporalmente para que el robot pueda pasear por las rutas
vi.mock('./components/RoleRoute', () => ({ default: ({ children }) => <>{children}</> }));
vi.mock('./AuthContext', () => ({ AuthProvider: ({ children }) => <>{children}</> }));

// 3. Mockeamos el Header y el Sidebar específicamente para probar la función "toggleSidebar"
vi.mock('./components/Header', () => ({ default: () => <div>Header Falso</div> }));
vi.mock('./components/Sidebar', () => ({
    default: ({ isOpen, toggleSidebar }) => (
        <div data-testid="sidebar-mock" data-abierto={String(isOpen)}>
            <button data-testid="boton-menu" onClick={toggleSidebar}>Abrir/Cerrar Menú</button>
        </div>
    )
}));

describe('Pruebas del Cascarón Principal (App.jsx)', () => {

    it('1. Renderiza las rutas y permite abrir/cerrar el menú lateral (100% de cobertura)', () => {
        // Ponemos la App en la mesa de pruebas
        render(<App />);

        // Comprobamos que el panel principal cargó bien en la ruta "/"
        expect(screen.getByText('Panel Control Falso')).toBeInTheDocument();

        // Buscamos nuestro Sidebar de prueba
        const sidebar = screen.getByTestId('sidebar-mock');
        const botonMenu = screen.getByTestId('boton-menu');

        // Por defecto, el menú (isSidebarOpen) en tu código inicia en false
        expect(sidebar.getAttribute('data-abierto')).toBe('false');

        // El robot hace clic en el botón del menú
        act(() => {
            botonMenu.click();
        });

        // Verificamos que el estado cambió a true (¡Acabamos de probar toggleSidebar!)
        expect(sidebar.getAttribute('data-abierto')).toBe('true');

        // Hacemos clic de nuevo para cerrarlo
        act(() => {
            botonMenu.click();
        });

        // Verificamos que volvió a cerrarse (false)
        expect(sidebar.getAttribute('data-abierto')).toBe('false');
    });

});