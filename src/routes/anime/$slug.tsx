import { useEffect } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/anime/$slug")({
    // In a loader
    loader: ({ params }) => {
        return {
            slug: params.slug,
        };
    },
    // Or in a component
    component: AnimePage,
});

function AnimePage() {
    // In a component!
    const { slug } = Route.useParams();
    const { apiSlug } = useRouterState({ select: (s) => s.location.state });

    useEffect(() => {
        document.title = slug;
    }, [slug]);

    return <div>api: {apiSlug}</div>;
}
