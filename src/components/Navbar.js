import { Link, NavLink, useNavigate } from 'react-router-dom';
export default function Navbar({ signedIn, onLogout }) {
  const navigate = useNavigate();
  return <header className="site-header"><nav className="nav-inner" aria-label="Main navigation">
    <Link className="brand" to="/"><span className="brand-mark" aria-hidden="true">n.</span>iNoteBook<span className="brand-dot">.</span></Link>
    <div className="nav-links">
      {signedIn && <NavLink to="/" end>My notes</NavLink>}
      <NavLink to="/about">About</NavLink>
      {signedIn ? <button className="button button-outline small" onClick={() => { onLogout(); navigate('/login'); }}>Log out</button> : <><NavLink to="/login">Log in</NavLink><Link className="button small" to="/signup">Get started <span aria-hidden="true">↗</span></Link></>}
    </div>
  </nav></header>;
}
