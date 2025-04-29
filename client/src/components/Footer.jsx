const Footer = () => {
  return (
    <footer className="bg-purple-500 text-white text-center py-4 mb-16 md:mb-0 md:absolute right-0 w-full">
      <p className="text-lg font-semibold">
        © 2025 Workout Tracker. All rights reserved.
      </p>
      <div className="flex justify-center gap-x-4 mt-2">
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
        <a href="#" className="hover:underline">
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
