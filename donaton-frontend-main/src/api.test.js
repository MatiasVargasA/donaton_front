import { describe, it, expect, beforeEach } from 'vitest';
import apiAuth, { apiDonaciones, apiNecesidades, apiLogistica } from './api';

describe('Pruebas del mensajero (api.js)', () => {

    // Guardamos la función original de redirección para no romper JSDOM
    const originalWindowLocation = window.location;

    beforeEach(() => {
        // 1. Limpiamos la memoria antes de cada prueba
        localStorage.clear();

        // 2. Preparamos un "navegador falso" para poder probar la redirección
        delete window.location;
        window.location = { href: '' };
    });

    it('1. Debe tener las direcciones (URLs) correctas para cada microservicio', () => {
        expect(apiDonaciones.defaults.baseURL).toBe('http://localhost:8080');
        expect(apiNecesidades.defaults.baseURL).toBe('http://localhost:8081');
        expect(apiLogistica.defaults.baseURL).toBe('http://localhost:8082');
    });

    it('2. Interceptor de Request: Debe meter el token en la mochila si el usuario está logueado', async () => {
        localStorage.setItem('donaton_token', 'token-super-secreto');

        // Sacamos al robot inspector que revisa el viaje de ida
        const inspectorDeIda = apiAuth.interceptors.request.handlers[0].fulfilled;
        const configuracionVacia = { headers: {} };

        const resultado = await inspectorDeIda(configuracionVacia);

        expect(resultado.headers.Authorization).toBe('Bearer token-super-secreto');
    });

    it('3. Interceptor de Request: No debe meter nada si no hay token', async () => {
        const inspectorDeIda = apiAuth.interceptors.request.handlers[0].fulfilled;
        const configuracionVacia = { headers: {} };

        const resultado = await inspectorDeIda(configuracionVacia);

        expect(resultado.headers.Authorization).toBeUndefined();
    });

    it('4. Interceptor de Response: Si da error 401 y NO es en el login, debe borrar todo y redirigir', async () => {
        localStorage.setItem('donaton_token', 'token-vencido');
        localStorage.setItem('donaton_user', 'Juan');

        // Sacamos al robot inspector que revisa el viaje de vuelta (los errores)
        const inspectorDeErrores = apiAuth.interceptors.response.handlers[0].rejected;

        const errorFalso = {
            response: { status: 401 },
            config: { url: '/alguna-ruta-protegida' }
        };

        // Verificamos que el error se mantenga pero que haga la limpieza
        await expect(inspectorDeErrores(errorFalso)).rejects.toBe(errorFalso);

        expect(localStorage.getItem('donaton_token')).toBeNull();
        expect(localStorage.getItem('donaton_user')).toBeNull();
        expect(window.location.href).toBe('/login');
    });

    it('5. Interceptor de Response: No debe borrar nada si el error 401 viene de intentar iniciar sesión', async () => {
        localStorage.setItem('donaton_token', 'token-vencido');

        const inspectorDeErrores = apiAuth.interceptors.response.handlers[0].rejected;

        const errorFalso = {
            response: { status: 401 },
            config: { url: '/auth/login' } // El usuario simplemente se equivocó de contraseña
        };

        await expect(inspectorDeErrores(errorFalso)).rejects.toBe(errorFalso);

        // Como fue un error de credenciales malas, no debe haber redirigido a la fuerza
        expect(window.location.href).not.toBe('/login');
    });
});