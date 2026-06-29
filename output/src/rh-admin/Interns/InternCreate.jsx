import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    NumberInput,
    ReferenceInput,
    AutocompleteInput,
    SelectInput,
    required,
    email,
} from "react-admin";
import { useWatch } from "react-hook-form";

export const Remuneration = () => {
    const isRemunerate = useWatch({ name: "isRemunerate" });

    return (
        <NumberInput
            source="compensation"
            label="Rémunération"
            validate={isRemunerate ? required() : []}
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

export const InternCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput
                source="firstName"
                label="Prénom"
                validate={required()}
            />

            <TextInput
                source="lastName"
                label="Nom"
                validate={required()}
            />

            <TextInput
                source="email"
                validate={[required(), email()]}
            />

            <SelectInput
                source="department"
                label="Département"
                choices={[
                    { id: "Informatique", name: "Informatique" },
                    { id: "Marketing", name: "Marketing" },
                    { id: "RH", name: "RH" },
                    { id: "Finance", name: "Finance" },
                ]}
                validate={required()}
            />

            <BooleanInput
                source="isRemunerate"
                label="Stagiaire rémunéré"
            />

            <Remuneration />

            <ManagerInput />
        </SimpleForm>
    </Create>
);
