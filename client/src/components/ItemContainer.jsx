const ItemContainer = ({ children, className }) => {
  return (
    <div
      className={`w-full bg-white p-5 md:p-12 flex justify-between items-center shadow-lg rounded 
        md:w-2/3 md:mx-auto ${className}`}
    >
      {children}
    </div>
  );
};
export default ItemContainer;
