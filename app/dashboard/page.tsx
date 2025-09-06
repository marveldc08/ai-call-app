// app/event/page.tsx (Server Component)

import { Suspense } from "react";
import DashboardPage from "./DashBoardPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
