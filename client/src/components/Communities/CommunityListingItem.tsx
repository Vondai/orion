import { Link } from 'react-router-dom';

type TProps = {
  name: string;
};
const CommunityListingItem: React.FC<TProps> = ({ name }) => {
  return (
    <li className='hover:text-accent hover:underline'>
      <i className='fas fa-arrow-up text-accent mr-3'></i>
      <Link to={`/community/${name}`}>
        comunity/<span className='font-bold'>{name}</span>
      </Link>
    </li>
  );
};

export default CommunityListingItem;
