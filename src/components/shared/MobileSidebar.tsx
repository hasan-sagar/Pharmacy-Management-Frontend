import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  ChevronDown,
  Handshake,
  ListChecks,
  ListCollapse,
  Menu,
  Package2Icon,
  PieChart,
  Store,
  WalletCards,
} from "lucide-react";

import { CircleUser, LineChart, Package, Package2 } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { NavLink, useNavigate } from "react-router-dom";

export default function MobileSidebar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isDropdownOpenPurchase, setIsDropdownOpenPurchase] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownPurchase = () => {
    setIsDropdownOpenPurchase(!isDropdownOpenPurchase);
  };

  //logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(0);
  };
  return (
    <div>
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
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
                <LineChart className="h-4 w-4" />
                Point of sale
              </NavLink>
              <NavLink
                to="/sales"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                }
              >
                <Store className="h-4 w-4" />
                Sales
              </NavLink>

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
                <Collapsible
                  open={isDropdownOpen}
                  onOpenChange={setIsDropdownOpen}
                >
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
                        to="/products/inStock"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                            : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        }
                      >
                        Stock in Products
                      </NavLink>
                      <a
                        href="/products/expired"
                        className="dropdown-item block px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        Expired Products
                      </a>
                      <a
                        href="/products/stockOut"
                        className="dropdown-item block px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        Stock out
                      </a>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              {/* <a
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
              </a>

              <a
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <PieChart className="h-5 w-5" />
                Dashboard
              </a>
              <a
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Store className="h-5 w-5" />
                Point of sale
              </a>
              <a
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Stocks
              </a>
              <a
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <ListCollapse className="h-5 w-5" />
                Category
              </a>
              <a
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <WalletCards className="h-5 w-5" />
                Brand
              </a>
              <a
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <ListChecks className="h-5 w-5" />
                Generics
              </a>
              <a
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Handshake className="h-5 w-5" />
                Suppliers
              </a>
              <a
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Purchase
              </a>
              <div>
                <Collapsible
                  open={isDropdownOpen}
                  onOpenChange={setIsDropdownOpen}
                >
                  <CollapsibleTrigger asChild>
                    <a
                      href="#"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      onClick={toggleDropdown}
                    >
                      <Package2Icon className="h-5 w-5" />
                      Products
                      <ChevronDown className="h-3 w-3" />
                    </a>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-8">
                      <a
                        href="#"
                        className="dropdown-item block px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        All Products
                      </a>
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
              </div> */}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          <form>
            <div className="relative"></div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <NavLink to="/users">Settings</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </div>
  );
}
