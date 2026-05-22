import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";

function Header() {
  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper
      </h1>
      <p>Notes that stay put between sessions.</p>
    </header>
  );
}

export default Header;
