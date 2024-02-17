import HeaderNav from './HeaderNav';
import HeaderLogo from './HeaderLogo';
import HeaderProfile from './HeaderProfile';

export default function Header() {
  return (
    <header className='container flex flex-wrap items-center justify-between my-8'>
      <HeaderLogo />
      <HeaderNav />
      <HeaderProfile />
    </header>
  );
}
