import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    BooleanInput,
    SelectInput,
    ReferenceInput,
    AutocompleteInput,
    required,
    email,
    minValue,
} from "react-admin";
import { useWatch } from "react-hook-form";
import { InternTitle } from "./InternTitle";

const RemunerationInput = () => {
    const isRemunerate = useWatch({ name: "isRemunerate" });

    return (
        <NumberInput
            source="remuneration"
            label="Rémunération (€)"
            validate={isRemunerate ? [required(), minValue(0)] : []}
            disabled={!isRemunerate}
        />
    );
};

const ManagerInput = () => {
    const department = useWatch({ name: "department" });

    return (
        <ReferenceInput
            source="managerId"
            reference="employees"
            filter={{ department, active: true }}
            enableGetChoices={() => !!department}
        >
            <AutocompleteInput
                label="Manager"
                optionText={(record) =>
                    record ? `${record.firstname} ${record.lastname}` : ""
                }
                disabled={!department}
                helperText={!department ? "Sélectionnez d'abord un département" : ""}
                fullWidth
            />
        </ReferenceInput>
    );
};

export const InternEdit = () => (
    <Edit title={<InternTitle />}>
        <SimpleForm>
            <TextInput
                source="firstName"
                label="Prénom"
                validate={[required()]}
            />

            <TextInput
                source="lastName"
                label="Nom"
                validate={[required()]}
            />

            <TextInput
                source="email"
                label="Email"
                validate={[required(), email()]}
            />

            <SelectInput
                source="department"
                label="Département"
                validate={[required()]}
                choices={[
                    { id: "Informatique", name: "Informatique" },
                    { id: "Marketing", name: "Marketing" },
                    { id: "RH", name: "RH" },
                    { id: "Finance", name: "Finance" },
                ]}
            />

            <ManagerInput />

            <TextInput
                source="startDate"
                label="Date de début"
                validate={[required()]}
            />

            <TextInput
                source="endDate"
                label="Date de fin"
                validate={[required()]}
            />

            <BooleanInput
                source="isRemunerate"
                label="Rémunéré"
            />

            <RemunerationInput />
        </SimpleForm>
    </Edit>
);
