const PopUp = ({ children, show }) => {
  return (
    <div
      className={`fixed inset-0 ${
        show ? "flex" : "hidden"
      } items-center justify-center bg-black/50 backdrop-blur-md`}
    >
      <div className={`w-1/3 min-h-1/5 m-auto bg-white rounded p-5 text-lg`}>
        {children}
      </div>
    </div>
  );
};

export default PopUp;
