import { Text, HStack, Link, useColorModeValue } from "@chakra-ui/react";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const Footer = () => {
  // Link color definition for light-mode and dark-mode.
  const linkColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");
  return (
    <>
      <Link href="https://github.com/erodrigufer" isExternal color={linkColor}>
        <HStack spacing={1}>
          <span className="fi fi-es-ct"></span>
          <Text>Eduardo Rodriguez &copy; 2023</Text>
        </HStack>
      </Link>
    </>
  );
};

export default Footer;
