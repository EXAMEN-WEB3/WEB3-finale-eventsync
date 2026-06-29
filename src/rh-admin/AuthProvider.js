
const USERS = [
  { username: "admin",   password: "admin123",  fullName: "Administrateur", role: "admin"   },
  { username: "rh",      password: "rh123",     fullName: "Responsable RH", role: "manager" },
  { username: "manager", password: "manager123",fullName: "Manager",        role: "manager" },
];

const AUTH_KEY = "rh_admin_auth";

export const authProvider = {
  // Connexion
  login: ({ username, password }) => {
    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      return Promise.reject(new Error("Identifiant ou mot de passe incorrect"));
    }
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return Promise.resolve();
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    return Promise.resolve();
  },

  // Vérification à chaque navigation
  checkAuth: () => {
    return localStorage.getItem(AUTH_KEY)
      ? Promise.resolve()
      : Promise.reject();
  },

  // Gestion des erreurs API (401/403)
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem(AUTH_KEY);
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Infos utilisateur (nom affiché dans l'AppBar)
  getIdentity: () => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return Promise.reject();
    const user = JSON.parse(stored);
    return Promise.resolve({
      id: user.username,
      fullName: user.fullName,
      avatar: undefined,
    });
  },

  // Permissions
  getPermissions: () => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return Promise.reject();
    const user = JSON.parse(stored);
    return Promise.resolve(user.role);
  },
};
