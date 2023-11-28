import {
  AiTwotoneCalendar,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePlayCircle,
  AiOutlineCalendar,
  AiOutlineSearch,
  AiOutlineEdit,
  AiOutlineTag,
} from "react-icons/ai";
import { BiHappyAlt, BiHappyBeaming, BiAngry, BiSad } from "react-icons/bi";
import {
  FaRegFaceSadCry,
  FaLinkedin,
  FaGithub,
  FaFacebook,
} from "react-icons/fa6";
import { RiMenu4Line } from "react-icons/ri";
import { IoIosArrowBack, IoIosLogOut } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoKebabHorizontal } from "react-icons/go";
import { TbPlant } from "react-icons/tb";
import { MdInsights } from "react-icons/md";
import { GrGrow } from "react-icons/gr";

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
          kebab: <GoKebabHorizontal size={size} color={color} />,
          happy: <BiHappyAlt size={size} color={color} />,
          veryhappy: <BiHappyBeaming size={size} color={color} />,
          sad: <BiSad size={size} color={color} />,
          verysad: <FaRegFaceSadCry size={size} color={color} />,
          angry: <BiAngry size={size} color={color} />,
          tag: <AiOutlineTag size={size} color={color} />,
          github: <FaGithub size={size} color={color} />,
          facebook: <FaFacebook size={size} color={color} />,
          linkedin: <FaLinkedin size={size} color={color} />,
          logout: <IoIosLogOut size={size} color={color} />,
          document: <IoDocumentTextOutline size={size} color={color} />,
          insights: <MdInsights size={size} color={color} />,
          grow: <TbPlant size={size} color={color} />,
        }[type]
      }
    </div>
  );
};

export default ReactIcons;
