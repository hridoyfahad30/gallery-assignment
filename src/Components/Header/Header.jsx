const Header = () => {
  const menuItem = ["Home", "About Us", "Contact"];

  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center my-2">
      <div>
        <button className="text-3xl font-semibold flex items-center gap-2">
            <img className="w-12 h-12 rounded-full" src="https://i.ibb.co/xsrKkL4/ollyo-logo.jpg" alt="" />
            Ollyo
        </button>
      </div>
      <div className="space-x-4">
        {menuItem.map((item, index) => (
          <button
            key={index}
            className="px-4 py-2 my-3 lg:my-0 bg-green-400 rounded-xl text-xs md:text-lg font-medium hover:bg-teal-400 duration-300"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
