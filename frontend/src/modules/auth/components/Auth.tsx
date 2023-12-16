import { Box, Flex, Input } from "@chakra-ui/react";

const Auth: React.FC = () => {
  return (
    <>
      <Box marginTop={4} marginBottom={4}>
        <Flex direction="column" gap={4}>
          <Input placeholder="Nom d'usuari" boxShadow="base" variant="filled" />
          {/* TODO: Check that the word for password is correct in Catalan */}
          <Input placeholder="Contrasenya" boxShadow="base" variant="filled" />
        </Flex>
      </Box>
    </>
  );
};

export default Auth;
