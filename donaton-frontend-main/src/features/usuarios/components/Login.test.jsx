import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from './Login';
import api from '../../../api';
import { useAuth } from '../../../AuthContext';
import toast from 'react-hot-toast';

// 1. Simulamos (Mock) el enrutador
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    Link: ({ to, children }) => <a href={to} data-testid="enlace-registro">{children}</a>
}));

// 2. Simulamos el contexto de autenticación
const mockLogin = vi.fn();
vi.mock('../../../AuthContext', () => ({
    useAuth: () => ({ login: mockLogin })
}));

// 3. Simulamos nuestra API
vi.mock('../../../api', () => ({
    default: {
        post: vi.fn()
    }
}));

// 4. Simulamos las notificaciones emergentes (Toasts)
vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
        error: vi.fn()
    }
}));

describe('Pruebas de la pantalla de Login', () => {

    beforeEach(() => {
        // Limpiamos los espías antes de cada prueba
        vi.clearAllMocks();
    });

    it('1. Renderiza correctamente y permite escribir en los inputs', () => {
        render(<Login />);

        const inputEmail = screen.getByLabelText(/Correo Electrónico/i);
        const inputPassword = screen.getByLabelText(/Contraseña/i);

        // Escribimos en los inputs
        fireEvent.change(inputEmail, { target: { value: 'admin@donaton.org' } });
        fireEvent.change(inputPassword, { target: { value: 'secreto123' } });

        expect(inputEmail.value).toBe('admin@donaton.org');
        expect(inputPassword.value).toBe('secreto123');
    });

    it('2. Alterna la visibilidad de la contraseña al hacer clic en el ojito', () => {
        render(<Login />);

        const inputPassword = screen.getByLabelText(/Contraseña/i);
        // Buscamos el botón que tiene el ícono de "visibility"
        const botonOjito = screen.getByRole('button', { name: /visibility/i });

        // Por defecto debe ser password (oculto)
        expect(inputPassword.type).toBe('password');

        // Hacemos clic y debería cambiar a texto visible
        fireEvent.click(botonOjito);
        expect(inputPassword.type).toBe('text');

        // Hacemos clic de nuevo y debería volver a ocultarse
        fireEvent.click(botonOjito);
        expect(inputPassword.type).toBe('password');
    });

    it('3. Muestra una alerta si el usuario olvidó su contraseña', () => {
        // Espiamos la función "alert" del navegador para que no salga el cuadro real
        const espiaAlerta = vi.spyOn(window, 'alert').mockImplementation(() => { });

        render(<Login />);

        const enlaceOlvido = screen.getByText(/¿Olvidó su contraseña\?/i);
        fireEvent.click(enlaceOlvido);

        expect(espiaAlerta).toHaveBeenCalledWith('Enviando enlace de recuperación...');

        espiaAlerta.mockRestore(); // Devolvemos el alert a la normalidad
    });

    it('4. Muestra un error si las credenciales son incorrectas (API falla)', async () => {
        // Ocultamos el error de la consola temporalmente
        const espiaConsola = vi.spyOn(console, 'error').mockImplementation(() => { });

        // Le decimos a la API que devuelva un error
        api.post.mockRejectedValueOnce(new Error('No Autorizado'));

        render(<Login />);

        fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'malo@test.com' } });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123' } });

        await act(async () => {
            screen.getByRole('button', { name: /Acceder al Sistema/i }).click();
        });

        expect(toast.error).toHaveBeenCalledWith('Credenciales incorrectas. Intenta de nuevo.');

        espiaConsola.mockRestore();
    });

    // --- PRUEBAS DE ROLES Y REDIRECCIONES ---
    // Creamos una función de ayuda (helper) para no repetir código en cada rol
    const simularLoginExitoso = async (rolSimulado, urlEsperada) => {
        api.post.mockResolvedValueOnce({
            data: {
                token: 'token-valido',
                user: { nombre: 'Juan', correo: 'juan@test.com', rol: rolSimulado }
            }
        });

        render(<Login />);

        fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'juan@test.com' } });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '12345' } });

        await act(async () => {
            screen.getByRole('button', { name: /Acceder al Sistema/i }).click();
        });

        expect(mockLogin).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith(urlEsperada);
    };

    it('5. Inicia sesión como USUARIO y lo redirige al portal donante', async () => {
        await simularLoginExitoso('USUARIO', '/portal-donante');
    });

    it('6. Inicia sesión como LOGISTICA y lo redirige a logística', async () => {
        await simularLoginExitoso('LOGISTICA', '/logistica');
    });

    it('7. Inicia sesión como MUNICIPALIDAD y lo redirige a municipalidad', async () => {
        await simularLoginExitoso('MUNICIPALIDAD', '/municipalidad');
    });

    it('8. Inicia sesión como ADMIN (o rol desconocido) y lo redirige al inicio', async () => {
        await simularLoginExitoso('ADMIN', '/');
    });

});