import { useEffect, useRef } from "react";

const PopUp = ({ children, show, close }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        close(); // cierra el modal si el click fue fuera
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, close]);

  if (!show) return null;
  return (
    <div
      className={`fixed inset-0 ${
        show ? "flex" : "hidden"
      } items-center justify-center bg-black/50 backdrop-blur-md`}
    >
      <div
        ref={modalRef}
        className={`w-[95%] md:w-1/2 lg:w-1/3 min-h-1/5 m-auto bg-white rounded p-5 text-lg`}
      >
        {children}
      </div>
    </div>
  );
};

export default PopUp;
