import { Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Link
        href="https://github.com/erodrigufer"
        isExternal
        color={"blackAlpha.600"}
      >
        <Text> Eduardo Rodriguez &copy; 2023</Text>
      </Link>
    </>
  );
};

export default Footer;
