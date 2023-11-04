const Header = () => {

    const menuItem = [
        {link: '/', tag: 'Home'},
        {link: '/', tag: 'About'},
        {link: '/', tag: 'Contact'},
    ]

    return (
        <header className="container mx-auto md:flex items-center justify-between my-4 px-2">
            <nav className="flex items-center gap-2">
                <img className="w-16 rounded-full" src="https://i.ibb.co/xsrKkL4/ollyo-logo.jpg" alt="" />
                <h1 className="text-2xl font-semibold">Ollyo</h1>
            </nav>
            <nav className="space-x-4">
                {
                    menuItem.map((menu, index) => <a className="text-green-600 text-2xl font-medium hover:text-teal-600 duration-300" href={menu.link} key={index}>{menu.tag}</a>)
                }
            </nav>
        </header>
    );
};

export default Header;