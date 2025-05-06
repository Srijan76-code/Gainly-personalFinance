

const Button = ({ children,handleclick=()=>{},bg="bg-[#17132c]" }) => {
    return (
      <button onClick={handleclick}
        type="submit"
        className={`cursor-pointer relative z-10 px-6 py-2 overflow-hidden border rounded-full group font-sans flex justify-center items-center gap-2  text-sm text-white ${bg} backdrop-blur-md shadow-xl lg:font-semibold border-white`}
      >
        {/* Pseudo-element for the animated background */}
        <span className="pointer-events-none absolute inset-0 -z-10 before:content-[''] before:absolute before:inset-0 before:-left-full before:w-full before:rounded-full before:bg-white before:transition-all before:duration-700 group-hover:before:left-0 group-hover:before:scale-200 group-hover:before:duration-500" />
  
        <span className="z-10 group-hover:text-black">{children}</span>
  
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 19"
          className="w-7 h-7 p-2 rounded-full border border-gray-700 transition-transform duration-300 ease-linear transform rotate-45 group-hover:rotate-90 bg-white text-black z-10"
        >
          <path
            className="fill-black"
            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
          />
        </svg>
      </button>
    );
  };
  
  export default Button;
  