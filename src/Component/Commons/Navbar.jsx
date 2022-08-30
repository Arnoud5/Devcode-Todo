import React from "react";

const Navbar = () => {
    return(
        <nav data-cy="header-background" className="bg-[#16ABF8]">
            <div className="w-11/12 md:max-w-xl xl:max-w-5xl mx-auto text-left">
                <p className="font-bold text-2xl py-5 text-white" data-cy="header-title">TO DO LIST APP</p>
            </div>
        </nav>
    )
}

export default Navbar;