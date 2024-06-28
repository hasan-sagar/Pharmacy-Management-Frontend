import {
  BadgeDollarSign,
  ChevronDown,
  Handshake,
  LineChart,
  ListCollapse,
  Package,
  Package2Icon,
  PieChart,
  Store,
  WalletCards,
} from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenPurchase, setIsDropdownOpenPurchase] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownPurchase = () => {
    setIsDropdownOpenPurchase(!isDropdownOpenPurchase);
  };

  return (
    <div className="sidebar">
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            }
          >
            <PieChart className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink
            to="/pos"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            }
          >
            <Store className="h-4 w-4" />
            Point of sale
          </NavLink>
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <LineChart className="h-4 w-4" />
            Stocks
          </a>

          <NavLink
            to="/category"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            }
          >
            <ListCollapse className="h-4 w-4" />
            Category
          </NavLink>
          <NavLink
            to="/brands"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            }
          >
            <WalletCards className="h-4 w-4" />
            Brand
          </NavLink>

          <NavLink
            to="/suppliers"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            }
          >
            <Handshake className="h-4 w-4" />
            Suppliers
          </NavLink>

          <div>
            <Collapsible
              open={isDropdownOpenPurchase}
              onOpenChange={setIsDropdownOpenPurchase}
            >
              <CollapsibleTrigger asChild>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={toggleDropdownPurchase}
                >
                  <Package className="h-4 w-4" />
                  Purchase
                  <ChevronDown className="h-3 w-3" />
                </a>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-8">
                  <NavLink
                    to="/product/purchase"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    }
                  >
                    All Purchase
                  </NavLink>
                  <a
                    href="/purchase/create"
                    className="dropdown-item block px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    Add Purchase
                  </a>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div>
            <Collapsible open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <CollapsibleTrigger asChild>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={toggleDropdown}
                >
                  <Package2Icon className="h-4 w-4" />
                  Products
                  <ChevronDown className="h-3 w-3" />
                </a>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-8">
                  <NavLink
                    to="/products"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    }
                  >
                    All Products
                  </NavLink>
                  <a
                    href="#"
                    className="dropdown-item block px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    Expired Products
                  </a>
                  <a
                    href="#"
                    className="dropdown-item block px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    Stock out
                  </a>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <BadgeDollarSign className="h-4 w-4" />
            Expense
          </a>
        </nav>
      </div>
    </div>
  );
}
