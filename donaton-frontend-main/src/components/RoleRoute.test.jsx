import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RoleRoute from './RoleRoute';
import { useAuth } from '../AuthContext';

// 1. Le decimos al robot que controle el "useAuth" para simular distintos usuarios
vi.mock('../AuthContext', () => ({
    useAuth: vi.fn(),
}));

// 2. Disfrazamos el <Navigate> para que nos diga a dónde iba en vez de romper la prueba
vi.mock('react-router-dom', () => ({
    Navigate: ({ to }) => <div data-testid="redireccion">Redirigido a {to}</div>,
}));

describe('Pruebas del Guardia de Seguridad (RoleRoute)', () => {

    it('1. Si la app está cargando, debe mostrar el spinner', () => {
        // Simulamos que el useAuth dice "loading: true"
        useAuth.mockReturnValue({ loading: true, user: null });

        render(<RoleRoute><p>Contenido Oculto</p></RoleRoute>);

        // Verificamos que el spinner esté en pantalla
        expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });

    it('2. Si nadie ha iniciado sesión, lo echa al /login', () => {
        // Simulamos que no hay usuario
        useAuth.mockReturnValue({ loading: false, user: null });

        render(<RoleRoute><p>Contenido Oculto</p></RoleRoute>);

        expect(screen.getByTestId('redireccion').textContent).toBe('Redirigido a /login');
    });

    it('3. Si el usuario tiene el rol correcto, lo deja pasar y muestra el contenido', () => {
        // Simulamos un administrador
        useAuth.mockReturnValue({ loading: false, user: { rol: 'ADMIN' } });

        render(
            <RoleRoute allowedRoles={['ADMIN', 'LOGISTICA']}>
                <p>¡Bienvenido Jefe!</p>
            </RoleRoute>
        );

        expect(screen.getByText('¡Bienvenido Jefe!')).toBeInTheDocument();
    });

    it('4. Si un USUARIO (donante) intenta entrar a zona de admins, lo manda a su portal', () => {
        useAuth.mockReturnValue({ loading: false, user: { rol: 'USER' } });
        render(<RoleRoute allowedRoles={['ADMIN']}><p>Contenido Oculto</p></RoleRoute>);

        expect(screen.getByTestId('redireccion').textContent).toBe('Redirigido a /portal-donante');
    });

    it('5. Si alguien de LOGISTICA intenta entrar a zona de admins, lo manda a su dashboard', () => {
        useAuth.mockReturnValue({ loading: false, user: { rol: 'LOGISTICA' } });
        render(<RoleRoute allowedRoles={['ADMIN']}><p>Contenido Oculto</p></RoleRoute>);

        expect(screen.getByTestId('redireccion').textContent).toBe('Redirigido a /logistica');
    });

    it('6. Si alguien de MUNICIPALIDAD intenta entrar a zona de admins, lo manda a su panel', () => {
        useAuth.mockReturnValue({ loading: false, user: { rol: 'MUNICIPALIDAD' } });
        render(<RoleRoute allowedRoles={['ADMIN']}><p>Contenido Oculto</p></RoleRoute>);

        expect(screen.getByTestId('redireccion').textContent).toBe('Redirigido a /municipalidad');
    });

    it('7. Si un rol raro/desconocido intenta entrar a zona prohibida, lo manda al inicio (/)', () => {
        useAuth.mockReturnValue({ loading: false, user: { rol: 'INTRUSO' } });
        render(<RoleRoute allowedRoles={['ADMIN']}><p>Contenido Oculto</p></RoleRoute>);

        expect(screen.getByTestId('redireccion').textContent).toBe('Redirigido a /');
    });
});