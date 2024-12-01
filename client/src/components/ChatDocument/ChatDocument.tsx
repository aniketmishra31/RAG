import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_PY_URL, BASE_URL } from "../../utils/constants";
import { Document } from "../../types/Types";
import Modal from "../Modal/Modal";
import Navbar from "../Navbar/Navbar";
import "./ChatDocument.css";

const ChatDocument = () => {
    const { id } = useParams();
    const [doc, setDoc] = useState<Document | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pdfId, setPdfId] = useState<string | undefined>(undefined);
    const hasApiKey = doc?.api_key;
    useEffect(() => {
        fetch(`${BASE_URL}/pdf/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                if (!res.ok)
                    throw Error("Could not get data");
                return res.json();
            })
            .then((data) => {
                setDoc(data.document);
            })
            .catch((err: any) => {
                console.log(err);
            })
        fetch(`${BASE_URL}/pdf-id/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                if (!res.ok)
                    throw Error("No pdf id fetched");
                return res.json();
            })
            .then((data) => {
                setPdfId(data.pdf_id);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const genApiKey = () => {
        fetch(`${BASE_URL}/pdf/api-key/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then((res) => {
                if (!res.ok)
                    throw Error("no api key generated");
                return res.json();
            })
            .then((data) => {
                if (doc && !doc.api_key)
                    doc.api_key = data.apiKey;
            })
            .catch((err: any) => {
                console.log(err);
            })
    }
    const handleClick = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    return (
        <>
            <Navbar />
            {
                doc && !isModalOpen &&
                <div className="document">
                    <h2>{doc.title}</h2>
                    <button className="btn" onClick={!hasApiKey ? genApiKey : handleClick}>{!hasApiKey ? "Generate" : "Get"} API Key</button>
                    <p>Chat with this pdf using the API URL below</p>
                    {pdfId && <p>{`${BASE_PY_URL}/ask-pdf/${id}/${pdfId}`}</p>}
                    <p>Try this curl request or copy this on POSTMAN to test</p>
                    <p>{
                            `curl -X POST
                            ${BASE_PY_URL}/ask-pdf/${id}/${pdfId}
                            -H "Content-Type: application/json"
                            -H "X-apiKey: your_generated_api_key"
                            -d '{"query" : "your_query_goes_here",}'`
                    }</p>
                </div>
            }
            {
                doc && isModalOpen &&
                <div className="document">
                    <h2>{doc.title}</h2>
                    <Modal text={doc.api_key} onClose={closeModal} />
                </div>
            }
        </>
    );
}

export default ChatDocument;