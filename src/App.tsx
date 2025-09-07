import { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // async function biar lebih rapi
        const fetchData = async () => {
            try {
                const res = await fetch("/api"); // endpoint Hono lo
                const data = await res.json();
                setMessage(data.message);
            } catch (err) {
                // console.error("Error fetching data:", err);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (!message) return <h1 className="italic text-gray-500">Nothing to do ...</h1>;

    return (
        <>
            <h1 className="text-2xl underline text-rose-400">
                Hello {message}
            </h1>
        </>
    );
}

export default App;
