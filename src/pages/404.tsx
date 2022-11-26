import { Link } from "react-router-dom";


export const NotFound = () => (
    <div className="h-screen flex flex-col items-center justify-center">
        <h1 className=" font-semibold text-xl mb-5">Page Not Found</h1>
        <h4 className=" font-medium text-base mb-3">The page you're looking for does not exist or has moved</h4>
        <Link to={"/"} className=" hover:underline text-lime-500">Back to home &rarr;</Link>
    </div>
)