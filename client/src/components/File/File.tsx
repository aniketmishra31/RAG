import { Link } from "react-router-dom";
import "./File.css";
interface FileProps {
    id: string;
    title: string;
    text: string;
}
const truncateText = (text: string, maxWords: number = 10) => {
    const words = text.split(" ");
    return words.length > maxWords
        ? `${words.slice(0, maxWords).join(" ")}...`
        : text;
};

const File: React.FC<FileProps> = ({ title, text,id }) => {
    return (
        <div className="file">
            <Link to={`chat/${id}`}>{title}</Link>
            <p className="desc">{truncateText(text, 10)}</p>
        </div>
    );
}

export default File;