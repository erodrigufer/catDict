import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { FormEvent } from "react";

const handleSubmit = (event: FormEvent) => {
  event.preventDefault();

  console.log("Submit username and password");
};

const Auth: React.FC = () => {
  return (
    <>
      <Box marginTop={4} marginBottom={4}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={4}>
            <Input
              placeholder="Nom d'usuari"
              boxShadow="base"
              variant="filled"
            />
            {/* TODO: Check that the word for password is correct in Catalan */}
            <Input
              placeholder="Contrasenya"
              boxShadow="base"
              variant="filled"
            />
            {/* TODO: Check Button of WOrdInput.tsx to complete this button */}
            <Button type="submit">Enter</Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default Auth;
