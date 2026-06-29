import {
  Layout as RALayout,
  CheckForApplicationUpdate,
  AppBar,
  TitlePortal,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const SIDEBAR_W = 150;

const CustomAppBar = () => (
  <AppBar
    sx={{
      background: "linear-gradient(135deg, #152B47 0%, #1E3A5F 50%, #2C5282 100%)",
      boxShadow: "0 2px 20px rgba(21,43,71,0.40)",
      backdropFilter: "blur(8px)",
      "& .RaAppBar-toolbar": { minHeight: 60, px: 2.5 },
    }}
  >
    <Box display="flex" alignItems="center" gap={1.5} sx={{ mr: 3, flexShrink: 0 }}>
      <Box
        sx={{
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.20)",
          borderRadius: "10px",
          p: "7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PeopleAltIcon sx={{ color: "#fff", fontSize: 18 }} />
      </Box>
      <Typography
        sx={{
          color: "#fff",
          fontWeight: 800,
          fontSize: "0.9rem",
          letterSpacing: "-0.2px",
          lineHeight: 1,
        }}
      >
        RH Admin
      </Typography>
    </Box>
    <TitlePortal />
  </AppBar>
);

export const Layout = ({ children }) => (
  <RALayout
    appBar={CustomAppBar}
    sx={{
      /* ── Conteneur principal ── */
      "& .RaLayout-root": {
        display: "flex",
      },

      /* ── Contenu : prend tout l'espace restant ── */
      "& .RaLayout-content": {
        flex: "1 1 0%",
        minWidth: 0,
        backgroundColor: "#EEF2F7",
        minHeight: "100vh",
        padding: "32px 36px",
        boxSizing: "border-box",
        transition: "padding 0.25s ease",
      },

      /* ── Sidebar ── */
      "& .RaSidebar-root": {
        width: SIDEBAR_W,
        minWidth: SIDEBAR_W,
        flexShrink: 0,
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",

        "& .MuiDrawer-paper": {
          width: SIDEBAR_W,
          background: "linear-gradient(180deg, #0F1E30 0%, #152B47 40%, #1E3A5F 100%)",
          borderRight: "none",
          boxShadow: "4px 0 24px rgba(0,0,0,0.22)",
          overflowX: "hidden",
          transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
        },

        /* Menu wrapper */
        "& .RaMenu-root": {
          pt: 2,
          pb: 2,
        },

        /* Chaque lien */
        "& .RaMenuItemLink-root": {
          color: "rgba(255,255,255,0.65)",
          borderRadius: "10px",
          mx: "8px",
          my: "2px",
          px: "10px",
          py: "9px",
          fontSize: "0.8rem",
          fontWeight: 500,
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          transition: "background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease",

          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.09)",
            color: "#fff",
          },

          "&.RaMenuItemLink-active": {
            background: "linear-gradient(90deg, rgba(0,191,165,0.18) 0%, rgba(255,255,255,0.08) 100%)",
            color: "#fff",
            fontWeight: 700,
            boxShadow: "inset 3px 0 0 #00BFA5",
            "& .MuiListItemIcon-root": { color: "#00E5CC" },
          },
        },

        "& .MuiListItemIcon-root": {
          color: "rgba(255,255,255,0.50)",
          minWidth: 32,
        },

        "& .MuiListItemText-primary": {
          fontSize: "0.8rem",
          fontWeight: "inherit",
          letterSpacing: "0.01em",
        },
      },
    }}
  >
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
