export const dynamic = "force-dynamic";

import { Notifications } from "@/components/Notifications";
import { SuggestedUsers } from "@/components/SuggestedUsers";
import { auth } from "@clerk/nextjs/server";

export default async function NotificationsPage() {
  // Protect the route if the user is not signed in
  await auth.protect();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        <div className="space-y-4">
          <Notifications />
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <SuggestedUsers />
      </div>
    </div>
  );
}
