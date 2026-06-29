import { Show, SimpleShowLayout, TextField, DateField, BooleanField, EmailField } from 'react-admin'

export const InternShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <EmailField source="email" label="Email" />
      <TextField source="school" label="École" />
      <TextField source="supervisor" label="Superviseur" />
      <DateField source="startDate" label="Date de début" />
      <DateField source="endDate" label="Date de fin" />
      <BooleanField source="active" label="Actif" />
    </SimpleShowLayout>
  </Show>
)
