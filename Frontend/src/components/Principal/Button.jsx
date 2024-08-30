import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Button({ link, children }) {
  return (
    <Link
      to={link}
      className="py-1 px-3 bg-[#0065FF] text-white hover:bg-[#0747A6] transition-all duration-200 rounded-lg"
    >
      {children}
    </Link>
  );
}

Button.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
