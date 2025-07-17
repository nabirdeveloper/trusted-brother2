'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Shield, Clock } from 'lucide-react';

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 bg-white/95 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Shield className="w-4 h-4 mr-2" />
          Auth Status (Dev Only)
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span>Status:</span>
          <Badge variant={status === 'authenticated' ? 'default' : status === 'loading' ? 'secondary' : 'destructive'}>
            {status}
          </Badge>
        </div>
        
        {session && (
          <>
            <div className="flex items-center justify-between">
              <span>User:</span>
              <span className="font-mono">{session.user.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Email:</span>
              <span className="font-mono text-xs">{session.user.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Role:</span>
              <Badge variant={session.user.role === 'admin' ? 'destructive' : session.user.role === 'moderator' ? 'secondary' : 'outline'}>
                {session.user.role}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>ID:</span>
              <span className="font-mono text-xs">{session.user.id}</span>
            </div>
          </>
        )}
        
        {!session && status !== 'loading' && (
          <div className="text-center text-gray-500">
            Not authenticated
          </div>
        )}
      </CardContent>
    </Card>
  );
}