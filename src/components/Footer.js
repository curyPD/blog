import React, { useEffect, useState } from "react";

function Footer() {
  const [year, setYear] = useState(0);
  useEffect(() => {
    const now = new Date();
    const fullYear = now.getFullYear();
    setYear(fullYear);
  }, []);

  return (
    <footer className="mt-auto bg-blue-100 py-3">
      <p className="text-center font-sans text-[10px] text-blue-600">
        Copyright &copy; <span>{year}</span> by Roman Druzhinin. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
