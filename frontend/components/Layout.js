import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <div>
      <h2>I am a layout component</h2>
      {children}
    </div>
  );
}

Layout.propTypes = { children: PropTypes.any };
