import { Hr } from "@components/hr";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const navbars = [
    { route: "/", routeName: "Home" },
    { route: "/about", routeName: "About" },
];

const RootLayout = () => (
    <div className="p-4 max-w-4xl mx-auto flex flex-col *:last:mt-auto min-h-lvh">
        <header className="px-2 py-4 flex gap-2 justify-center text-sm font-mono items-baseline">
            {navbars.map((navbar) => (
                <Link
                    key={navbar.route}
                    activeProps={{
                        className: "font-bold text-black cursor-default",
                    }}
                    to={navbar.route}
                    disabled={navbar.route === "/about"}
                    className="aria-disabled:opacity-50 aria-disabled:cursor-default"
                >
                    [<span>{navbar.routeName}</span>]
                </Link>
            ))}
        </header>
        <Hr />
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
        <footer className="text-[12px] text-gray-400 text-center pt-10">
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </footer>
    </div>
);

export const Route = createRootRoute({ component: RootLayout });
