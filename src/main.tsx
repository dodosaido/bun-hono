import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";

const queryClient = new QueryClient();

// Register things for typesafety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
    interface HistoryState {
        apiSlug?: string;
    }
}

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
    routeTree,
    defaultNotFoundComponent: () => <p>Oops not found</p>,
    scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
);
