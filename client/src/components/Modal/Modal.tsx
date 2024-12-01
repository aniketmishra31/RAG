import { useRef, useState } from "react";
import "./Modal.css";
interface Props {
    text: string;
    onClose: () => void;
}
const Modal: React.FC<Props> = ({ text, onClose }) => {
    const [reveal, setReveal] = useState(false);
    const pRef = useRef<HTMLParagraphElement>(null);
    const toggle = () => {
        setReveal(!reveal);
    }
    const showText = (text: string) => {
        if (!reveal) {
            return '*'.repeat(text.length);
        }
        return text;
    }
    const handleCopyClick = () => {
        if (pRef.current) {
            navigator.clipboard.writeText(pRef.current.textContent || '')
                .then(() => {
                    alert('Text copied to clipboard!');
                })
                .catch((error) => {
                    console.error('Failed to copy text: ', error);
                });
        }
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div>
                    <h5>Api Key: </h5>
                    <p ref={pRef}>{showText(text)}</p>
                    <button className="btn reveal" onClick={toggle}>{reveal ? "Hide" : "Reveal"}</button>
                    {reveal && <button className="btn reveal" onClick={handleCopyClick}>Copy</button>}
                </div>
            </div>
            <button onClick={onClose} className="btn">Close</button>
        </div>
    );
}

export default Modal;