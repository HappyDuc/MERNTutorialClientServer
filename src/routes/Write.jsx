import { useAuth, useUser } from "@clerk/react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

const Write = () => {
    const { isLoaded, isSignedIn } = useUser();
    const [value, setValue] = useState("");
    const [cover, setCover] = useState("");
    const [img, setImg] = useState("");
    const [video, setVideo] = useState("");
    const [progress, setProgress] = useState(0);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(() => {
        img && setValue((prev) => prev + `<p><image src="${img.url}"/></p`);
    }, [img]);

    useEffect(() => {
        video &&
            setValue(
                (prev) =>
                    prev + `<p><iframe class=ql-video src="${video.url}"/></p`,
            );
    }, [video]);

    const navigate = useNavigate();

    const { getToken } = useAuth();

    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken();
            return axios.post(
                `${import.meta.env.VITE_API_URL}/posts`,
                newPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        },
        onSuccess: (res) => {
            toast.success("Post has been created.");
            navigate(`/${res.data.slug}`);
        },
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (isLoaded && !isSignedIn) {
        return <div>You must be logged in to view this page.</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (progress !== 100) {
            toast.warning(
                "Please upload the cover image before submitting a post.",
            );
            return;
        }
        if (title === "") {
            toast.warning("Please add a title to your post.");
            return;
        }
        if (desc === "") {
            toast.warning("Please add a description to your post.");
            return;
        }

        const formData = new FormData(e.target);

        const data = {
            img: cover.filePath || "",
            title: formData.get("title"),
            category: formData.get("category"),
            desc: formData.get("desc"),
            content: value,
        };
        console.log(data);

        mutation.mutate(data);
    };

    return (
        <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
            <h1 className="text-xl font-light">Create a New Post</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 flex-1 mb-6"
            >
                <Upload
                    type="image"
                    setProgress={setProgress}
                    setData={setCover}
                >
                    <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white cursor-pointer">
                        Add a cover image
                    </button>
                </Upload>
                <input
                    className="p-4 text-4xl font-semibold bg-white outline-none rounded-xl shadow-md"
                    type="text"
                    placeholder="Enter post title here..."
                    name="title"
                    value={title}
                    onChange={setTitle}
                />
                <div className="flex items-center gap-4">
                    <label className="text-sm">Choose a category:</label>
                    <select
                        name="category"
                        className="p-2 rounded-xl bg-white shadow-md"
                    >
                        <option value="general">General</option>
                        <option value="Web-design">Web Design</option>
                        <option value="development">Development</option>
                        <option value="databases">Databases</option>
                        <option value="search-engines">Search Engines</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>
                <textarea
                    className="p-4 rounded-xl bg-white shadow-md"
                    name="desc"
                    placeholder="A Short Description"
                    value={desc}
                    onChange={setDesc}
                />
                <div className="flex flex-1">
                    <div className="flex flex-col gap-2 mr-2">
                        <Upload
                            type="image"
                            setProgress={setProgress}
                            setData={setImg}
                        >
                            🌆
                        </Upload>
                        <Upload
                            type="video"
                            setProgress={setProgress}
                            setData={setVideo}
                        >
                            ▶️
                        </Upload>
                    </div>
                    <ReactQuill
                        theme="snow"
                        className="flex-1 rounded-xl bg-white shadow-md"
                        value={value}
                        onChange={setValue}
                        readOnly={0 < progress && progress < 100}
                    />
                </div>
                <button
                    disabled={
                        mutation.isPending || (0 < progress && progress < 100)
                    }
                    className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {mutation.isPending ? "Loading..." : "Send"}
                </button>
                {"Progress:" + progress + "%"}
                {mutation.isError && <span>{mutation.error.message}. If you are seeing this, check you have enterred a title, description AND body text as well as adding a cover image and try again.</span>}
            </form>
        </div>
    );
};

export default Write;
