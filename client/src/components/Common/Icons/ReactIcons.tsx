import {
  AiTwotoneCalendar,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePlayCircle,
} from "react-icons/ai";

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
        }[type]
      }
    </div>
  );
};

export default ReactIcons;
