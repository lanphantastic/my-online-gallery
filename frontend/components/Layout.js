import PropTypes from 'prop-types';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <h2>I am a layout component</h2>
      {children}
    </div>
  );
}

Layout.propTypes = { children: PropTypes.any };
