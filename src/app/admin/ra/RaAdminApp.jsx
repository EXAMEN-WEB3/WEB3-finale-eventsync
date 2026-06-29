'use client'

import { useMemo, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import {
  Admin,
  Resource,
  Layout,
  List,
  Edit,
  Create,
  Show,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  TextInput,
  DateInput,
  NumberInput,
  SimpleForm,
  ShowButton,
  EditButton,
  DeleteButton,
  ReferenceInput,
  SelectInput,
  ArrayField,
  SingleFieldList,
  ChipField,
  SimpleShowLayout,
  RichTextField,
  Labeled,
} from 'react-admin'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@/context/ThemeContext'
import { dataProvider } from '@/lib/raDataProvider'
import { authProvider } from '@/lib/raAuthProvider'

function CustomAppBar() {
  return null
}

function EmptyChrome() {
  return null
}

const CustomLayout = (props) => (
  <Layout
    {...props}
    appBar={CustomAppBar}
  />
)

function validateDateRange(startKey, endKey) {
  return (values) => {
    const errors = {}
    const startDate = values?.[startKey] ? new Date(values[startKey]) : null
    const endDate = values?.[endKey] ? new Date(values[endKey]) : null

    if (startDate && endDate && endDate <= startDate) {
      errors[endKey] = 'La date de fin doit être supérieure à la date de début sélectionnée'
    }

    return errors
  }
}

const validateEventDates = validateDateRange('startDate', 'endDate')
const validateSessionDates = validateDateRange('startTime', 'endTime')

const EventList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="title" />
      <TextField source="location" />
      <DateField source="startDate" locales="fr-FR" showTime />
      <DateField source="endDate" locales="fr-FR" showTime />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
)

const EventEdit = () => (
  <Edit>
    <SimpleForm validate={validateEventDates}>
      <TextInput source="title" required />
      <TextInput source="description" multiline />
      <DateInput source="startDate" />
      <DateInput source="endDate" />
      <TextInput source="location" required />
    </SimpleForm>
  </Edit>
)

const EventCreate = () => (
  <Create>
    <SimpleForm validate={validateEventDates}>
      <TextInput source="title" required />
      <TextInput source="description" multiline />
      <DateInput source="startDate" required />
      <DateInput source="endDate" required />
      <TextInput source="location" required />
    </SimpleForm>
  </Create>
)

const EventShow = () => (
  <Show>
    <SimpleShowLayout className="admin-show-layout">
      <Box className="admin-show-hero">
        <Typography className="admin-show-eyebrow">Événement</Typography>
        <Typography className="admin-show-title">
          <TextField source="title" />
        </Typography>
      </Box>

      <Box className="admin-show-grid">
        <Box className="admin-show-panel admin-show-panel-wide">
          <Labeled label="Description">
            <RichTextField source="description" />
          </Labeled>
        </Box>

        <Stack className="admin-show-panel" spacing={2.5}>
          <Labeled label="Début">
            <DateField source="startDate" locales="fr-FR" showTime />
          </Labeled>
          <Labeled label="Fin">
            <DateField source="endDate" locales="fr-FR" showTime />
          </Labeled>
          <Labeled label="Lieu">
            <TextField source="location" />
          </Labeled>
        </Stack>

        <Box className="admin-show-panel admin-show-panel-wide">
          <Labeled label="Sessions liées">
            <ArrayField source="sessions">
              <SingleFieldList>
                <ChipField source="title" />
              </SingleFieldList>
            </ArrayField>
          </Labeled>
        </Box>
      </Box>
    </SimpleShowLayout>
  </Show>
)

const SessionList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="title" />
      <TextField source="room" />
      <TextField source="event.title" label="Événement" />
      <DateField source="startTime" locales="fr-FR" showTime />
      <DateField source="endTime" locales="fr-FR" showTime />
      <NumberField source="capacity" emptyText="-" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
)

