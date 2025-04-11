const Footer = () => {
  return (
    <footer className="bg-sky-500 text-white w-full text-center py-4">
      <p className="text-lg font-semibold">
        © 2023 Workout Tracker. All rights reserved.
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
