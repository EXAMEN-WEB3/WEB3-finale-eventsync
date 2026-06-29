import { useRecordContext, useUpdate } from "react-admin";
import { Button } from "@mui/material";
import CheckCircleIcon  from "@mui/icons-material/CheckCircle";
import CancelIcon       from "@mui/icons-material/Cancel";


export const QuickStatusToggle = () => {
 
  const record = useRecordContext();

  const [update, { isPending }] = useUpdate();

  if (!record) return null;

  const handleToggle = () => {
    update("employees", {
      id:           record.id,
      data:         { ...record, active: !record.active },
      previousData: record,         
    });
  };

  return record.active ? (
    <Button
      variant="contained"
      color="error"
      size="small"
      startIcon={<CancelIcon />}
      onClick={handleToggle}
      disabled={isPending}
    >
      Désactiver
    </Button>
  ) : (
    <Button
      variant="contained"
      color="success"
      size="small"
      startIcon={<CheckCircleIcon />}
      onClick={handleToggle}
      disabled={isPending}
    >
      Activer
    </Button>
  );
};
