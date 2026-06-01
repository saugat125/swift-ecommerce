import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h1 className="text-8xl font-bold mt-8">404</h1>

      <p className="text-xl mt-4">Page not found</p>

      <p className="text-muted-foreground mt-2 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-lg bg-green-500 text-white"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
