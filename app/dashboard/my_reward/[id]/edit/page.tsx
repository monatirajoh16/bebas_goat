import Form from '@/app/ui/my_reward/edit-form'; // Import form component
import Breadcrumbs from '@/app/ui/my_reward/breadcrumbs'; // Breadcrumbs component
import { fetchMy_rewardById } from '@/app/lib/data'; // Fetch necessary data
import { notFound } from 'next/navigation';

// Since this is a dynamic route with [id], ensure that params are awaited before use.
export default async function Page({ params }: { params: { id: string } }) {
  // Await the params object before using it
  const { id } = await params;

  if (!id) {
    return notFound(); // Return not found if id is missing
  }

  try {
    const my_reward = await fetchMy_rewardById(id); // Fetch data by ID

    if (!my_reward) {
      return notFound(); // Return not found if my_reward is not found
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'My Reward', href: '/dashboard/my_reward' },
            {
              label: 'Update My Reward',
              href: `/dashboard/my_reward/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form my_reward={my_reward} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching my_reward data:', error);
    return notFound(); // Gracefully handle potential errors during fetch
  }
}
