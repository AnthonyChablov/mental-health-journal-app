import {
  AiTwotoneCalendar,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePlayCircle,
  AiOutlineMenu,
} from "react-icons/ai";
import { RiMenu4Line } from "react-icons/ri";

interface IIcons {
  type: string;
  size: number;
  color?: string;
}

const ReactIcons = ({ type, size, color }: IIcons) => {
  return (
    <div className="text-white">
      {
        {
          home: <AiOutlineHome size={size} color={color} />,
          journal: <AiTwotoneCalendar size={size} color={color} />,
          user: <AiOutlineUser size={size} color={color} />,
          courses: <AiOutlinePlayCircle size={size} color={color} />,
          menu: <RiMenu4Line size={size} color={color} />,
        }[type]
      }
    </div>
  );
};

export default ReactIcons;
