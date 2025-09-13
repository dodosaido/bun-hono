import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { AnimeList, Pagelist } from "@types";
import { Arrow } from "./arrow";
import { Hr } from "./hr";

type Props = {
    page?: string;
};

export function Home({ page }: Props = { page: "" }) {
    page = page ? `/page/${page}` : "";

    const { isPending, isError, error, data } = useQuery<{
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

    console.log(page);

    if (isPending) {
        return <h1 className="italic text-gray-500">Nothing to do ...</h1>;
    }

    if (isError) {
        return (
            <div className="badge badge-error rounded-xs">
                <svg
                    className="size-[1em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g fill="currentColor">
                        <rect
                            x="1.972"
                            y="11"
                            width="20.056"
                            height="2"
                            transform="translate(-4.971 12) rotate(-45)"
                            fill="currentColor"
                            strokeWidth={0}
                        ></rect>
                        <path
                            d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                            strokeWidth={0}
                            fill="currentColor"
                        ></path>
                    </g>
                </svg>
                Oops something wrong!!!
            </div>
        );
    }

    return (
        <>
            {data.data.map((a) => (
                <div key={a.slug}>
                    <div className="flex">
                        <Arrow />
                        <div className="card md:card-side rounded-none max-w-max">
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

                            <div className="card-body p-0 max-md:mt-2 md:ml-4 flex-row items-start">
                                {a.slug!.includes("e") && (
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
