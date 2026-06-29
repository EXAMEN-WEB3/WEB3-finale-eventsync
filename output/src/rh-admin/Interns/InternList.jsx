import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  EditButton,
  SelectInput,
  DeleteWithConfirmButton,
  useCreate,
  useRefresh,
  Button,
  CreateButton,
  TopToolbar,
  useRecordContext,
} from "react-admin";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Chip,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const internFilters = [
  <SelectInput
    source="department"
    label="Département"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,
  <SelectInput
    source="isRemunerate"
    label="Rémunéré"
    choices={[
      { id: true, name: "Oui" },
      { id: false, name: "Non" },
    ]}
  />,
];

const QuickAddIntern = () => {
  const [open, setOpen] = useState(false);
  const [create, { isPending, error }] = useCreate();
  const refresh = useRefresh();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    managerId: "",
  });

  const handleSubmit = () => {
    create(
      "interns",
      { data: form },
      {
        onSuccess: () => {
          setOpen(false);
          refresh();
        },
      }
    );
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        label="Ajout rapide"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: "#F0F9FF",
          color: "#0369A1",
          border: "1px solid #BAE6FD",
          "&:hover": { backgroundColor: "#E0F2FE" },
        }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { borderRadius: 3, minWidth: 340 } }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            pb: 1,
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          Ajout rapide d'un stagiaire
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <MuiTextField
              label="Prénom"
              fullWidth
              size="small"
              onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            />
            <MuiTextField
              label="Nom"
              fullWidth
              size="small"
              onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
            />
            <MuiTextField
              label="Manager ID"
              fullWidth
              size="small"
              onChange={(e) => setForm((f) => ({ ...f, managerId: e.target.value }))}
            />
            {error ? (
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 1.5,
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FECACA",
                  color: "#B91C1C",
                  fontSize: "0.8rem",
                }}
              >
                Erreur lors de la création
              </Box>
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <MuiButton
            onClick={() => setOpen(false)}
            sx={{ color: "#64748B" }}
          >
            Annuler
          </MuiButton>
          <MuiButton
            onClick={handleSubmit}
            disabled={isPending}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Créer
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};


const RemunerationBadge = (props) => {
  const record = useRecordContext(props);
  if (!record) return null;
  return record.isRemunerate ? (
    <Chip
      label="Rémunéré"
      size="small"
      sx={{
        backgroundColor: "#F0FDF4",
        color: "#15803D",
        fontWeight: 700,
        fontSize: "0.72rem",
        border: "1px solid #86EFAC",
      }}
    />
  ) : (
    <Chip
      label="Non rémunéré"
      size="small"
      sx={{
        backgroundColor: "#F8FAFC",
        color: "#64748B",
        fontWeight: 600,
        fontSize: "0.72rem",
        border: "1px solid #E2E8F0",
      }}
    />
  );
};

const DepartmentChip = (props) => {
  const record = useRecordContext(props);
  if (!record) return null;
  const colors = {
    Informatique: { bg: "#EFF6FF", text: "#1D4ED8" },
    Marketing:    { bg: "#FFF7ED", text: "#C2410C" },
    RH:           { bg: "#F0FDF4", text: "#15803D" },
    Finance:      { bg: "#FAF5FF", text: "#7E22CE" },
  };
  const style = colors[record.department] ?? { bg: "#F1F5F9", text: "#475569" };
  return (
    <Chip
      label={record.department}
      size="small"
      sx={{
        backgroundColor: style.bg,
        color: style.text,
        fontWeight: 600,
        fontSize: "0.72rem",
        border: `1px solid ${style.text}22`,
      }}
    />
  );
};

export const InternList = () => (
  <List
    filters={internFilters}
    actions={
      <TopToolbar>
        { <CreateButton /> }
        <QuickAddIntern />
      </TopToolbar>
    }
    sx={{
      "& .RaList-content": {
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      },
    }}
  >
    <Datagrid
      rowClick="show"
      bulkActionButtons={false}
      sx={{
        "& .RaDatagrid-headerCell": {
          backgroundColor: "#F8FAFC",
          fontWeight: 700,
          color: "#475569",
          fontSize: "0.72rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          py: 1.5,
        },
        "& .RaDatagrid-row": {
          "&:hover": { backgroundColor: "#F8FAFC" },
        },
        "& .RaDatagrid-rowCell": {
          py: 1.25,
          borderBottom: "1px solid #F1F5F9",
        },
      }}
    >
      <TextField source="id" label="ID" />
      <TextField source="firstName" label="Prénom" />
      <TextField source="lastName" label="Nom" />
      <TextField source="email" />
      <DepartmentChip label="Département" />
      <RemunerationBadge label="Rémunéré" />
      <NumberField
        source="compensation"
        label="Rémunération"
        options={{ style: "currency", currency: "EUR" }}
      />
      <ReferenceField source="managerId" reference="employees" label="Manager">
        <TextField source="firstname" />
      </ReferenceField>
      <EditButton label="" sx={{ minWidth: 0, color: "#64748B" }} />
      <DeleteWithConfirmButton label="" sx={{ minWidth: 0 }} />
    </Datagrid>
  </List>
);
