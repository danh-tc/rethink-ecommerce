import { Outlet } from "react-router-dom";

export default function ProductManegementPage() {
  return (
    <>
      <div>ProductManegement</div>
      <main>
        <Outlet />
      </main>
    </>
  );
}
