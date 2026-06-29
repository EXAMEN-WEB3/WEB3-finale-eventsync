import {
  Show,
  useRecordContext,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";
import {
  Box,
  Typography,
  Chip,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EuroIcon from "@mui/icons-material/Euro";
import { ManagerCard } from "./ManagerCard";

const InternShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

const InternProfile = () => {
  const record = useRecordContext();
  if (!record) return null;

  const initials = `${record.firstName?.[0] ?? ""}${record.lastName?.[0] ?? ""}`.toUpperCase();
  const deptColors = {
    Informatique: { bg: "#EFF6FF", text: "#1D4ED8" },
    Marketing: { bg: "#FFF7ED", text: "#C2410C" },
    RH: { bg: "#F0FDF4", text: "#15803D" },
    Finance: { bg: "#FAF5FF", text: "#7E22CE" },
  };
  const deptStyle = deptColors[record.department] ?? { bg: "#F1F5F9", text: "#475569" };

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #B45309 0%, #D97706 100%)",
          borderRadius: "12px 12px 0 0",
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Avatar
          sx={{
            width: 68,
            height: 68,
            borderRadius: "16px",
            background: "rgba(255,255,255,0.25)",
            fontWeight: 800,
            fontSize: "1.4rem",
            color: "#fff",
            border: "2px solid rgba(255,255,255,0.35)",
          }}
        >
          {initials}
        </Avatar>
        <Box flex={1}>
          <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700, mb: 0.5 }}>
            {record.firstName} {record.lastName}
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            <Chip
              label={record.department || "—"}
              size="small"
              sx={{ backgroundColor: deptStyle.bg, color: deptStyle.text, fontWeight: 700, fontSize: "0.72rem" }}
            />
            <Chip
              label={record.isRemunerate ? "Rémunéré" : "Non rémunéré"}
              size="small"
              sx={{
                backgroundColor: record.isRemunerate ? "#F0FDF4" : "#F8FAFC",
                color: record.isRemunerate ? "#15803D" : "#64748B",
                fontWeight: 700,
                fontSize: "0.72rem",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Body */}
      <Box
        sx={{
          p: 3,
          background: "#fff",
          borderRadius: "0 0 12px 12px",
          border: "1px solid #E2E8F0",
          borderTop: "none",
        }}
      >
        <Grid container spacing={2}>
          {record.email && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 2, borderRadius: 2, backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                <Box sx={{ p: 1, borderRadius: "8px", backgroundColor: "#EFF6FF", display: "flex" }}>
                  <EmailIcon sx={{ color: "#1D4ED8", fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: "0.05em" }}>Email</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#1A2B3C" }}>{record.email}</Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {record.department && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 2, borderRadius: 2, backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                <Box sx={{ p: 1, borderRadius: "8px", backgroundColor: deptStyle.bg, display: "flex" }}>
                  <WorkIcon sx={{ color: deptStyle.text, fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: "0.05em" }}>Département</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#1A2B3C" }}>{record.department}</Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {record.startDate && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 2, borderRadius: 2, backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                <Box sx={{ p: 1, borderRadius: "8px", backgroundColor: "#F0FDF4", display: "flex" }}>
                  <CalendarTodayIcon sx={{ color: "#15803D", fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: "0.05em" }}>Période</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#1A2B3C" }}>
                    {record.startDate} → {record.endDate ?? "…"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {record.isRemunerate && record.remuneration != null && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 2, borderRadius: 2, backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                <Box sx={{ p: 1, borderRadius: "8px", backgroundColor: "#FAF5FF", display: "flex" }}>
                  <EuroIcon sx={{ color: "#7E22CE", fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: "0.05em" }}>Rémunération</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#1A2B3C" }}>
                    {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(record.remuneration)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 3, borderColor: "#F1F5F9" }} />
        <ManagerCard />
      </Box>
    </Box>
  );
};

export const InternShow = () => (
  <Show
    actions={<InternShowActions />}
    sx={{ "& .RaShow-main": { boxShadow: "none", background: "transparent" } }}
  >
    <InternProfile />
  </Show>
);