const SessionEdit = () => (
  <Edit>
    <SimpleForm validate={validateSessionDates}>
      <TextInput source="title" required />
      <TextInput source="description" multiline />
      <DateInput source="startTime" required />
      <DateInput source="endTime" required />
      <TextInput source="room" required />
      <NumberInput source="capacity" />
      <ReferenceInput source="eventId" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

const SessionCreate = () => (
  <Create>
    <SimpleForm validate={validateSessionDates}>
      <TextInput source="title" required />
      <TextInput source="description" multiline />
      <DateInput source="startTime" required />
      <DateInput source="endTime" required />
      <TextInput source="room" required />
      <NumberInput source="capacity" />
      <ReferenceInput source="eventId" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)

const SessionShow = () => (
  <Show>
    <SimpleShowLayout className="admin-show-layout">
      <Box className="admin-show-hero">
        <Typography className="admin-show-eyebrow">Session</Typography>
        <Typography className="admin-show-title">
          <TextField source="title" />
        </Typography>
      </Box>

      <Box className="admin-show-grid">
        <Box className="admin-show-panel admin-show-panel-wide">
          <Labeled label="Description">
            <RichTextField source="description" />
          </Labeled>
        </Box>

        <Stack className="admin-show-panel" spacing={2.5}>
          <Labeled label="Début">
            <DateField source="startTime" locales="fr-FR" showTime />
          </Labeled>
          <Labeled label="Fin">
            <DateField source="endTime" locales="fr-FR" showTime />
          </Labeled>
          <Labeled label="Salle">
            <TextField source="room" />
          </Labeled>
          <Labeled label="Capacité">
            <NumberField source="capacity" emptyText="Non défini" />
          </Labeled>
          <Labeled label="Événement">
            <TextField source="event.title" />
          </Labeled>
        </Stack>

        <Box className="admin-show-panel admin-show-panel-wide">
          <Labeled label="Intervenants">
            <ArrayField source="speakers">
              <SingleFieldList>
                <ChipField source="name" />
              </SingleFieldList>
            </ArrayField>
          </Labeled>
        </Box>
      </Box>
    </SimpleShowLayout>
  </Show>
)

const SpeakerList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="bio" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
)

const SpeakerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" required />
      <TextInput source="bio" multiline />
      <TextInput source="photoUrl" label="Photo URL" />
    </SimpleForm>
  </Edit>
)

const SpeakerCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" required />
      <TextInput source="bio" multiline />
      <TextInput source="photoUrl" label="Photo URL" />
    </SimpleForm>
  </Create>
)

const SpeakerShow = () => (
  <Show>
    <SimpleShowLayout className="admin-show-layout">
      <Box className="admin-show-hero">
        <Typography className="admin-show-eyebrow">Intervenant</Typography>
        <Typography className="admin-show-title">
          <TextField source="name" />
        </Typography>
      </Box>

      <Box className="admin-show-grid">
        <Box className="admin-show-panel admin-show-panel-wide">
          <Labeled label="Bio">
            <RichTextField source="bio" />
          </Labeled>
        </Box>

        <Box className="admin-show-panel">
          <Labeled label="Photo URL">
            <TextField source="photoUrl" />
          </Labeled>
        </Box>
      </Box>
    </SimpleShowLayout>
  </Show>
)

