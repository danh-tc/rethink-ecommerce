import { Outlet } from "react-router-dom";

export default function AdminRootPage() {
  return (
    <>
      <div>AdminRootPage</div>
      <main>
        <Outlet />
      </main>
    </>
  );
}
