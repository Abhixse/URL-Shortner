import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to MyApp 🚀
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-lg">
        Shorten links, track clicks, manage domains, and collaborate with your team — all in one platform.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
