'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    // Default redirect to teacher portal
    router.replace('/dashboard/teacher');
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-xs text-dark-400">
      Loading your portal...
    </div>
  );
}
