import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="SBB DAO Logo"
          width={120}
          height={120}
          className="mx-auto"
        />
      </div>
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white/80 backdrop-blur-sm shadow-xl border border-gray-100",
              headerTitle: "text-2xl font-bold text-gray-900",
              headerSubtitle: "text-gray-600",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-medium",
              formFieldInput: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              footerActionLink: "text-blue-600 hover:text-blue-700 font-medium",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500 bg-white px-2",
              socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
              socialButtonsBlockButtonText: "text-gray-600 font-medium",
              formFieldLabel: "text-gray-700 font-medium",
              identityPreviewText: "text-gray-700",
              identityPreviewEditButton: "text-blue-600 hover:text-blue-700",
            },
          }}
          afterSignUpUrl="/homefeed"
          path="/sign-up"
        />
      </div>
    </div>
  );
} 