"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ComplaintForm } from './ComplaintForm';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Complaint } from '../../types/complaint';

export default function EditComplaintClient() {
  const router = useRouter();
  const { id } = useParams();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComplaint() {
      try {
        const docRef = doc(db, 'complaints', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setComplaint({ id: docSnap.id, ...docSnap.data() } as Complaint);
        } else {
          setComplaint(null);
        }
      } catch (error) {
        console.error('Error fetching complaint:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchComplaint();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!complaint) return <div className="p-8">Complaint not found</div>;

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Complaint</h1>
        <button onClick={() => router.push('/')}>Close</button>
      </div>
      <ComplaintForm complaint={complaint} onSuccess={() => router.push('/?refresh=1')} />
    </div>
  );
}
