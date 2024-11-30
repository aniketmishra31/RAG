import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { BASE_PY_URL } from "../../utils/constants";
import "./FileUpload.css"
const FileUpload = () => {
    const { userId } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("user_id", userId ?? "");
        fetch(`${BASE_PY_URL}/upload-pdf`, {
            method: "POST",
            body: formData
        })
            .then(res => {
                if (!res.ok)
                    throw Error("File did not uploaded successfully");
                return res.json();
            })
            .then((data: any) => {
                console.log(data);
                navigate("/profile");
            })
            .catch((err: any) => {
                console.log(err);
            });
    }
    return (
        <>
            <div className="file-upload">
                <div className="upload">
                    <h2>Upload your PDF</h2>
                    <form method="POST" action={`${BASE_PY_URL}/upload-pdf`} encType="multipart/form-data" onSubmit={handleSubmit}>
                        <label htmlFor="title">PDF Title:</label>
                        <input type="text" name="title" placeholder="Enter the title" required />
                        <label className="label" htmlFor="upload">
                            Upload PDF File here
                        </label>
                        <input type="file" id="upload" name="file" accept=".pdf" required />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default FileUpload;