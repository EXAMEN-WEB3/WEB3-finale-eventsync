import { useRecordContext, useGetList } from "react-admin";
import { Typography, Box, Chip, Avatar } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";

export const InternsByManager = () => {
  const employee = useRecordContext();
  const { data, total, isPending } = useGetList(
    "interns",
    { filter: { managerId: employee?.id } },
    { enabled: !!employee?.id }
  );

  if (isPending)
    return (
      <Typography variant="body2" color="text.secondary">
        Chargement...
      </Typography>
    );

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1.5} mb={2}>
        <Box
          sx={{
            p: 0.75,
            borderRadius: "8px",
            backgroundColor: "#FFF7ED",
            display: "flex",
          }}
        >
          <SchoolIcon sx={{ color: "#C2410C", fontSize: 18 }} />
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1A2B3C" }}>
          Stagiaires encadrés
        </Typography>
        <Chip
          label={total ?? 0}
          size="small"
          sx={{
            backgroundColor: "#FFF7ED",
            color: "#C2410C",
            fontWeight: 700,
            border: "1px solid #FED7AA",
            fontSize: "0.72rem",
          }}
        />
      </Box>

      {!data?.length ? (
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: "#F8FAFC",
            border: "1px dashed #CBD5E1",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Aucun stagiaire encadré pour le moment
          </Typography>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={1}>
          {data.map((intern) => (
            <Box
              key={intern.id}
              component={Link}
              to={`/interns/${intern.id}/show`}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.5,
                borderRadius: 2,
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                textDecoration: "none",
                transition: "all 0.15s ease",
                "&:hover": {
                  backgroundColor: "#F0F4F8",
                  borderColor: "#CBD5E1",
                  transform: "translateX(2px)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "8px",
                  backgroundColor: "#FFF7ED",
                  color: "#C2410C",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                }}
              >
                {`${intern.firstName?.[0] ?? ""}${intern.lastName?.[0] ?? ""}`.toUpperCase()}
              </Avatar>
              <Box flex={1}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#1A2B3C", lineHeight: 1.3 }}
                >
                  {intern.firstName} {intern.lastName}
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748B" }}>
                  {intern.department}
                </Typography>
              </Box>
              <OpenInNewIcon sx={{ fontSize: 14, color: "#94A3B8" }} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
