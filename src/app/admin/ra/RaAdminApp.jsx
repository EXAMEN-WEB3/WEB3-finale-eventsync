'use client'

import { useMemo, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import IconButton from '@mui/material/IconButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import {
  Admin,
  Resource,
  Layout,
  AppBar,
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
} from 'react-admin'
import { useTheme } from '@/context/ThemeContext'
import { dataProvider } from '@/lib/raDataProvider'
import { authProvider } from '@/lib/raAuthProvider'

function ThemeToggleButton() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <IconButton onClick={toggleTheme} color="inherit" size="large">
      {isDark ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  )
}

function CustomAppBar() {
  return (
    <AppBar>
      <ThemeToggleButton />
    </AppBar>
  )
}

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />

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
    <SimpleForm>
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
    <SimpleForm>
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
    <SimpleShowLayout>
      <TextField source="title" />
      <RichTextField source="description" />
      <DateField source="startDate" locales="fr-FR" showTime />
      <DateField source="endDate" locales="fr-FR" showTime />
      <TextField source="location" />
      <ArrayField source="sessions">
        <SingleFieldList>
          <ChipField source="title" />
        </SingleFieldList>
      </ArrayField>
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
    <SimpleForm>
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
    <SimpleForm>
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
    <SimpleShowLayout>
      <TextField source="title" />
      <RichTextField source="description" />
      <DateField source="startTime" locales="fr-FR" showTime />
      <DateField source="endTime" locales="fr-FR" showTime />
      <TextField source="room" />
      <NumberField source="capacity" emptyText="Non défini" />
      <TextField source="event.title" label="Événement" />
      <ArrayField source="speakers">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
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
    <SimpleShowLayout>
      <TextField source="name" />
      <RichTextField source="bio" />
      <TextField source="photoUrl" label="Photo URL" />
    </SimpleShowLayout>
  </Show>
)

export default function RaAdminApp() {
  const { isDark } = useTheme()

  const bg = isDark ? '#0F172A' : '#F1F5F9'

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
                background: { default: '#0F172A', paper: '#1E293B' },
                text: { primary: '#F1F5F9', secondary: '#94A3B8' },
                divider: 'rgba(148,163,184,0.15)',
              }
            : {
                primary: { main: '#2563EB', light: '#3B82F6', dark: '#1D4ED8' },
                secondary: { main: '#7C3AED', light: '#8B5CF6', dark: '#6D28D9' },
                success: { main: '#16A34A' },
                warning: { main: '#D97706' },
                error: { main: '#DC2626' },
                background: { default: '#F1F5F9', paper: '#FFFFFF' },
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
              root: { backgroundImage: 'none' },
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
                backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
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
                backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                color: isDark ? '#F1F5F9' : '#0F172A',
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                borderBottom: `1px solid ${isDark ? 'rgba(148,163,184,0.12)' : 'rgba(0,0,0,0.08)'}`,
                color: isDark ? '#F1F5F9' : '#0F172A',
              },
              head: {
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
              },
            },
          },
          MuiTableHead: {
            styleOverrides: {
              root: {
                '& .MuiTableRow-root': {
                  backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
                },
              },
            },
          },
          MuiTableRow: {
            styleOverrides: {
              root: {
                '&:hover': {
                  backgroundColor: isDark
                    ? 'rgba(148,163,184,0.05)'
                    : 'rgba(37,99,235,0.04)',
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
                borderRadius: 8,
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
                '& .RaDatagrid-headerCell': {
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
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
