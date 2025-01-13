export const login = async ({ username, password }) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error('Login failed');

    const { token } = await response.json();

    // Zapisz token w LocalStorage
    localStorage.setItem('token', token);

    return true; // Logowanie udane
  } catch (err) {
    console.error('Login error:', err);
    return false; // Logowanie nieudane
  }
};
export const logout = () => {
  localStorage.removeItem('token');
};
