// app/event/page.tsx (Server Component)

import { Suspense } from "react";
import EventPage from "./EventPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventPage />
    </Suspense>
  );
}
