import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import notFoundImage from "../components/assest/images/notFound.jpg";

export default function Page404() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
      </Helmet>

      <div className="fixed top-0 right-0 left-0 bottom-0 grid place-items-center bg-gradient-to-b from-primary to-secondary text-white z-[999] overflow-hidden">
        <div className="content flex flex-col items-center justify-center">
          <h3 className="text-4xl font-bold mb-4">Sorry, page not found!</h3>

          <p className="text-accent text-center">
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </p>

          <img
            src={notFoundImage} // Replace with the actual path to your illustration
            alt="Page Not Found Illustration"
            className="h-64 my-8"
            style={{ mixBlendMode: "multiply" }}
          />

          <Link
            to="/"
            className="px-6 py-3 bg-white text-blue-500 rounded-full hover:bg-blue-200 hover:text-blue-700 transition duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
}
