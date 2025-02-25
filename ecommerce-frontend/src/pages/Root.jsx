import { Outlet } from "react-router-dom";
import { Header } from "../components/index";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
