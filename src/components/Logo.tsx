import * as React from "react";

const Logo: React.FC = (props) => {
  const logo: string = require("../static/logo.svg").default;
  return (
  <img
    alt="Logo"
    src={logo}
    {...props}
  />
 );
}

export default Logo;
