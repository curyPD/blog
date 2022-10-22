import React, { useEffect, useState } from "react";

function Footer() {
  const [year, setYear] = useState(0);
  useEffect(() => {
    const now = new Date();
    const fullYear = now.getFullYear();
    setYear(fullYear);
  }, []);

  return (
    <footer className="mt-auto bg-blue-300  py-3 lg:py-4">
      <p className="text-center font-sans text-[10px] text-white sm:text-xs">
        Copyright &copy; <span>{year}</span> by Roman Druzhinin. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
