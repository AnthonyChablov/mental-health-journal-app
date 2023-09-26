import { AiTwotoneCalendar, AiOutlineHome, AiOutlineUser} from 'react-icons/ai';


  interface IIcons {
    type: string;
    size: number;
    color?: string;
  }
  
  const Icons = ({ type, size, color }: IIcons) => {
    return (
      <div className="text-white">
        {
          {
            home : <AiOutlineHome size={size} color={color}/>,
            journal : <AiTwotoneCalendar size = {size} color = {color}/>,
            user : <AiOutlineUser size = {size} color = {color}/>,
          }[type]
        }
      </div>
    );
  };
  
  export default Icons;