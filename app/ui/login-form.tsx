'use client';

import { poppins } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // Simulated local authentication function
  async function localAuthenticate(formData: FormData): Promise<string | null> {
    const email = formData.get('email');
    const password = formData.get('password');

    console.log("Authenticating", { email, password });

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check credentials and return role based on email
    if (email === 'karyawan@nextmail.com' && password === '123456') {
      localStorage.setItem('role', 'karyawan'); // Set role as 'karyawan'
      return 'karyawan'; 
    } else if (email === 'spv@nextmail.com' && password === '123456') {
      localStorage.setItem('role', 'spv'); // Set role as 'spv'
      return 'spv'; 
    } else {
      return 'Invalid email or password'; // Login failed
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await localAuthenticate(formData);

    if (result === 'spv' || result === 'karyawan') {
      router.push('/dashboard'); // Redirect to dashboard for either role
    } else {
      setErrorMessage(result); // Show error message
    }

    setIsPending(false);
  };

  return (
    <div className="flex justify-end items-left mx-auto w-full">
      <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md ml-8">
        <div className="rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`${poppins.className} mb-3 text-5xl`}>
            <strong>belikopi.</strong>
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 bg-orange-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-black-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 bg-orange-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black-900"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-black-900" />
              </div>
            </div>
          </div>
          <LoginButton isPending={isPending} />
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

// Simplified LoginButton component
function LoginButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      className={`shadow-lg mt-4 text-gray-800 w-full transition text-black ease-in-out delay-150 bg-gradient-to-r from-white via-blue-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ${
        isPending ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={isPending}
    >
      {isPending ? 'Logging in...' : 'Login'}
      <ArrowRightIcon className="ml-auto text-gray-800 h-5 w-5" />
    </button>
  );
}
