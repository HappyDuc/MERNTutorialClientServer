/*
This is how the tutorial does the image upload button and logic, it does not work for the newer version of the ImageKit SKD/API but I leave it in for completeness.
*/

import { toast } from "react-toastify";
import { upload } from "@imagekit/react";
import { useRef } from "react";

const authenticator = async () => {
    try {
        // Perform the request to the upload authentication endpoint.
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/posts/upload-auth`,
        );
        if (!response.ok) {
            // If the server response is not successful, extract the error text for debugging.
            const errorText = await response.text();
            throw new Error(
                `Request failed with status ${response.status}: ${errorText}`,
            );
        }

        // Parse and destructure the response JSON for upload credentials.
        const data = await response.json();
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        // Log the original error for debugging before rethrowing a new error.
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
};

const Upload = ({ children, type, setProgress, setData }) => {
    const ref = useRef(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        try {
            const { signature, expire, token, publicKey } =
                await authenticator();

            const result = await upload({
                file,
                fileName: file.name,
                useUniqueFileName: true,

                // authentication details
                signature,
                expire,
                token,
                publicKey,

                onProgress: (event) => {
                    const percent = Math.round(
                        (event.loaded / event.total) * 100,
                    );

                    setProgress(percent);
                },
            });

            setData(result);
        } catch (error) {
            console.error(error);
            toast.error("Image upload failed!");
        }
    };

    return (
        <>
            <input
                type="file"
                ref={ref}
                className="hidden"
                accept={`${type}/*`}
                onChange={handleUpload}
            />

            <div className="cursor-pointer" onClick={() => ref.current.click()}>
                {children}
            </div>
        </>
    );
};

export default Upload;
