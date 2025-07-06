import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
	const location = useLocation();
	const isLandingPage = location.pathname === "/";
	return (
		<div className='min-h-screen bg-white'>
			{!isLandingPage && <Navbar />}
			<main className='max-w-7xl mx-auto px-4 py-6 bg-white'>{children}</main>
		</div>
	);
};
export default Layout;
