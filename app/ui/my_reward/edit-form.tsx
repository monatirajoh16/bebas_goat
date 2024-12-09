'use client';

import { my_rewardField } from '../../lib/definitions'; // Import type definitions
import Link from 'next/link'; // Link for navigation
import { Button } from '../../ui/button'; // Button component
import React from 'react';
import { updateMy_reward } from '@/app/lib/action'; // Import update function
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'; // Icon

export default function EditMyRewardForm({
  my_reward,
}: {
  my_reward: my_rewardField;
}) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget); // Collect form data

    try {
      // Debugging: Ensure correct ID and data are sent
      console.log('Updating my_reward ID:', my_reward.id_my_reward);
      console.log('Form data:', Object.fromEntries(formData));

      // Call backend action to update
      const response = await updateMy_reward(my_reward.id_my_reward, formData);

      if (response?.message === 'Update successful') {
        alert('Reward updated successfully!');
      } else {
        alert('Reward updated successfully!');
      }
    } catch (error) {
      console.error('Reward updated successfully!', error);
      alert('An error occurred while updating the reward.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Poin Field */}
        <div className="mb-4">
          <label htmlFor="poin" className="mb-2 block text-sm font-medium">
            Poin
          </label>
          <div className="relative">
            <input
              id="poin"
              name="poin"
              type="number"
              defaultValue={my_reward.poin} // Set initial value
              placeholder="Enter Poin"
              aria-label="Enter Poin"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm placeholder-gray-500"
              required
              min="1"
              step="1"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/my_reward"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
