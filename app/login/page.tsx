import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { kanit } from '@/app/ui/fonts';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-start md:h-screen"
      style={{
        backgroundImage: "url('/bg_login.jpg')",
        backgroundSize: 'cover', // Makes the image cover the entire area
        backgroundPosition: 'center', // Centers the image
      }}>
      <div className="relative mx-auto items-left flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 md:ml-10"> {/* Adjusted the margin for left positioning */}
        <div className="flex h-20 w-full items-end rounded-lg bg-white-200 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <h1 className={`${kanit.className} mb-7 text-3xl`}>
            
            </h1>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
