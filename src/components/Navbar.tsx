import { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");

  return (
    <Disclosure as="nav" className="navbar-custom">
      {({ open, close }) => (
        <>
          <div className="navbar-container">
            {/* Brand */}
            <a
              href="#"
              className="navbar-brand"
              onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
              }}
            >
              sai kumar
            </a>

            {/* Desktop Navigation - hidden on mobile */}
            <div className="navbar-desktop">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`nav-link ${active === link.title ? "active" : ""}`}
                  onClick={() => setActive(link.title)}
                >
                  {link.title}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <DisclosureButton className="navbar-toggle">
              <span className="sr-only">Open menu</span>
              {open ? (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </DisclosureButton>
          </div>

          {/* Mobile Navigation Panel */}
          <DisclosurePanel className="navbar-mobile">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link-mobile ${active === link.title ? "active" : ""}`}
                onClick={() => {
                  setActive(link.title);
                  close();
                }}
              >
                {link.title}
              </a>
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
