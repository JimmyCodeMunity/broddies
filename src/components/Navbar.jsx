import { Link } from "react-router-dom";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/NavbarComponents";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export const NavbarDemo = () => {
  const { cartItems } = useContext(CartContext);
  const cartItemCount = cartItems?.length || 0;

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/view-all-art" },
    // { name: "Blog", link: "#contact" },
    { 
      name: "Cart", 
      link: "/cart",
      badge: cartItemCount > 0 ? cartItemCount : null
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userdata, isUserAuthenticated, logout } = useContext(AuthContext);
  console.log("user", userdata);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {isUserAuthenticated ? (
              <>
                <Link to="/login">
                  <NavbarButton variant="secondary">
                    {userdata?.username}
                  </NavbarButton>
                </Link>
                <Link onClick={logout}>
                  <NavbarButton variant="secondary">
                    Logout
                  </NavbarButton>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <NavbarButton variant="secondary">Login</NavbarButton>
                </Link>
                <Link to="/register">
                  <NavbarButton variant="primary">Sign Up</NavbarButton>
                </Link>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen}>
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            {isUserAuthenticated ? (
              <>
                <Link to="/login">
                  <NavbarButton variant="secondary">
                    {userdata?.username}
                  </NavbarButton>
                </Link>
                <Link onClick={logout}>
                  <NavbarButton variant="secondary">
                    Logout
                  </NavbarButton>
                </Link>
              </>
            ) : (
              <>
              <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                // onClick={() => setIsMobileMenuOpen(false)}
                onClick={logout}
                variant="primary"
                className="w-full"
              >
                Logout
              </NavbarButton>
            </div></>
            )}
            
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* <DummyContent /> */}
    </div>
  );
};