export default function RaAdminApp() {
  const { isDark } = useTheme()

  const bg = isDark ? '#0A1020' : '#F7F9FC'

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    const origRootDataTheme = root.getAttribute('data-theme')
    const origBodyStyle = body.getAttribute('style')
    const origRootStyle = root.getAttribute('style')

    root.setAttribute('data-theme', isDark ? 'dark' : 'light')
    body.style.setProperty('background', bg, 'important')
    body.style.setProperty('background-image', 'none', 'important')
    body.style.setProperty('color', isDark ? '#F1F5F9' : '#0F172A', 'important')

    return () => {
      if (origRootDataTheme) root.setAttribute('data-theme', origRootDataTheme)
      if (origRootStyle) root.setAttribute('style', origRootStyle)
      else root.removeAttribute('style')
      if (origBodyStyle) body.setAttribute('style', origBodyStyle)
      else body.removeAttribute('style')
    }
  }, [isDark, bg])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? 'dark' : 'light',
          ...(isDark
            ? {
                primary: { main: '#0EA5E9', light: '#38BDF8', dark: '#0284C7' },
                secondary: { main: '#A78BFA', light: '#C4B5FD', dark: '#7C3AED' },
                success: { main: '#22C55E' },
                warning: { main: '#F59E0B' },
                error: { main: '#EF4444' },
                background: { default: '#0A1020', paper: '#111A2E' },
                text: { primary: '#F1F5F9', secondary: '#94A3B8' },
                divider: 'rgba(148,163,184,0.15)',
              }
            : {
                primary: { main: '#2563EB', light: '#3B82F6', dark: '#1D4ED8' },
                secondary: { main: '#7C3AED', light: '#8B5CF6', dark: '#6D28D9' },
                success: { main: '#16A34A' },
                warning: { main: '#D97706' },
                error: { main: '#DC2626' },
                background: { default: '#F7F9FC', paper: '#FFFFFF' },
                text: { primary: '#0F172A', secondary: '#475569' },
                divider: 'rgba(0,0,0,0.1)',
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
          h4: { fontWeight: 700 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
        },
        shape: { borderRadius: 10 },
        components: {
          MuiTextField: {
            defaultProps: {
              slotProps: { input: { notched: undefined } },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: isDark
                  ? '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)'
                  : '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                border: '0 !important',
                boxShadow: isDark
                  ? '0 22px 60px rgba(2,6,23,0.35)'
                  : '0 22px 60px rgba(15,23,42,0.08)',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                borderRight: `1px solid ${isDark ? 'rgba(148,163,184,0.15)' : 'rgba(0,0,0,0.1)'}`,
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                display: 'none',
                backgroundColor: isDark ? '#101827' : '#FFFFFF',
                color: isDark ? '#F1F5F9' : '#0F172A',
                boxShadow: isDark
                  ? '0 1px 3px rgba(0,0,0,0.4)'
                  : '0 1px 3px rgba(0,0,0,0.08)',
              },
            },
          },
          MuiToolbar: {
            styleOverrides: {
              root: {
                backgroundColor: isDark ? '#101827' : '#FFFFFF',
                color: isDark ? '#F1F5F9' : '#0F172A',
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                borderBottom: `1px solid ${isDark ? 'rgba(148,163,184,0.08)' : 'rgba(15,23,42,0.06)'}`,
                color: isDark ? '#F1F5F9' : '#0F172A',
                paddingTop: 18,
                paddingBottom: 18,
              },
              head: {
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: 0,
                backgroundColor: 'transparent',
                color: isDark ? '#94A3B8' : '#64748B',
              },
            },
          },
          MuiTableHead: {
            styleOverrides: {
              root: {
                '& .MuiTableRow-root': {
                  backgroundColor: 'transparent',
                },
              },
            },
          },
          MuiTableRow: {
            styleOverrides: {
              root: {
                '&:hover': {
                  backgroundColor: isDark
                    ? 'rgba(125,211,199,0.06)'
                    : 'rgba(15,118,110,0.05)',
                },
                '&.Mui-selected': {
                  backgroundColor: isDark
                    ? 'rgba(14,165,233,0.12)'
                    : 'rgba(37,99,235,0.08)',
                },
              },
            },
          },
          MuiTableSortLabel: {
            styleOverrides: {
              root: {
                color: isDark ? '#94A3B8' : '#64748B',
                '&.Mui-active': {
                  color: isDark ? '#38BDF8' : '#2563EB',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 999,
                paddingLeft: 14,
                paddingRight: 14,
              },
              contained: {
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none' },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                backgroundColor: isDark ? 'rgba(148,163,184,0.1)' : 'rgba(0,0,0,0.06)',
                color: isDark ? '#E2E8F0' : '#334155',
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                backgroundColor: isDark ? 'rgba(15,23,42,0.6)' : '#FFFFFF',
                color: isDark ? '#F1F5F9' : '#0F172A',
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              notchedOutline: {
                borderColor: isDark ? 'rgba(148,163,184,0.25)' : 'rgba(0,0,0,0.15)',
              },
              root: {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDark ? 'rgba(148,163,184,0.4)' : 'rgba(0,0,0,0.25)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDark ? '#38BDF8' : '#2563EB',
                },
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: isDark ? '#94A3B8' : '#64748B',
                '&.Mui-focused': {
                  color: isDark ? '#38BDF8' : '#2563EB',
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              icon: {
                color: isDark ? '#94A3B8' : '#64748B',
              },
            },
          },
          MuiMenu: {
            styleOverrides: {
              paper: {
                backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                boxShadow: isDark
                  ? '0 4px 20px rgba(0,0,0,0.5)'
                  : '0 4px 20px rgba(0,0,0,0.1)',
              },
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                color: isDark ? '#F1F5F9' : '#0F172A',
                '&:hover': {
                  backgroundColor: isDark
                    ? 'rgba(148,163,184,0.1)'
                    : 'rgba(0,0,0,0.04)',
                },
              },
            },
          },
          MuiList: {
            styleOverrides: {
              root: {
                backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
              },
            },
          },
          MuiListItemIcon: {
            styleOverrides: {
              root: {
                color: isDark ? '#94A3B8' : '#64748B',
                minWidth: 40,
              },
            },
          },
          MuiListItemText: {
            styleOverrides: {
              primary: {
                color: isDark ? '#F1F5F9' : '#0F172A',
                fontWeight: 500,
              },
              secondary: {
                color: isDark ? '#94A3B8' : '#64748B',
              },
            },
          },
          MuiBreadcrumbs: {
            styleOverrides: {
              li: {
                color: isDark ? '#94A3B8' : '#64748B',
              },
            },
          },
          MuiTabs: {
            styleOverrides: {
              indicator: {
                backgroundColor: isDark ? '#38BDF8' : '#2563EB',
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                color: isDark ? '#94A3B8' : '#64748B',
                '&.Mui-selected': {
                  color: isDark ? '#38BDF8' : '#2563EB',
                },
              },
            },
          },
          MuiAlert: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
              standardSuccess: {
                backgroundColor: isDark ? 'rgba(34,197,94,0.12)' : 'rgba(22,163,74,0.08)',
                color: isDark ? '#86EFAC' : '#166534',
              },
              standardError: {
                backgroundColor: isDark ? 'rgba(239,68,68,0.12)' : 'rgba(220,38,38,0.08)',
                color: isDark ? '#FCA5A5' : '#991B1B',
              },
              standardWarning: {
                backgroundColor: isDark ? 'rgba(245,158,11,0.12)' : 'rgba(217,119,6,0.08)',
                color: isDark ? '#FCD34D' : '#92400E',
              },
              standardInfo: {
                backgroundColor: isDark ? 'rgba(14,165,233,0.12)' : 'rgba(37,99,235,0.08)',
                color: isDark ? '#7DD3FC' : '#1E40AF',
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                boxShadow: isDark
                  ? '0 8px 32px rgba(0,0,0,0.6)'
                  : '0 8px 32px rgba(0,0,0,0.12)',
              },
            },
          },
          MuiDialogTitle: {
            styleOverrides: {
              root: {
                color: isDark ? '#F1F5F9' : '#0F172A',
              },
            },
          },
          MuiDialogContent: {
            styleOverrides: {
              root: {
                color: isDark ? '#E2E8F0' : '#334155',
              },
            },
          },
          MuiSnackbarContent: {
            styleOverrides: {
              root: {
                backgroundColor: isDark ? '#1E293B' : '#0F172A',
                color: isDark ? '#F1F5F9' : '#FFFFFF',
                borderRadius: 8,
              },
            },
          },
          MuiPaginationItem: {
            styleOverrides: {
              root: {
                color: isDark ? '#94A3B8' : '#64748B',
                '&.Mui-selected': {
                  backgroundColor: isDark ? 'rgba(14,165,233,0.15)' : 'rgba(37,99,235,0.1)',
                  color: isDark ? '#38BDF8' : '#2563EB',
                },
              },
            },
          },
          RaDatagrid: {
            styleOverrides: {
              root: {
                overflow: 'hidden',
                borderRadius: 18,
                '& .RaDatagrid-headerCell': {
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  letterSpacing: 0,
                },
              },
            },
          },
          RaSidebar: {
            styleOverrides: {
              root: {
                backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
              },
            },
          },
        },
      }),
    [isDark]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        body: {
          background: `${bg} !important`,
          backgroundImage: 'none !important',
        },
        '.RaLayout-root': {
          minHeight: 'auto',
          background: 'transparent',
        },
        '.RaLayout-appFrame': {
          marginTop: '0 !important',
          background: 'transparent',
        },
        '.RaLayout-content': {
          padding: '0 !important',
          background: 'transparent',
        },
        '.RaLayout-content > div': {
          background: 'transparent',
        },
        '.RaLayout-contentWithSidebar': {
          background: 'transparent',
        },
        '.RaSidebar-docked': {
          width: 172,
          minWidth: 172,
          borderRight: '0 !important',
          background: isDark
            ? 'linear-gradient(180deg, rgba(12,19,34,0.72), rgba(12,19,34,0.42))'
            : 'rgba(255,255,255,0.66)',
          boxShadow: isDark
            ? '12px 0 36px rgba(2,6,23,0.16)'
            : '12px 0 36px rgba(15,23,42,0.06)',
          backdropFilter: 'blur(18px)',
        },
        '.RaMenu-root': {
          padding: '18px 10px',
        },
        '.RaMenuItemLink-root': {
          minHeight: 42,
          margin: '4px 0',
          borderRadius: 14,
          color: isDark ? '#A8B4C5' : '#475569',
          fontWeight: 700,
          transition: 'all .18s ease',
        },
        '.RaMenuItemLink-root:hover': {
          transform: 'translateX(3px)',
          background: isDark ? 'rgba(125,211,199,0.08)' : 'rgba(15,118,110,0.07)',
          color: isDark ? '#7DD3C7' : '#0F766E',
        },
        '.RaMenuItemLink-active': {
          background: isDark ? 'rgba(125,211,199,0.12) !important' : 'rgba(15,118,110,0.10) !important',
          color: isDark ? '#A7F3D0 !important' : '#0F766E !important',
        },
        '.RaMenuItemLink-icon': {
          color: 'currentColor !important',
          minWidth: 34,
        },
        '.RaLayout-appFrame': {
          marginTop: '0 !important',
          background: 'transparent',
        },
        '.RaSidebar-docked': {
          borderRight: '0 !important',
          background: isDark ? 'rgba(10,16,32,0.74)' : 'rgba(255,255,255,0.78)',
          boxShadow: isDark ? '18px 0 50px rgba(2,6,23,0.28)' : '18px 0 50px rgba(15,23,42,0.08)',
          backdropFilter: 'blur(18px)',
        },
        '.RaMenuItemLink-root': {
          minHeight: 44,
          margin: '4px 12px',
          borderRadius: 14,
          color: isDark ? '#AAB7C7' : '#475569',
          fontWeight: 700,
        },
        '.RaMenuItemLink-root:hover': {
          background: isDark ? 'rgba(125,211,199,0.08)' : 'rgba(15,118,110,0.07)',
          color: isDark ? '#7DD3C7' : '#0F766E',
        },
        '.RaMenuItemLink-active': {
          background: isDark ? 'rgba(125,211,199,0.12) !important' : 'rgba(15,118,110,0.10) !important',
          color: isDark ? '#A7F3D0 !important' : '#0F766E !important',
        },
        '.RaMenuItemLink-icon': {
          color: 'currentColor !important',
          minWidth: 34,
        },
        '.RaList-main, .RaEdit-main, .RaCreate-main, .RaShow-main': {
          overflow: 'hidden',
          borderRadius: 24,
          background: isDark
            ? 'linear-gradient(180deg, rgba(17,26,46,0.98), rgba(12,19,34,0.98))'
            : 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,252,255,0.96))',
          boxShadow: isDark
            ? '0 30px 90px rgba(2,6,23,0.48)'
            : '0 28px 80px rgba(15,23,42,0.11)',
          backdropFilter: 'blur(18px)',
        },
        '.RaList-actions, .RaTopToolbar-root': {
          minHeight: 76,
          padding: '18px 24px !important',
          gap: 10,
          background: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(248,250,252,0.72)',
          borderBottom: isDark ? '1px solid rgba(148,163,184,0.07)' : '1px solid rgba(15,23,42,0.045)',
        },
        '.RaList-main::before, .RaEdit-main::before, .RaCreate-main::before, .RaShow-main::before': {
          content: '""',
          display: 'block',
          height: 3,
          background: isDark
            ? 'linear-gradient(90deg, #7DD3C7, rgba(125,211,199,0))'
            : 'linear-gradient(90deg, #0F766E, rgba(15,118,110,0))',
        },
        '.RaList-actions .MuiButton-root, .RaTopToolbar-root .MuiButton-root': {
          minHeight: 38,
          padding: '0 14px',
          borderRadius: 999,
          background: isDark ? 'rgba(125,211,199,0.10)' : 'rgba(15,118,110,0.08)',
          color: isDark ? '#A7F3D0' : '#0F766E',
        },
        '.RaList-actions .MuiButton-root:hover, .RaTopToolbar-root .MuiButton-root:hover': {
          background: isDark ? 'rgba(125,211,199,0.16)' : 'rgba(15,118,110,0.13)',
        },
        '.RaDatagrid-root': {
          background: 'transparent !important',
          border: '0 !important',
        },
        '.RaDatagrid-table': {
          background: 'transparent !important',
          borderCollapse: 'separate',
          borderSpacing: '0 8px',
          padding: '12px 18px 4px',
        },
        '.RaDatagrid-row': {
          background: isDark ? 'rgba(255,255,255,0.025) !important' : 'rgba(255,255,255,0.72) !important',
          boxShadow: isDark ? '0 10px 26px rgba(2,6,23,0.16)' : '0 10px 24px rgba(15,23,42,0.045)',
        },
        '.RaDatagrid-row:hover': {
          background: isDark ? 'rgba(125,211,199,0.075) !important' : 'rgba(240,253,250,0.92) !important',
        },
        '.RaDatagrid-headerRow': {
          background: 'transparent !important',
          boxShadow: 'none !important',
        },
        '.RaDatagrid-headerCell': {
          borderBottom: '0 !important',
          color: isDark ? '#8EA5B8' : '#64748B',
        },
        '.RaDatagrid-rowCell': {
          borderBottom: '0 !important',
        },
        '.RaDatagrid-rowCell:first-of-type, .RaDatagrid-headerCell:first-of-type': {
          borderTopLeftRadius: 14,
          borderBottomLeftRadius: 14,
        },
        '.RaDatagrid-rowCell:last-child, .RaDatagrid-headerCell:last-child': {
          borderTopRightRadius: 14,
          borderBottomRightRadius: 14,
        },
        '.RaDatagrid-checkbox': {
          opacity: 0.45,
        },
        '.RaButton-button': {
          borderRadius: '999px !important',
        },
        '.MuiTablePagination-root': {
          borderTop: '0 !important',
          color: isDark ? '#94A3B8' : '#64748B',
          padding: '6px 20px 18px',
        },
        '.RaCreate-root .MuiPaper-root, .RaEdit-root .MuiPaper-root, .RaShow-root .MuiPaper-root': {
          padding: 24,
        },
        '.admin-show-layout': {
          padding: '0 !important',
        },
        '.admin-show-hero': {
          padding: '26px 28px',
          borderRadius: 22,
          background: isDark
            ? 'linear-gradient(135deg, rgba(125,211,199,0.13), rgba(148,163,184,0.04))'
            : 'linear-gradient(135deg, rgba(15,118,110,0.09), rgba(100,116,139,0.035))',
          marginBottom: 20,
        },
        '.admin-show-eyebrow': {
          color: isDark ? '#7DD3C7' : '#0F766E',
          fontSize: '0.78rem !important',
          fontWeight: '800 !important',
          marginBottom: '8px !important',
        },
        '.admin-show-title': {
          color: isDark ? '#F8FAFC' : '#0F172A',
          fontSize: '2rem !important',
          fontWeight: '900 !important',
          lineHeight: '1.15 !important',
        },
        '.admin-show-grid': {
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.35fr) minmax(280px, 0.65fr)',
          gap: 18,
        },
        '.admin-show-panel': {
          padding: 22,
          borderRadius: 20,
          background: isDark ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.74)',
          boxShadow: isDark
            ? 'inset 0 0 0 1px rgba(148,163,184,0.06)'
            : '0 12px 34px rgba(15,23,42,0.055)',
        },
        '.admin-show-panel-wide': {
          minWidth: 0,
        },
        '.admin-show-panel .RaLabeled-label': {
          color: `${isDark ? '#8EA5B8' : '#64748B'} !important`,
          fontSize: '0.74rem !important',
          fontWeight: '800 !important',
          marginBottom: '7px !important',
        },
        '.admin-show-panel .MuiTypography-root, .admin-show-panel span, .admin-show-panel div': {
          color: isDark ? '#E5EEF8' : '#172033',
        },
        '.admin-show-panel .MuiChip-root': {
          borderRadius: 999,
          background: isDark ? 'rgba(125,211,199,0.12)' : 'rgba(15,118,110,0.09)',
          color: isDark ? '#A7F3D0' : '#0F766E',
          fontWeight: 700,
        },
        '@media (max-width: 900px)': {
          '.admin-show-grid': {
            gridTemplateColumns: '1fr',
          },
          '.admin-show-title': {
            fontSize: '1.65rem !important',
          },
        },
        '.RaSimpleForm-root': {
          gap: 14,
        },
        '.RaSimpleForm-root .MuiFormControl-root': {
          marginTop: '10px !important',
          marginBottom: '8px !important',
        },
        '.MuiTablePagination-toolbar': {
          minHeight: 46,
        },
        '.MuiCheckbox-root': {
          color: isDark ? 'rgba(148,163,184,0.55)' : 'rgba(100,116,139,0.58)',
        },
        '.MuiCheckbox-root.Mui-checked': {
          color: isDark ? '#7DD3C7' : '#0F766E',
        },
        '.MuiSvgIcon-root': {
          fontSize: 20,
        },
        '.RaDatagrid-row .MuiButton-root': {
          color: isDark ? '#93C5FD' : '#2563EB',
        },
        '.RaDeleteButton-root .MuiButton-root, .RaDatagrid-row .MuiButton-root[color="error"]': {
          color: '#EF4444',
        },
      }} />
      <div style={{ backgroundColor: bg, minHeight: '100vh' }}>
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        requireAuth
        layout={CustomLayout}
        title="EventSync Admin"
        locale="fr"
      >
        <Resource
          name="events"
          list={EventList}
          edit={EventEdit}
          create={EventCreate}
          show={EventShow}
          recordRepresentation="title"
        />
        <Resource
          name="sessions"
          list={SessionList}
          edit={SessionEdit}
          create={SessionCreate}
          show={SessionShow}
          recordRepresentation="title"
        />
        <Resource
          name="speakers"
          list={SpeakerList}
          edit={SpeakerEdit}
          create={SpeakerCreate}
          show={SpeakerShow}
          recordRepresentation="name"
        />
      </Admin>
      </div>
    </ThemeProvider>
  )
}
