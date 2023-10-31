import {
  AiTwotoneCalendar,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePlayCircle,
  AiOutlineCalendar,
  AiOutlineSearch,
  AiOutlineEdit,
} from "react-icons/ai";
import { RiMenu4Line } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { GoKebabHorizontal } from "react-icons/go";
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
          back: <IoIosArrowBack size={size} color={color} />,
          calendar: <AiOutlineCalendar size={size} color={color} />,
          search: <AiOutlineSearch size={size} color={color} />,
          edit: <AiOutlineEdit size={size} color={color} />,
          kebab: <GoKebabHorizontal size={size} colot={color} />,
        }[type]
      }
    </div>
  );
};

export default ReactIcons;
