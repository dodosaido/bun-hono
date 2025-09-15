import { Loading } from "@components/loading";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import type { Category } from "@types";
import { Arrow } from "@components/arrow";

export const Route = createFileRoute("/category/$category")({
    loader: ({ params }) => {
        return {
            category: params.category,
        };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { category } = Route.useParams();
    const router = useRouter();

    const { isError, data, isLoading } = useQuery<Category>({
        queryKey: ["category", category],
        queryFn: async () => {
            const res = await fetch(`/api/category?c=${category}`);
            if (!res.ok) {
                const body = await res.json();
                throw new Error(body.error || "Failed to fetch anime");
            }
            return res.json();
        },
        enabled: !!category,
    });
    // redirect kalau error
    useEffect(() => {
        if (isError) {
            router.navigate({ href: "/notfound" });
        }
    }, [isError, router]);

    useEffect(() => {
        document.title = category;

        // 👇 cleanup pas unmount
        return () => {
            document.title = "myanimelist"; // default title lo
        };
    }, [category]);

    if (isLoading) return <Loading />;

    return (
        <div className="*:not-last:mb-4 font-mono">
            <div className="flex items-baseline">
                <Arrow />
                <div>
                    <h1 className="card-title mb-4">[{data?.title}]</h1>
                    <div className="flex flex-col gap-1">
                        {data?.eps.map((ep) => (
                            <Link
                                key={ep.title}
                                className="link max-w-max hover:line-through"
                                to="/anime/$slug"
                                params={{ slug: ep.url || "" }}
                            >
                                {ep.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {data?.pages.length !== 0 && (
                <div className="flex items-baseline">
                    <Arrow />
                    <div>
                        <div className="flex gap-2">
                            {data?.pages.map((page) => (
                                <Link
                                    key={page.title}
                                    to="/category/$category"
                                    params={{ category: page.url || "" }}
                                    className="link link-hover hover:line-through"
                                    activeProps={{
                                        className:
                                            "font-bold text-black cursor-default",
                                    }}
                                    disabled={!page.url}
                                >
                                    [{page.title}]
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
