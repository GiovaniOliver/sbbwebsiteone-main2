/* eslint-disable react/no-unescaped-entities */
// /app/pages/login.tsx
'use client'

import { Navbar } from '@/app/components/guestpagecomponents/homecomponents/NavbarGuest';
import { SignIn } from "@clerk/nextjs";

<Navbar />

const LoginPage = () => {
 
 
  return (

    <div>
       <Navbar/>
     
      <SignIn /> 
    </div>
    
    
  )
}

export default LoginPage
