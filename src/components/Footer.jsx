import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright (c) {year} Keeper</p>
    </footer>
  );
}

export default Footer;
