import { Link, useLocation } from "react-router-dom";
import { WalletButton } from "@/components/wallet-button";
import { NotificationCenter } from "@/components/notification-center";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminStatus } from "@/hooks/use-admin-status";

export function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { isAdmin } = useAdminStatus();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    // const handleClickOutside = (event: MouseEvent) => { // Unused
    //   if (
    //     mobileMenuOpen &&
    //     mobileMenuRef.current &&
    //     !mobileMenuRef.current.contains(event.target as Node)
    //   ) {
    //     setMobileMenuOpen(false);
    //   }
    // };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    // Temporarily disabled to test button functionality
    // document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      // document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 glass">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center font-bold text-xl shrink-0">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DeCent-Pay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-md ${isActive("/")
                ? "text-primary bg-primary/10"
                : "hover:text-primary hover:bg-primary/5"
                }`}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`text-sm font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-md ${isActive("/jobs")
                ? "text-primary bg-primary/10"
                : "hover:text-primary hover:bg-primary/5"
                }`}
            >
              Browse Jobs
            </Link>
            <Link
              to="/create"
              className={`text-sm font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-md ${isActive("/create")
                ? "text-primary bg-primary/10"
                : "hover:text-primary hover:bg-primary/5"
                }`}
            >
              Create Escrow
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-md ${isActive("/dashboard")
                ? "text-primary bg-primary/10"
                : "hover:text-primary hover:bg-primary/5"
                }`}
            >
              Dashboard
            </Link>

            <Link
              to="/approvals"
              className={`text-sm font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-md ${isActive("/approvals")
                ? "text-primary bg-primary/10"
                : "hover:text-primary hover:bg-primary/5"
                }`}
            >
              Approvals
            </Link>
            <Link
              to="/freelancer"
              className={`text-sm font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-md ${isActive("/freelancer")
                ? "text-primary bg-primary/10"
                : "hover:text-primary hover:bg-primary/5"
                }`}
            >
              My Projects
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-md ${isActive("/admin")
                  ? "text-primary bg-primary/10"
                  : "hover:text-primary hover:bg-primary/5"
                  }`}
              >
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Hide heavy widgets on mobile to keep hamburger visible */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <div className="shrink-0">
              <NotificationCenter />
            </div>
            <div className="shrink-0">
              <WalletButton />
            </div>

            <Button
              aria-label="Toggle menu"
              variant="ghost"
              size="icon"
              className="lg:hidden ml-1 relative z-50"
              onClick={() => {
                if (mobileMenuOpen) {
                  setMobileMenuOpen(false);
                } else {
                  setMobileMenuOpen(true);
                }
              }}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border/40 bg-background"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors py-2 ${isActive("/")
                    ? "text-primary bg-primary/10 px-3 py-2 rounded-md"
                    : "hover:text-primary"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  className={`text-sm font-medium transition-colors py-2 ${isActive("/jobs")
                    ? "text-primary bg-primary/10 px-3 py-2 rounded-md"
                    : "hover:text-primary"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/create"
                  className={`text-sm font-medium transition-colors py-2 ${isActive("/create")
                    ? "text-primary bg-primary/10 px-3 py-2 rounded-md"
                    : "hover:text-primary"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Escrow
                </Link>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors py-2 ${isActive("/dashboard")
                    ? "text-primary bg-primary/10 px-3 py-2 rounded-md"
                    : "hover:text-primary"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/approvals"
                  className={`text-sm font-medium transition-colors py-2 ${isActive("/approvals")
                    ? "text-primary bg-primary/10 px-3 py-2 rounded-md"
                    : "hover:text-primary"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Approvals
                </Link>
                <Link
                  to="/freelancer"
                  className={`text-sm font-medium transition-colors py-2 ${isActive("/freelancer")
                    ? "text-primary bg-primary/10 px-3 py-2 rounded-md"
                    : "hover:text-primary"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Projects
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`text-sm font-medium transition-colors py-2 ${isActive("/admin")
                      ? "text-primary bg-primary/10 px-3 py-2 rounded-md"
                      : "hover:text-primary"
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMobileMenuOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
