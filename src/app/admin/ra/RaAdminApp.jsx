'use client'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Admin,
  Resource,
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
import { dataProvider } from '@/lib/raDataProvider'
import { authProvider } from '@/lib/raAuthProvider'

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        slotProps: {
          input: { notched: undefined },
        },
      },
    },
  },
})

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
  return (
    <ThemeProvider theme={theme}>
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        requireAuth
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
    </ThemeProvider>
  )
}
