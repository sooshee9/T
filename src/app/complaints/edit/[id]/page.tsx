import EditComplaintClient from '../../../../components/complaints/EditComplaintClient';

export function generateStaticParams() {
  return [];
}

export const dynamic = 'force-dynamic';

export default function EditComplaintPage() {
  return <EditComplaintClient />;
}