import HeaderNav from './HeaderNav';
import HeaderLogo from './HeaderLogo';
import HeaderProfile from './HeaderProfile';

export default function Header() {
  return (
    <header className='container mx-auto my-8 flex items-center justify-between px-4 flex-wrap'>
      <HeaderLogo />
      <HeaderNav />
      <HeaderProfile />
    </header>
  );
}
