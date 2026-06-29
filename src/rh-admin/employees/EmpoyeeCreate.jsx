import { Create, SimpleForm, TextInput, NumberInput, BooleanInput } from 'react-admin';
import { required } from 'react-admin';

export const EmployeCreate = () => (
    <Create>
      <SimpleForm>
        <TextInput source="firstname" validate={[required()]} />
        <TextInput source="lastname" validate={[required()]} />
        <TextInput source="email" validate={[required()]} />
        <TextInput source="department" validate={[required()]} />
        <NumberInput source="salary"  min={1500} validate={[required()]}/>
        <TextInput source="telephone" validate={[required()]} />
        <BooleanInput source="active" defaultValue={true} />
      </SimpleForm>
    </Create>);