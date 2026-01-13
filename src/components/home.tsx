import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { AnimeList, Pagelist } from "@types";
import { Arrow } from "./arrow";
import { Hr } from "./hr";
import { Loading } from "./loading";
import { BorderFavorite } from "./borderFavorite";

type Props = {
    page?: string;
};

export function Home({ page }: Props = { page: "" }) {
    page = page ? `/page/${page}` : "";

    const { isPending, isError, data } = useQuery<{
        data: AnimeList[];
        pages: Pagelist[];
    }>({
        queryKey: ["anime-list", page],
        queryFn: async () =>
            await fetch(`/api/anime-list?page=${page}`).then((res) =>
                res.json(),
            ),
        staleTime: 1000 * 60 * 1, // 1 menit dianggap fresh
    });

    if (isPending) {
        return <Loading />;
    }

    if (isError) {
        return (
            <div role="alert" className="alert alert-error">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>Oops someting wrong!!!</span>
            </div>
        );
    }

    return (
        <>
            {data.data.map((a) => (
                <div key={a.slug}>
                    <div className="flex">
                        <Arrow />
                        <div className="card md:card-side rounded-none max-w-max relative">
                            <Link
                                to="/anime/$slug"
                                params={{ slug: a.slug || "" }}
                            >
                                <figure className="w-52 aspect-video">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={a.imgURL!}
                                        alt={a.title}
                                    />
                                </figure>
                            </Link>

                            <BorderFavorite slug={a.slug} />

                            <div className="card-body p-0 max-md:mt-2 md:ml-4 flex-row items-start">
                                {a.slug!.includes("selesai") && (
                                    <div className="inline-grid *:[grid-area:1/1] mt-[5px]">
                                        <div className="status status-secondary animate-ping"></div>
                                        <div className="status status-secondary"></div>
                                    </div>
                                )}
                                <Link
                                    to="/anime/$slug"
                                    params={{ slug: a.slug || "" }}
                                    className="link"
                                >
                                    <h2 className="card-title text-sm">
                                        {a.title}
                                    </h2>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Hr />
                </div>
            ))}
            <div className="text-center">
                <ul className="join gap-2">
                    {data.pages.map((page) => (
                        <li
                            key={page.desc}
                            className="text-sm font-mono join-item"
                        >
                            <Link
                                to={page.url ? page.url : ""}
                                activeProps={{
                                    className:
                                        "[&>span]:font-black [&>span]:text-gray-400 text-red-400 cursor-default",
                                }}
                                className="hover:*:[span]:text-red-400"
                            >
                                [<span>{page.desc}</span>]
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
