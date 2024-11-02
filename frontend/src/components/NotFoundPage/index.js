import { React, useEffect } from 'react';

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

const NotFoundPage = () => {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFoundPage;
