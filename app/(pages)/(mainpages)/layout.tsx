'use client'
import { ClerkProvider } from '@clerk/nextjs'
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Toaster } from "@/app/components/ui/toaster"

export default function ProtectedLayout({
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

  // If user is not authenticated, redirect to sign-in page
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <ClerkProvider dynamic>
      <>
        {children}
        <Toaster />
      </>
    </ClerkProvider>
  );
} 