import {
  Show,
  NumberField,
  TopToolbar,
  ListButton,
  EditButton,
  useRecordContext,
} from "react-admin";
import {
  Box,
  Typography,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import EuroIcon from "@mui/icons-material/Euro";
import BadgeIcon from "@mui/icons-material/Badge";
import { InternsByManager } from "./InternsByManager";
import { DepartmentStats } from "./DepartementStats";

const EmployeeShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

const EmployeeProfile = () => {
  const record = useRecordContext();
  if (!record) return null;

  const initials = `${record.firstname?.[0] ?? ""}${record.lastname?.[0] ?? ""}`.toUpperCase();
  const deptColors = {
    Informatique: { bg: "#EFF6FF", text: "#1D4ED8" },
    Marketing: { bg: "#FFF7ED", text: "#C2410C" },
    RH: { bg: "#F0FDF4", text: "#15803D" },
    Finance: { bg: "#FAF5FF", text: "#7E22CE" },
  };
  const deptStyle = deptColors[record.department] ?? { bg: "#F1F5F9", text: "#475569" };

  return (
    <Box>
      {/* Hero Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)",
          borderRadius: "12px 12px 0 0",
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "16px",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: "1.5rem",
            border: "2px solid rgba(255,255,255,0.3)",
            flexShrink: 0,
          }}
        >
          {initials}
        </Box>
        <Box flex={1}>
          <Typography
            variant="h5"
            sx={{ color: "#fff", fontWeight: 700, mb: 0.5 }}
          >
            {record.firstname} {record.lastname}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Chip
              label={record.department}
              size="small"
              sx={{
                backgroundColor: deptStyle.bg,
                color: deptStyle.text,
                fontWeight: 700,
                fontSize: "0.72rem",
              }}
            />
            <Chip
              label={record.active ? "✓ Actif" : "✗ Inactif"}
              size="small"
              sx={{
                backgroundColor: record.active ? "#F0FDF4" : "#FEF2F2",
                color: record.active ? "#15803D" : "#B91C1C",
                fontWeight: 700,
                fontSize: "0.72rem",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: "right",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.6)", display: "block" }}
          >
            Salaire mensuel
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#fff" }}>
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(record.salary)}
          </Typography>
        </Box>
      </Box>

      {/* Info Cards */}
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
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: "8px",
                  backgroundColor: "#EFF6FF",
                  display: "flex",
                }}
              >
                <EmailIcon sx={{ color: "#1D4ED8", fontSize: 18 }} />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#64748B", fontWeight: 600, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: "0.05em" }}
                >
                  Email
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#1A2B3C" }}>
                  {record.email}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: "8px",
                  backgroundColor: deptStyle.bg,
                  display: "flex",
                }}
              >
                <WorkIcon sx={{ color: deptStyle.text, fontSize: 18 }} />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#64748B", fontWeight: 600, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: "0.05em" }}
                >
                  Département
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#1A2B3C" }}>
                  {record.department}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: "8px",
                  backgroundColor: "#FAF5FF",
                  display: "flex",
                }}
              >
                <EuroIcon sx={{ color: "#7E22CE", fontSize: 18 }} />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#64748B", fontWeight: 600, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: "0.05em" }}
                >
                  Salaire
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#1A2B3C" }}>
                  <NumberField
                    source="salary"
                    options={{ style: "currency", currency: "EUR" }}
                    record={record}
                  />
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: "8px",
                  backgroundColor: "#F0FDF4",
                  display: "flex",
                }}
              >
                <BadgeIcon sx={{ color: "#15803D", fontSize: 18 }} />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#64748B", fontWeight: 600, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: "0.05em" }}
                >
                  ID
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#1A2B3C" }}>
                  #{record.id}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "#F1F5F9" }} />

        <DepartmentStats />

        <Divider sx={{ my: 3, borderColor: "#F1F5F9" }} />

        <InternsByManager />
      </Box>
    </Box>
  );
};

export const EmployeeShow = () => (
  <Show
    actions={<EmployeeShowActions />}
    sx={{
      "& .RaShow-main": {
        boxShadow: "none",
        background: "transparent",
      },
    }}
  >
    <EmployeeProfile />
  </Show>
);
