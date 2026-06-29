import { useRecordContext, useGetOne } from "react-admin";
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Avatar,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";

export const ManagerCard = () => {
  const intern = useRecordContext();
  const {
    data,
    isPending,
    error,
  } = useGetOne(
    "employees",
    { id: intern?.managerId },
    { enabled: !!intern?.managerId }
  );

  if (isPending)
    return (
      <Box display="flex" alignItems="center" gap={1.5} p={2}>
        <CircularProgress size={20} />
        <Typography variant="body2" color="text.secondary">
          Chargement du manager...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: "#FEF2F2",
          border: "1px solid #FECACA",
          color: "#B91C1C",
          fontSize: "0.85rem",
        }}
      >
        Manager introuvable
      </Box>
    );

  const initials = `${data?.firstname?.[0] ?? ""}${data?.lastname?.[0] ?? ""}`.toUpperCase();

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Box
          sx={{
            p: 0.75,
            borderRadius: "8px",
            backgroundColor: "#EFF6FF",
            display: "flex",
          }}
        >
          <PersonIcon sx={{ color: "#1D4ED8", fontSize: 18 }} />
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1A2B3C" }}>
          Responsable
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2.5,
          borderRadius: 2,
          background: "linear-gradient(135deg, #F8FAFC 0%, #F0F4F8 100%)",
          border: "1px solid #E2E8F0",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
            borderRadius: "12px",
            background: "linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)",
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          {initials}
        </Avatar>

        <Box flex={1}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1A2B3C", mb: 0.5 }}>
            {data?.firstname} {data?.lastname}
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={1} mt={0.5}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <WorkIcon sx={{ fontSize: 13, color: "#64748B" }} />
              <Typography variant="caption" sx={{ color: "#64748B" }}>
                {data?.department}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <EmailIcon sx={{ fontSize: 13, color: "#64748B" }} />
              <Typography
                component="a"
                href={`mailto:${data?.email}`}
                variant="caption"
                sx={{ color: "#1D4ED8", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
              >
                {data?.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Chip
          label={data?.active ? "Actif" : "Inactif"}
          size="small"
          sx={{
            backgroundColor: data?.active ? "#F0FDF4" : "#FEF2F2",
            color: data?.active ? "#15803D" : "#B91C1C",
            fontWeight: 700,
            fontSize: "0.72rem",
            border: data?.active ? "1px solid #86EFAC" : "1px solid #FECACA",
          }}
        />
      </Box>
    </Box>
  );
};
