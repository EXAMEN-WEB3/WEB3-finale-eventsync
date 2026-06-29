import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    useRecordContext
} from 'react-admin';

const EmployeeTitle = () => {
    const record = useRecordContext();

    return record
        ? <span>Modifier : {record.prenom} {record.nom}</span>
        : null;
};

export const EmployeeEdit = () => (
    <Edit title={<EmployeeTitle />}>
        <SimpleForm>
            <TextInput
                source="prenom"
                validate={[required()]}
            />

            <TextInput
                source="nom"
                validate={[required()]}
            />

            <TextInput
                source="email"
                validate={[required()]}
            />

    
        </SimpleForm>
    </Edit>
);