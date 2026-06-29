import { Edit, SimpleForm, TextInput, NumberInput, BooleanInput, required,SelectInput } from 'react-admin';

export const EmployeeEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="firstname" validate={required()}/>
      <TextInput source="lastname" validate={required()}/>
      <TextInput source="email" validate={required()}/>
         <SelectInput
        source="department"
        label="Département"
        validate={[required()]}
        choices={[
          { id: "Informatique", name: "Informatique" },
          { id: "Marketing",    name: "Marketing"    },
          { id: "RH",           name: "RH"           },
          { id: "Finance",      name: "Finance"       },
        ]}
      />
      <NumberInput source="salary" min={1500} validate={required()}/>
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>);