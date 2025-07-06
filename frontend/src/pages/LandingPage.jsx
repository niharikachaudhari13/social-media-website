import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <header className="w-full flex justify-between items-center px-8 py-6 bg-white">
        <img src="/logo.png" alt="Logo" className="h-24 w-auto" />
        <button
          className="bg-primary text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-primary/90 transition-colors"
          onClick={() => navigate('/signup')}
        >
          Start Sharing
        </button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 bg-white">
        <div className="w-full max-w-3xl">
          <div className="rounded-3xl overflow-hidden mb-10 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1640161339472-a2d402b61a2f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Clouds social hero"
              className="w-full h-64 object-cover object-center"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral mb-4">Connect. Share. Inspire.</h1>
          <p className="text-lg md:text-l text-accent mb-8">A fresh, minimalist social platform to share your thoughts and connect with the world.</p>
          <button
            className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition-colors"
            onClick={() => navigate('/signup')}
          >
            Start Sharing
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage; 