import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Home } from "@components/home";

export const Route = createFileRoute("/page/$page")({
    // In a loader
    loader: ({ params }) => {
        return {
            page: params.page,
        };
    },
    component: PageComponent,
});

function PageComponent() {
    const { page } = Route.useParams();

    useEffect(() => {
        const title = "myanimelist";

        document.title = title + " - Page " + page;

        return () => {
            document.title = title;
        };
    }, [page]);

    return <Home page={page} />;
}
