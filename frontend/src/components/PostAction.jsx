export default function PostAction({ icon, text, onClick }) {
	return (
		<button 
			className='flex items-center px-4 py-2 rounded-lg text-info bg-white' 
			onClick={onClick}
		>
			<span className='mr-2'>{icon}</span>
			<span className='hidden sm:inline text-sm text-text-dark'>{text}</span>
		</button>
	);
}
