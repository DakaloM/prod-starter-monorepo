'use client';
import Image from 'next/image';
import Link from 'next/link';
import forgot_password_bg from '~/assets/forgot-password-bg.png';
import logo from '~/assets/logo.png';


function ForgotPassword() {
  return (
    <section className="relative overflow-hidden  p-0 h-screen bg-gray-700 flex items-center justify-center ">
      <Image 
      src={forgot_password_bg}
      alt='bg'
      className='absolute left-0 right-0 w-full h-full object-cover p-0 m-0'
      />
      <div className='absolute left-0 w-full h-full bg-gray-100/95'>

      </div>
      <div className="w-full flex flex-col md:w-1/3 shadow-lg bg-white h-fit rounded-lg p-8 relative min-h-[200px]">
        <div className="flex items-center justify-between mb-8">
          <Image src={logo} className="w-16 h-auto object-cover" alt="logo" />

          <div className="flex flex-col gap-0 items-center">
            <h1 className="font-bold text-2xl">Welcome back!</h1>
            <p className="text-primary font-semibold text-xs">E-Recruitment</p>
          </div>
        </div>

        <div className="w-full px-10 grid gap-2">
          <div className="flex flex-col w-full items-start">
           
            <h6 className="font-normal text-sm text-gray-400 w-full text-center">Reset your password</h6>
          </div>

          <div className="flex flex-col gap-2 text-center">
            <span className='text-sm font-normal text-gray-400'>
             Only registered users can proceed 
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;

{/* <div className="w-full w-max-2xl h-screen grid place-items-center">
<div className="w-full px-10 grid gap-8">
  <div className="flex flex-col w-full items-start">
    <h4 className="font-bold text-2xl">Welcome back</h4>
    <h6 className="font-light text-sm text-opacity-60">Reset your password</h6>
  </div>
  <ForgotAndResetPasswordForm />
  <div className="flex flex-col gap-2 text-center">
    <span className="font-light text-sm text-opacity-30">
      Already have an account?{' '}
      <Link className="text-primary hover:underline" href="/login">
        Login
      </Link>
    </span>
  </div>
</div>
</div> */}
