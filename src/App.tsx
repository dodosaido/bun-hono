import { useQuery } from "@tanstack/react-query";
import type { Anime } from "../api/models";

// interface Anime {
//     title: string;
//     imgURL: string | null;
//     slug: string | null;
// }

function App() {
    const { isPending, isError, error, data } = useQuery<Anime[]>({
        queryKey: ["anime-list"],
        queryFn: async () =>
            await fetch("/api/anime-list").then((res) => res.json()),
    });

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
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="p-4">
            {data.map((a) => (
                <div key={a.slug}>
                    <div className="flex">
                        <div className="mr-2 text-gray-500 leading-4">
                            &#8919;
                        </div>
                        <div className="card md:card-side rounded-none max-w-max">
                            <a href="#">
                                <figure className="max-w-52 h-28 aspect-video">
                                    <img src={a.imgURL!} alt={a.title} />
                                </figure>
                            </a>

                            <div className="card-body p-0 max-md:mt-2 md:ml-4 flex-row items-start">
                                {a.slug!.includes("a") && (
                                    <div className="inline-grid *:[grid-area:1/1] mt-[5px]">
                                        <div className="status status-secondary animate-ping"></div>
                                        <div className="status status-secondary"></div>
                                    </div>
                                )}
                                <a className="link">
                                    <h2 className="card-title text-sm">
                                        {a.title}
                                    </h2>
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4 text-gray-700/20" />
                </div>
            ))}
        </div>
    );
}

export default App;
