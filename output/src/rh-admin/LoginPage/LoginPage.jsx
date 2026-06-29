import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LoginIcon from "@mui/icons-material/Login";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ username, password });
    } catch (err) {
      setError(err?.message ?? "Identifiant ou mot de passe incorrect");
      notify("Connexion échouée", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0F1E30 0%, #1E3A5F 50%, #2C5282 100%)",
        p: 2,
        position: "relative",
        overflow: "hidden",
        /* Cercles décoratifs */
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-15%",
          left: "-8%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(0,191,165,0.06)",
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>

        {/* Logo + titre */}
        <Box textAlign="center" mb={3}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: "18px",
              background: "linear-gradient(135deg, #00897B, #00BFA5)",
              boxShadow: "0 8px 24px rgba(0,191,165,0.35)",
              mb: 2,
            }}
          >
            <PeopleAltIcon sx={{ color: "#fff", fontSize: 32 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: 900,
              letterSpacing: "-0.8px",
              mb: 0.5,
            }}
          >
            RH Admin
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
            Connectez-vous pour accéder au tableau de bord
          </Typography>
        </Box>

        {/* Carte formulaire */}
        <Card
          elevation={0}
          sx={{
            borderRadius: "20px",
            background: "#fff",
            boxShadow: "0 24px 64px rgba(0,0,0,0.30)",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: "36px !important" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#0F1E30", mb: 0.5 }}
            >
              Connexion
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B", mb: 3, fontSize: "0.85rem" }}>
              Entrez vos identifiants pour continuer
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{ mb: 2.5, borderRadius: 2, fontSize: "0.83rem" }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Box mb={2.5}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#334155", mb: 0.75, display: "block", fontSize: "0.78rem" }}
                >
                  Identifiant
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="ex : admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      "&:hover fieldset": { borderColor: "#1E3A5F" },
                      "&.Mui-focused fieldset": { borderColor: "#1E3A5F" },
                    },
                  }}
                />
              </Box>

              <Box mb={3}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#334155", mb: 0.75, display: "block", fontSize: "0.78rem" }}
                >
                  Mot de passe
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowPassword((v) => !v)}
                          edge="end"
                          tabIndex={-1}
                        >
                          {showPassword
                            ? <VisibilityOffIcon sx={{ fontSize: 18, color: "#94A3B8" }} />
                            : <VisibilityIcon sx={{ fontSize: 18, color: "#94A3B8" }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      "&:hover fieldset": { borderColor: "#1E3A5F" },
                      "&.Mui-focused fieldset": { borderColor: "#1E3A5F" },
                    },
                  }}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || !username || !password}
                endIcon={<LoginIcon />}
                sx={{
                  background: "linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)",
                  borderRadius: "10px",
                  py: 1.25,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "0 4px 14px rgba(30,58,95,0.35)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #152B47 0%, #1E3A5F 100%)",
                    boxShadow: "0 6px 20px rgba(30,58,95,0.45)",
                  },
                  "&:disabled": {
                    background: "#E2E8F0",
                    color: "#94A3B8",
                    boxShadow: "none",
                  },
                }}
              >
                {loading ? "Connexion en cours…" : "Se connecter"}
              </Button>
            </Box>

          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
