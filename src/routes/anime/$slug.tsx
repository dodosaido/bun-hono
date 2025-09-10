import { useEffect } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { Anime } from "../../../type";
import { Arrow } from "../../components/arrow";

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
    const { apiSlug } = useRouterState({
        select: (s) => s.location.state,
    });

    const { data, isLoading } = useQuery<Anime>({
        queryKey: ["anime", apiSlug],
        queryFn: async () =>
            await fetch(`/api/anime?slug=${apiSlug}`).then((res) => res.json()),
        enabled: !!apiSlug,
    });

    useEffect(() => {
        document.title = slug;
    }, [slug]);

    if (isLoading) return <p className="text-gray-400 italic">Loading...</p>;

    return (
        <div className="*:not-last:mb-4 font-mono">
            <div className="flex items-baseline">
                <Arrow />
                <h2 className="font-black">[{data?.title}]</h2>
            </div>

            <div className="flex">
                <Arrow />
                <figure className="max-w-52 h-28 aspect-video">
                    <img src={data?.imgURL!} alt={data?.title} />
                </figure>
            </div>

            <div className="flex text-sm gap-4">
                {data?.download.map((movie) => (
                    <div key={movie.desc} className="flex items-baseline">
                        <Arrow />
                        <a href={movie.url!} className="link link-hover" target="_blank">{movie.desc}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
