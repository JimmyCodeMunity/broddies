import React, { useRef, useState } from "react";
import { cn } from "../../lib/utils";
import {
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  motion as m,
} from "motion/react";
import { Menu, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <m.div
      ref={ref}
      className={cn("sticky inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </m.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <m.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34,42,53,0.06), 0 1px 1px rgba(0,0,0,0.05)"
          : "none",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-[60] mx-auto hidden max-w-7xl w-full items-center justify-between rounded-full px-4 py-2 lg:flex dark:bg-transparent",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </m.div>
  );
};

export const NavItems = ({ items, className, onItemClick }) => {
  const [hovered, setHovered] = useState(null);
  return (
    <m.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-4 text-sm text-zinc-600 lg:flex",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          key={idx}
          to={item.link}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
        >
          {hovered === idx && (
            <m.div
              layoutId="hovered"
              className="absolute inset-0 rounded-full bg-gray-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
          {item.badge && (
            <span className="absolute -top-2 -right-1 z-30 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {item.badge}
            </span>
          )}
        </Link>
      ))}
    </m.div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <m.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34,42,53,0.06), 0 1px 1px rgba(0,0,0,0.05)"
          : "none",
        borderRadius: visible ? "1rem" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-4 py-2 lg:hidden",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </m.div>
  );
};

export const MobileNavHeader = ({ children, className }) => {
  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col gap-4 rounded-lg bg-white px-4 py-8 dark:bg-neutral-950",
            className
          )}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return isOpen ? (
    <XCircle className="text-black text-white" onClick={onClick} />
  ) : (
    <Menu className="text-black text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => (
  <Link
    to="/"
    className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-medium"
  >
    <img
      src="../images/broddie.jpeg"
      alt="logo"
      width={30}
      height={30}
    />
    <span className="text-xl text-white">Broddie's Collection</span>
  </Link>
);

export const NavbarButton = ({
  to,
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-md text-sm font-bold cursor-pointer inline-block text-center transition duration-200";
  const variants = {
    primary:
      "bg-white text-black shadow-md hover:-translate-y-0.5",
    secondary:
      "bg-transparent dark:text-white",
    dark: "bg-black text-white shadow",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow",
  };

  return (
    <Link
      to={to}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default function NavbarWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { name: "Home", link: "#home" },
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
  ];

  return (
    <Navbar>
      <>
        <NavBody>
          <NavbarLogo />
          <NavItems items={items} onItemClick={() => setIsOpen(false)} />
          <NavbarButton to="#get-started">Get Started</NavbarButton>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen}>
            {items.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-black dark:text-white"
              >
                {item.name}
              </Link>
            ))}
            <NavbarButton to="#get-started" variant="primary">
              Get Started
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </>
    </Navbar>
  );
}
