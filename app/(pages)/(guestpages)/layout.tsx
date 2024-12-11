'use client'

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, userId } = useAuth();

  // Handle loading state
  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user is authenticated, redirect to dashboard
  if (userId) {
    redirect("/homefeed");
  }

  return <>{children}</>;
} 