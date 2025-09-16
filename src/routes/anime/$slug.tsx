import { useEffect, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { Anime } from "@types";
import { Arrow } from "@components/arrow";
import { Loading } from "@components/loading";

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
    const [isSave, setIsSave] = useState(false);

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
    }, [data, isLoading]);

    const handleSave = () => {
        setIsSave(!isSave);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="*:not-last:mb-6">
            <div className="flex items-baseline font-mono">
                <Arrow />
                <h2 className="font-black">[{data?.title}]</h2>
            </div>

            <div className="flex items-baseline">
                <Arrow />
                <div>
                    <div className="mb-1">
                        {data?.download.length === 0
                            ? "No Link Download"
                            : "Download"}
                    </div>
                    <div className="flex flex-wrap gap-1 items-baseline flex-col">
                        {data?.download.map((movie) => (
                            <a
                                key={movie.desc}
                                href={movie.url!}
                                className="link text-sm font-mono hover:line-through"
                                target="_blank"
                            >
                                <span>Gofile-</span>
                                <span>{movie.desc}</span>
                            </a>
                        ))}

                        <Link
                            to="/category/$category"
                            params={{ category: data?.bookmark.url || "" }}
                            className="link text-sm font-mono hover:line-through"
                        >
                            <span>All episode </span>
                            <span>{data?.bookmark.title}</span>
                        </Link>
                        <button title="Add to watchlist" onClick={handleSave}>
                            <ButtonTitle title={isSave} />
                        </button>
                    </div>
                </div>
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

            {(data?.desc || data?.info.length !== 0) && (
                <div className="flex items-baseline">
                    <Arrow />
                    <div>
                        {data?.desc && <p className="mb-4">{data?.desc}</p>}
                        {data?.info.length !== 0 && (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <tbody>
                                        {data?.info.map((i) => (
                                            <tr key={i.th}>
                                                <th>{i.th}</th>
                                                <Td td={i.td} th={i.th} />
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function ButtonTitle({ title }: { title: boolean }) {
    if (title) {
        return (
            <div className="badge badge-xs badge-dash badge-error rounded-xs font-medium shadow-xs leading-0">
                Remove from watchlist
            </div>
        );
    }

    return (
        <div className="badge badge-xs badge-dash badge-neutral rounded-xs font-medium shadow-xs leading-0">
            Add to watchlist
        </div>
    );
}

function Td({ th, td }: { th: string; td: string }) {
    if (th === "Genre") {
        const newArr = td.split(",");
        const genres = newArr.map((s) => s.trim());

        return (
            <td className="flex flex-wrap gap-1 items-center pt-3.5">
                {genres.map((genre) => (
                    <div
                        key={genre}
                        className="badge badge-xs badge-info text-white leading-0"
                    >
                        {genre}
                    </div>
                ))}
            </td>
        );
    }

    return <td>{td}</td>;
}
