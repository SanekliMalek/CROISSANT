'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRouter } from 'next/navigation';
import AdminContainer from '@/containers/AdminContainer';

export default function AdminLayout() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[#0a0807] text-stone-200 relative overflow-hidden dark-theme">
      <div className="absolute w-[450px] h-[450px] rounded-full bg-red-950/15 top-20 right-10 filter blur-3xl pointer-events-none z-0" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-stone-900/10 bottom-10 left-10 filter blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 w-full min-h-screen">
        <AdminContainer onPageChange={(page) => router.push(page === 'home' ? '/' : '/')} />
      </div>
    </div>
  );
}
