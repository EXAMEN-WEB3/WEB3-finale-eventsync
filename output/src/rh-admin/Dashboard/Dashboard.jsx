import { useGetList } from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Divider,
  LinearProgress,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import EuroIcon from "@mui/icons-material/Euro";
import GroupIcon from "@mui/icons-material/Group";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";



const StatCard = ({ title, icon, gradient, total, isPending, subtitle, ratio }: StatCardProps) => (
  <Card
    elevation={0}
    sx={{
      background: gradient,
      borderRadius: "18px",
      overflow: "hidden",
      position: "relative",
      border: "none",
      boxShadow: "0 6px 24px rgba(0,0,0,0.16), 0 1px 4px rgba(0,0,0,0.08)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "default",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.10)",
      },
     
      "&::before": {
        content: '""',
        position: "absolute",
        bottom: -30,
        left: -30,
        width: 120,
        height: 120,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.06)",
        pointerEvents: "none",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        top: -20,
        right: -20,
        width: 90,
        height: 90,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.09)",
        pointerEvents: "none",
      },
    }}
  >
    <CardContent sx={{ p: "26px !important", position: "relative", zIndex: 1 }}>

      {/* Ligne icône + label */}
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2.5}>
        <Box
          sx={{
            background: "rgba(255,255,255,0.22)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "13px",
            p: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.72)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            fontSize: "0.65rem",
            textAlign: "right",
            lineHeight: 1.4,
            maxWidth: "55%",
          }}
        >
          {title}
        </Typography>
      </Box>

   
      {isPending ? (
        <CircularProgress size={32} thickness={3.5} sx={{ color: "rgba(255,255,255,0.70)", mb: 1 }} />
      ) : (
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-2.5px",
            fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
            mb: 0.75,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {total ?? 0}
        </Typography>
      )}

   
      <Typography
        variant="caption"
        sx={{
          color: "rgba(255,255,255,0.58)",
          fontSize: "0.73rem",
          display: "block",
          mb: ratio !== undefined ? 2 : 0,
        }}
      >
        {subtitle}
      </Typography>

      {/* Barre de progression */}
      {ratio !== undefined && !isPending && (
        <>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, Math.round(ratio * 100))}
            sx={{
              height: 4,
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.18)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "rgba(255,255,255,0.80)",
                borderRadius: 2,
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.48)", fontSize: "0.63rem", mt: 0.6, display: "block" }}
          >
            {Math.round(ratio * 100)} % du total
          </Typography>
        </>
      )}
    </CardContent>
  </Card>
);


const SectionLabel = ({ title, subtitle }) => (
  <Box display="flex" alignItems="center" gap={1.5} mb={2.5}>
    <Box
      sx={{
        width: 4,
        height: 30,
        borderRadius: "4px",
        background: "linear-gradient(180deg, #1E3A5F 0%, #4A90D9 100%)",
        flexShrink: 0,
      }}
    />
    <Box>
      <Typography
        variant="h6"
        sx={{ color: "#1A2B3C", fontWeight: 700, lineHeight: 1.15, fontSize: "1.05rem" }}
      >
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: "#7A8FA6", fontSize: "0.77rem" }}>
        {subtitle}
      </Typography>
    </Box>
  </Box>
);


const RecapCard = ({
  label,
  percent,
  percentColor,
  count,
  countLabel,
  loading,
}) => (
  <Card
    elevation={0}
    sx={{
      borderRadius: "18px",
      border: "1px solid #E4EAF2",
      background: "#fff",
      boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      height: "100%",
      transition: "box-shadow 0.18s ease",
      "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.10)" },
    }}
  >
    <CardContent sx={{ p: "24px !important" }}>
      <Typography
        variant="caption"
        sx={{
          color: "#8FA3B8",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.09em",
          fontSize: "0.64rem",
          display: "block",
          mb: 2.5,
        }}
      >
        {label}
      </Typography>

      <Box mb={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.75}>
          <Typography variant="body2" sx={{ color: "#475569", fontSize: "0.8rem" }}>
            Taux
          </Typography>
          <Typography sx={{ fontWeight: 800, color: percentColor, fontSize: "0.9rem" }}>
            {loading || percent === null ? "…" : `${percent}%`}
          </Typography>
        </Box>
        <LinearProgress
          variant={loading ? "indeterminate" : "determinate"}
          value={percent ?? 0}
          sx={{
            height: 7,
            borderRadius: 4,
            backgroundColor: "#EEF2F7",
            "& .MuiLinearProgress-bar": {
              backgroundColor: percentColor,
              borderRadius: 4,
            },
          }}
        />
      </Box>

      <Divider sx={{ borderColor: "#F1F5F9", mb: 2 }} />

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "0.75rem" }}>
          {countLabel}
        </Typography>
        <Typography sx={{ fontWeight: 800, color: "#1A2B3C", fontSize: "1.1rem" }}>
          {loading ? "…" : count}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);


