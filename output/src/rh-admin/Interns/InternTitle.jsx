import { useRecordContext } from 'react-admin';

export const InternTitle = () => {
  const record = useRecordContext();
  return <span>{record ? `Modifier : ${record.firstName} ${record.lastName}` : 'Modifier'}</span>;
};