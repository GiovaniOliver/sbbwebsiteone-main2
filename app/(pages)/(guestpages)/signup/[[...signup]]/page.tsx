// /app/pages/signup.tsx
import { Navbar } from '@/app/components/guestpagecomponents/homecomponents/NavbarGuest';
import { SignUp } from "@clerk/nextjs";

const SignupPage = async () => {
  return (
  <div className="">
     <Navbar />
    <section className="container">
      <div className='flex jestify-center'>
   
      <SignUp />

      </div>
      
    </section>
      
          
    </div>
  )
}

export default SignupPage