const MiniCard = ({
  label,
  value,
  color,
  loading,
}) => (
  <Card
    elevation={0}
    sx={{
      borderRadius: "14px",
      border: "1px solid #E4EAF2",
      background: "#fff",
      boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
      transition: "box-shadow 0.18s ease, transform 0.18s ease",
      "&:hover": {
        boxShadow: "0 4px 14px rgba(0,0,0,0.09)",
        transform: "translateY(-2px)",
      },
    }}
  >
    <CardContent sx={{ p: "18px 20px !important" }}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color, boxShadow: `0 0 0 3px ${color}28`, flexShrink: 0 }} />
        <Typography variant="caption" sx={{ color: "#7A8FA6", fontWeight: 600, fontSize: "0.72rem" }}>
          {label}
        </Typography>
      </Box>
      <Box display="flex" alignItems="baseline" gap={0.75}>
        {loading ? (
          <CircularProgress size={16} thickness={4} sx={{ color }} />
        ) : (
          <Typography sx={{ fontWeight: 900, color: "#1A2B3C", fontSize: "1.6rem", letterSpacing: "-0.5px", lineHeight: 1 }}>
            {value}
          </Typography>
        )}
        <TrendingUpIcon sx={{ color: "#C8D6E5", fontSize: 13 }} />
      </Box>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { total: totalEmp, isPending: p1 }    = useGetList("employees", { pagination: { page: 1, perPage: 1 } });
  const { total: activeEmp, isPending: p2 }   = useGetList("employees", { filter: { active: true }, pagination: { page: 1, perPage: 1 } });
  const { total: totalInt, isPending: p3 }    = useGetList("interns",   { pagination: { page: 1, perPage: 1 } });
  const { total: remuInt, isPending: p4 }     = useGetList("interns",   { filter: { isRemunerate: true }, pagination: { page: 1, perPage: 1 } });

  const activeRatio = (!p1 && !p2 && totalEmp) ? Math.round(((activeEmp ?? 0) / totalEmp) * 100) : null;
  const remuRatio   = (!p3 && !p4 && totalInt) ? Math.round(((remuInt   ?? 0) / totalInt) * 100) : null;

  return (
    <Box sx={{ maxWidth: 1320, mx: "auto" }}>

   
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4.5,
          pb: 3,
          borderBottom: "1px solid #DDE5EF",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#0F1E30",
              fontWeight: 900,
              fontSize: "clamp(1.55rem, 2.5vw, 2.1rem)",
              letterSpacing: "-0.8px",
              lineHeight: 1.15,
              mb: 0.6,
            }}
          >
            Tableau de bord RH
          </Typography>
          <Typography sx={{ color: "#7A8FA6", fontSize: "0.88rem", fontWeight: 400 }}>
            Vue d'ensemble de votre effectif — mise à jour en temps réel
          </Typography>
        </Box>

        {/* Badge online */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            px: 1.75,
            py: 0.75,
            borderRadius: "24px",
            backgroundColor: "#F0FDF4",
            border: "1px solid #86EFAC",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              "@keyframes blink": {
                "0%, 100%": { opacity: 1, transform: "scale(1)" },
                "50%": { opacity: 0.35, transform: "scale(0.85)" },
              },
              animation: "blink 1.8s ease-in-out infinite",
            }}
          />
          <Typography sx={{ color: "#15803D", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            En ligne
          </Typography>
        </Box>
      </Box>

      {/* ─── SECTION EMPLOYÉS ─── */}
      <SectionLabel title="Employés" subtitle="Effectif salarié permanent" />
      <Grid container spacing={3} sx={{ mb: 4 }}>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <StatCard
            title="Total employés"
            icon={<PeopleIcon sx={{ color: "#fff", fontSize: 22 }} />}
            gradient="linear-gradient(140deg, #1E3A5F 0%, #2C5282 60%, #3B6CB7 100%)"
            total={totalEmp}
            isPending={p1}
            subtitle="Tous statuts confondus"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <StatCard
            title="Employés actifs"
            icon={<CheckCircleIcon sx={{ color: "#fff", fontSize: 22 }} />}
            gradient="linear-gradient(140deg, #00695C 0%, #00897B 60%, #26A69A 100%)"
            total={activeEmp}
            isPending={p2}
            subtitle="En poste actuellement"
            ratio={activeRatio != null ? activeRatio / 100 : undefined}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <RecapCard
            label="Récap employés"
            percent={activeRatio}
            percentColor="#00897B"
            count={(totalEmp ?? 0) - (activeEmp ?? 0)}
            countLabel="Inactifs"
            loading={p1 || p2}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "18px",
              background: "linear-gradient(140deg, #EEF4FF 0%, #E0E9FF 100%)",
              border: "1px solid #C7D8FF",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent sx={{ textAlign: "center", p: "24px !important" }}>
              <GroupIcon sx={{ color: "#3B6CB7", fontSize: 28, mb: 1.5, opacity: 0.7 }} />
              <Typography sx={{ color: "#64748B", mb: 0.75, fontSize: "0.8rem", fontWeight: 500 }}>
                Taux d'activité
              </Typography>
              <Typography
                sx={{
                  color: "#1E3A5F",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 3vw, 2.8rem)",
                  letterSpacing: "-2px",
                  lineHeight: 1,
                  mb: 0.5,
                }}
              >
                {activeRatio != null ? `${activeRatio}%` : "—"}
              </Typography>
              <Typography sx={{ color: "#94A3B8", fontSize: "0.68rem" }}>
                des employés sont actifs
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* ─── SECTION STAGIAIRES ─── */}
      <SectionLabel title="Stagiaires" subtitle="Personnel en stage au sein de l'entreprise" />
      <Grid container spacing={3} sx={{ mb: 4 }}>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <StatCard
            title="Total stagiaires"
            icon={<SchoolIcon sx={{ color: "#fff", fontSize: 22 }} />}
            gradient="linear-gradient(140deg, #92400E 0%, #B45309 60%, #D97706 100%)"
            total={totalInt}
            isPending={p3}
            subtitle="Tous départements"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <StatCard
            title="Stagiaires rémunérés"
            icon={<EuroIcon sx={{ color: "#fff", fontSize: 22 }} />}
            gradient="linear-gradient(140deg, #5B21B6 0%, #7C3AED 60%, #9333EA 100%)"
            total={remuInt}
            isPending={p4}
            subtitle="Avec compensation mensuelle"
            ratio={remuRatio != null ? remuRatio / 100 : undefined}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <RecapCard
            label="Récap stagiaires"
            percent={remuRatio}
            percentColor="#7C3AED"
            count={(totalInt ?? 0) - (remuInt ?? 0)}
            countLabel="Non rémunérés"
            loading={p3 || p4}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "18px",
              background: "linear-gradient(140deg, #FFF8ED 0%, #FEF3C7 100%)",
              border: "1px solid #FDE68A",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent sx={{ textAlign: "center", p: "24px !important" }}>
              <EuroIcon sx={{ color: "#D97706", fontSize: 28, mb: 1.5, opacity: 0.7 }} />
              <Typography sx={{ color: "#78350F", mb: 0.75, fontSize: "0.8rem", fontWeight: 500 }}>
                Taux de rémunération
              </Typography>
              <Typography
                sx={{
                  color: "#92400E",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 3vw, 2.8rem)",
                  letterSpacing: "-2px",
                  lineHeight: 1,
                  mb: 0.5,
                }}
              >
                {remuRatio != null ? `${remuRatio}%` : "—"}
              </Typography>
              <Typography sx={{ color: "#D97706", fontSize: "0.68rem" }}>
                des stagiaires sont rémunérés
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* ─── SYNTHÈSE GLOBALE ─── */}
      <SectionLabel title="Synthèse globale" subtitle="Consolidation de l'ensemble des effectifs" />
      <Grid container spacing={2.5}>
        {[
          { label: "Effectif total (emp. + stag.)", value: (totalEmp ?? 0) + (totalInt ?? 0), color: "#1E3A5F", loading: p1 || p3 },
          { label: "Personnel actif en poste",      value: activeEmp ?? 0,                    color: "#00897B", loading: p2 },
          { label: "Stagiaires rémunérés",          value: remuInt ?? 0,                      color: "#7C3AED", loading: p4 },
          { label: "Stagiaires non rémunérés",      value: (totalInt ?? 0) - (remuInt ?? 0),  color: "#D97706", loading: p3 || p4 },
        ].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.label}>
            <MiniCard {...item} />
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};
