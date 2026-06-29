import {
  List,
  Datagrid,
  NumberField,
  SearchInput,
  SelectInput,
  EditButton,
  DeleteWithConfirmButton,
  useRecordContext,
} from "react-admin";
import { Chip, Box } from "@mui/material";
import { QuickStatusToggle } from "./QuickStatusToggle";

const employeeFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="department"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,
];


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

const ActiveStatusBadge = (props) => {
  const record = useRecordContext(props);
  if (!record) return null;
  return record.active ? (
    <Chip
      label="Actif"
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
      label="Inactif"
      size="small"
      sx={{
        backgroundColor: "#FEF2F2",
        color: "#B91C1C",
        fontWeight: 700,
        fontSize: "0.72rem",
        border: "1px solid #FECACA",
      }}
    />
  );
};

const EmployeeNameField = (props) => {
  const record = useRecordContext(props);
  if (!record) return null;
  const initials = `${record.firstname?.[0] ?? ""}${record.lastname?.[0] ?? ""}`.toUpperCase();
  const colors = ["#1E3A5F", "#00697B", "#6B21A8", "#B45309", "#15803D"];
  const colorIndex = (record.id as number) % colors.length;
  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "8px",
          backgroundColor: colors[colorIndex],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.7rem",
          flexShrink: 0,
        }}
      >
        {initials}
      </Box>
      <Box>
        <Box sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#1A2B3C" }}>
          {record.firstname} {record.lastname}
        </Box>
        <Box sx={{ fontSize: "0.75rem", color: "#64748B" }}>{record.email}</Box>
      </Box>
    </Box>
  );
};

export const EmployeeList = () => (
  <List
    filters={employeeFilters}
    perPage={5}
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
      <EmployeeNameField label="Employé" />
      <DepartmentChip label="Département" />
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
        sx={{ fontWeight: 600 }}
      />
      <ActiveStatusBadge label="Statut" />
      <QuickStatusToggle />
      <EditButton label="" sx={{ minWidth: 0, color: "#64748B" }} />
      <DeleteWithConfirmButton label="" sx={{ minWidth: 0 }} />
    </Datagrid>
  </List>
);
