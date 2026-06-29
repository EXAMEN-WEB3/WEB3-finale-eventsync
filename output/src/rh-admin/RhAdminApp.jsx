/**
 * RhAdminApp.tsx
 * ──────────────
 * Composant React Admin monté dans Next.js via /rh-admin/[[...index]]/page.tsx.
 *
 * Différences avec employes-admin/src/App.tsx :
 *  1. Le dataProvider lit l'URL depuis une variable d'environnement Next.js
 *     (NEXT_PUBLIC_JSON_SERVER_URL) au lieu de import.meta.env.VITE_JSON_SERVER_URL.
 *  2. Le <Admin> reçoit basename="/rh-admin" pour que react-router construise
 *     les URLs internes à partir de ce préfixe (sinon il irait sur "/").
 *
 * Tout le reste — thème, ressources, layout, authProvider, loginPage, dashboard —
 * est identique à employes-admin et est importé depuis @/rh-admin/... (alias = src/).
 */

import { Admin, Resource } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import { createTheme } from '@mui/material/styles'

import { EmployeeList }  from './employees/EmployeeList'
import { EmployeeEdit }  from './employees/EmployeeEdit'
import { EmployeCreate } from './employees/EmpoyeeCreate'
import { EmployeeShow }  from './employees/EmployeeShow'
import { InternList }    from './Interns/InternList'
import { InternShow }    from './Interns/InternShow'
import { InternCreate }  from './Interns/InternCreate'
import { InternEdit }    from './Interns/InternEdit'
import { Dashboard }     from './Dashboard/Dashboard'
import { Layout }        from './Layout'
import { LoginPage }     from './LoginPage/LoginPage'
import { authProvider }  from './AuthProvider'

// ── DataProvider ──────────────────────────────────────────────────────────────
// Utilise NEXT_PUBLIC_JSON_SERVER_URL (variable d'env Next.js publique).
// Valeur par défaut : http://localhost:3000 (identique au projet employes-admin).
const dataProvider = jsonServerProvider(
  process.env.NEXT_PUBLIC_JSON_SERVER_URL ?? 'http://localhost:3000'
)

// ── Thème MUI ─────────────────────────────────────────────────────────────────
// Thème identique à employes-admin/src/App.tsx — aucune modification.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3A5F',
      light: '#2C5282',
      dark: '#152B47',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00897B',
      light: '#26A69A',
      dark: '#00695C',
      contrastText: '#ffffff',
    },
    background: {
      default: '#EEF2F7',
      paper: '#ffffff',
    },
    success: { main: '#2E7D32', light: '#43A047' },
    error:   { main: '#C62828' },
    text: {
      primary: '#0F1E30',
      secondary: '#64748B',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h4: { fontWeight: 800, letterSpacing: '-0.8px' },
    h5: { fontWeight: 700, letterSpacing: '-0.5px' },
    h6: { fontWeight: 700, letterSpacing: '-0.3px' },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 500 },
    body2: { lineHeight: 1.6 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 4px 14px rgba(0,0,0,0.04)',
          borderRadius: 14,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.86rem',
          letterSpacing: '0.01em',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)',
          boxShadow: '0 2px 10px rgba(30,58,95,0.28)',
          '&:hover': {
            background: 'linear-gradient(135deg, #152B47 0%, #1E3A5F 100%)',
            boxShadow: '0 4px 14px rgba(30,58,95,0.38)',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': { backgroundColor: '#F6F9FC !important' },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#F0F4F9',
            fontWeight: 700,
            color: '#334155',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 7,
          fontWeight: 600,
          fontSize: '0.74rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': { borderRadius: 9 },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
})

// ── Composant principal ───────────────────────────────────────────────────────
const RhAdminApp = () => (
  <Admin
    basename="/rh-admin"        // ← clé : préfixe de toutes les URLs react-router
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    dashboard={Dashboard}
    layout={Layout}
    theme={theme}
    requireAuth
  >
    <Resource
      name="employees"
      list={EmployeeList}
      create={EmployeCreate}
      edit={EmployeeEdit}
      show={EmployeeShow}
    />
    <Resource
      name="interns"
      list={InternList}
      show={InternShow}
      create={InternCreate}
      edit={InternEdit}
    />
  </Admin>
)

export default RhAdminApp
