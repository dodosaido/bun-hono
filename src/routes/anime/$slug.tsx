import { useEffect } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { Anime } from "@types";
import { Arrow } from "@components/arrow";

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
    const router = useRouter();

    const { isError, data, isLoading } = useQuery<Anime>({
        queryKey: ["anime", slug],
        queryFn: async () => {
            const res = await fetch(`/api/anime?slug=${slug}`);
            if (!res.ok) {
                const body = await res.json();
                throw new Error(body.error || "Failed to fetch anime");
            }
            return res.json();
        },
        enabled: !!slug,
    });
    // redirect kalau error
    useEffect(() => {
        if (isError) {
            router.navigate({ href: "/notfound" });
        }
    }, [isError, router]);

    useEffect(() => {
        if (isLoading) {
            document.title = "myanimelist";
        } else if (data?.title) {
            document.title = data.title;
        } else {
            document.title = "Not found";
        }

        // 👇 cleanup pas unmount
        return () => {
            document.title = "myanimelist"; // default title lo
        };
        // document.title = data?.title || "";
    }, [data, isLoading]);

    if (isLoading) return <p className="text-gray-400 italic">Loading...</p>;

    return (
        <div className="*:not-last:mb-4 font-mono">
            <div className="flex items-baseline">
                <Arrow />
                <h2 className="font-black">[{data?.title}]</h2>
            </div>

            <div className="flex">
                <Arrow />
                <figure className="w-52 aspect-video">
                    <img
                        src={data?.imgURL!}
                        alt={data?.title}
                        className="h-full w-full object-cover"
                    />
                </figure>
            </div>

            <div className="flex gap-4">
                {data?.download.map((movie) => (
                    <div key={movie.desc} className="flex items-baseline">
                        <Arrow />
                        <a
                            href={movie.url!}
                            className="link link-hover text-sm"
                            target="_blank"
                        >
                            {movie.desc}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
