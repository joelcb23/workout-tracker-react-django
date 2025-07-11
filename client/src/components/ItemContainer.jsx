const ItemContainer = ({ children, className }) => {
  return (
    <div
      className={`w-full p-5 md:p-12 flex justify-between items-center shadow-lg rounded 
         md:mx-auto ${className}`}
    >
      {children}
    </div>
  );
};
export default ItemContainer;
