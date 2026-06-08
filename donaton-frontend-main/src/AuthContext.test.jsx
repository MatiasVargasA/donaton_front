import { render, screen, act } from '@testing-library/react';
import { beforeEach, test, expect, vi } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';

// Creamos un componente "de mentiritas" (Lego de prueba) para poder usar el useAuth
const ComponenteDePrueba = () => {
    const { user, login, logout } = useAuth();

    return (
        <div>
            <span data-testid="estado-usuario">{user ? user.nombre : 'Sin usuario'}</span>
            <button onClick={() => login({ nombre: 'Juan' }, 'token-secreto')}>Entrar</button>
            <button onClick={logout}>Salir</button>
        </div>
    );
};

// Antes de cada prueba, limpiamos la memoria del navegador para empezar en blanco
beforeEach(() => {
    localStorage.clear();
});

test('1. Empieza sin usuario si la memoria está vacía', () => {
    render(
        <AuthProvider>
            <ComponenteDePrueba />
        </AuthProvider>
    );
    expect(screen.getByTestId('estado-usuario').textContent).toBe('Sin usuario');
});

test('2. La función login guarda al usuario y el token', () => {
    render(
        <AuthProvider>
            <ComponenteDePrueba />
        </AuthProvider>
    );

    // El robot hace clic en el botón de Entrar
    act(() => {
        screen.getByText('Entrar').click();
    });

    // Verificamos que el usuario cambió en pantalla
    expect(screen.getByTestId('estado-usuario').textContent).toBe('Juan');
    // Verificamos que se guardó en el localStorage
    expect(localStorage.getItem('donaton_token')).toBe('token-secreto');
    expect(localStorage.getItem('donaton_user')).toContain('Juan');
});

test('3. La función logout borra los datos de la memoria', () => {
    render(
        <AuthProvider>
            <ComponenteDePrueba />
        </AuthProvider>
    );

    // Entramos y luego Salimos
    act(() => {
        screen.getByText('Entrar').click();
        screen.getByText('Salir').click();
    });

    expect(screen.getByTestId('estado-usuario').textContent).toBe('Sin usuario');
    expect(localStorage.getItem('donaton_token')).toBeNull();
    expect(localStorage.getItem('donaton_user')).toBeNull();
});

test('4. Recupera al usuario si ya estaba guardado en localStorage', () => {
    // Pre-guardamos datos antes de renderizar
    localStorage.setItem('donaton_token', 'token-viejo');
    localStorage.setItem('donaton_user', JSON.stringify({ nombre: 'Maria' }));

    render(
        <AuthProvider>
            <ComponenteDePrueba />
        </AuthProvider>
    );

    expect(screen.getByTestId('estado-usuario').textContent).toBe('Maria');
});

test('5. No se rompe si los datos del localStorage están corruptos', () => {
    // Ocultamos el error de la consola temporalmente para que no ensucie la terminal
    const espiaConsola = vi.spyOn(console, 'error').mockImplementation(() => { });

    localStorage.setItem('donaton_token', 'token-viejo');
    localStorage.setItem('donaton_user', 'esto-no-es-un-json-valido {'); // Simulamos basura

    render(
        <AuthProvider>
            <ComponenteDePrueba />
        </AuthProvider>
    );

    expect(screen.getByTestId('estado-usuario').textContent).toBe('Sin usuario');
    expect(localStorage.getItem('donaton_token')).toBeNull(); // Debería haber limpiado la basura

    espiaConsola.mockRestore(); // Devolvemos la consola a la normalidad
});