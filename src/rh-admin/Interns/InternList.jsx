import {
  List,
  Datagrid,
  TextField,
  DateField,
  SearchInput,
  EditButton,
  DeleteWithConfirmButton,
  useRecordContext,
} from 'react-admin'
import { Chip } from '@mui/material'

const StatusBadge = (props) => {
  const record = useRecordContext(props)
  if (!record) return null
  return record.active ? (
    <Chip
      label="Actif"
      size="small"
      sx={{ backgroundColor: '#F0FDF4', color: '#15803D', fontWeight: 700, fontSize: '0.72rem', border: '1px solid #86EFAC' }}
    />
  ) : (
    <Chip
      label="Terminé"
      size="small"
      sx={{ backgroundColor: '#FEF2F2', color: '#B91C1C', fontWeight: 700, fontSize: '0.72rem', border: '1px solid #FECACA' }}
    />
  )
}

export const InternList = () => (
  <List filters={[<SearchInput source="q" alwaysOn />]} perPage={10}>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <TextField source="email" label="Email" />
      <TextField source="school" label="École" />
      <TextField source="supervisor" label="Superviseur" />
      <DateField source="startDate" label="Début" />
      <DateField source="endDate" label="Fin" />
      <StatusBadge label="Statut" />
      <EditButton label="" sx={{ minWidth: 0, color: '#64748B' }} />
      <DeleteWithConfirmButton label="" sx={{ minWidth: 0 }} />
    </Datagrid>
  </List>
)
