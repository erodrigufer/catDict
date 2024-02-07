import { Link, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  // Link color definition for light-mode and dark-mode.
  const linkColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");
  return (
    <>
      <Link href="https://github.com/erodrigufer" isExternal color={linkColor}>
        Eduardo Rodriguez &copy; 2023
      </Link>
    </>
  );
};

export default Footer;
