import { useRecordContext, useGetList } from "react-admin";
import { Typography, Box, Chip } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";

export const DepartmentStats = () => {
  const employee = useRecordContext();

  const { total, isPending } = useGetList("employees", {
    filter: { department: employee?.department, active: true },
    pagination: { page: 1, perPage: 1 },
  });

  if (!employee) return null;

  const colleagues = isPending ? "…" : Math.max(0, (total ?? 0) - 1);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: "#F0F9FF",
        border: "1px solid #BAE6FD",
      }}
    >
      <Box
        sx={{
          p: 1,
          borderRadius: "8px",
          backgroundColor: "#E0F2FE",
          display: "flex",
        }}
      >
        <GroupsIcon sx={{ color: "#0369A1", fontSize: 20 }} />
      </Box>
      <Box flex={1}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#0C4A6E" }}>
          Collègues actifs — {employee.department}
        </Typography>
        <Typography variant="caption" sx={{ color: "#0369A1" }}>
          Autres employés actifs dans le même département
        </Typography>
      </Box>
      <Chip
        label={colleagues}
        size="small"
        sx={{
          backgroundColor: "#0369A1",
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.85rem",
          px: 0.5,
        }}
      />
    </Box>
  );
};
