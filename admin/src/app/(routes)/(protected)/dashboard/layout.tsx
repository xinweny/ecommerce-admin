import { NavBar } from "./_components/nav-bar";



export default async function DashboardLayout({ children }: any) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}