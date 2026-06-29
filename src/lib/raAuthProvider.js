import { signIn, signOut, getSession } from 'next-auth/react'

export const authProvider = {
  login: async ({ username, password }) => {
    const res = await signIn('credentials', {
      email: username,
      password,
      redirect: false,
    })
    if (res?.error) {
      return Promise.reject(new Error('Identifiants invalides'))
    }
  },

  logout: async () => {
    await signOut({ redirect: false })
  },

  checkAuth: async () => {
    const session = await getSession()
    if (!session) {
      return Promise.reject(new Error('Non connecté'))
    }
  },

  checkError: async (error) => {
    if (error?.status === 401 || error?.status === 403) {
      return Promise.reject()
    }
  },

  getPermissions: async () => {
    const session = await getSession()
    return session ? 'admin' : 'guest'
  },
}
