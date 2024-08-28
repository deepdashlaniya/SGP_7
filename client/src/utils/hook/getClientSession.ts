'use client';

import { useSession } from 'next-auth/react';

// Custom hook to get client session
const useClientSession = () => {
  const { data: session, status } = useSession();

  return { session, status };
};

export default useClientSession;
