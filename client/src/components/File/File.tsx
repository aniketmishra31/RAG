import { Link } from "react-router-dom";
import "./File.css";
interface FileProps {
    title: string;
    text: string;
}
const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    return words.length > maxWords 
      ? `${words.slice(0, maxWords).join(" ")}...` 
      : text;
  };
  
  
const File: React.FC<FileProps> = ({ title, text }) => {
    return (
        <div className="file">
            <Link to={"/"}>{title}</Link>
            <p className="desc">{truncateText(text, 10)}</p>
        </div>
    );
}

export default File;