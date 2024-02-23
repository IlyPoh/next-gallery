import HeaderNav from "./HeaderNav";
import HeaderLogo from "./HeaderLogo";
import HeaderProfile from "./HeaderProfile";

export default function Header() {
  return (
    <header className="container my-8 flex flex-wrap items-center justify-between">
      <HeaderLogo />
      <HeaderNav />
      <HeaderProfile />
    </header>
  );
}
