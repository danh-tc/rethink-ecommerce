import { Outlet } from "react-router-dom";
import { Header } from "../components/index";
import AnnouncementBar from "../components/AnnouncementBar/AnnouncementBar";

export default function RootLayout() {
  return (
    <>
      <AnnouncementBar
        content="Shop the New Collection –– moss |   Free Shipping Nationwide*"
        targetLink="/collections/new-in"
      />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
