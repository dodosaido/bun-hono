import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Hr } from "../components/hr";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
    <div className="p-4 max-w-4xl mx-auto">
        <header className="px-2 py-4 flex gap-2 justify-center">
            <Link to="/" className="[&.active>span]:text-red-500">
                [<span>Home</span>]
            </Link>
            <Link to="/about" className="[&.active>span]:text-red-500">
                [<span>About</span>]
            </Link>
        </header>
        <Hr />
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
    </div>
);

export const Route = createRootRoute({ component: RootLayout });
