import { Edit, SimpleForm, TextInput, DateInput, BooleanInput, required } from 'react-admin'

export const InternEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="firstname" label="Prénom" validate={required()} />
      <TextInput source="lastname" label="Nom" validate={required()} />
      <TextInput source="email" label="Email" validate={required()} />
      <TextInput source="school" label="École" />
      <TextInput source="supervisor" label="Superviseur" />
      <DateInput source="startDate" label="Date de début" validate={required()} />
      <DateInput source="endDate" label="Date de fin" />
      <BooleanInput source="active" label="Actif" />
    </SimpleForm>
  </Edit>
)
