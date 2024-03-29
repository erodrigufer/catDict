import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { FormEvent, SetStateAction, useEffect, useState } from "react";
import useAuthToken, { AuthToken } from "../../../hooks/useAuthToken";
import ErrorBanner from "../../main/components.tsx/ErrorBanner";

interface AuthProps {
  colorScheme: string;
  handleNewToken: (token: AuthToken) => void;
}

const Auth: React.FC<AuthProps> = ({ colorScheme, handleNewToken }) => {
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [usernameSubmitValue, setUsernameSubmitValue] = useState<string>("");
  const [passwordSubmitValue, setPasswordSubmitValue] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setUsernameSubmitValue(usernameValue);
    setPasswordSubmitValue(passwordValue);
  };

  const authQuery = useAuthToken({
    username: usernameSubmitValue,
    password: passwordSubmitValue,
  });

  // Handle new auth token in parent component,
  // only if query is valid.
  useEffect(() => {
    if (
      authQuery.data !== undefined &&
      authQuery.data !== null &&
      !authQuery.isError
    )
      handleNewToken({ authToken: authQuery.data });
  }, [authQuery.data]);

  const handleChangeUsername = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUsernameValue(event.target.value);
  };

  const handleChangePassword = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPasswordValue(event.target.value);
  };

  return (
    <>
      {authQuery?.error && (
        <ErrorBanner errorMessage={authQuery.error.message} />
      )}
      <Box marginTop={4} marginBottom={4}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={4}>
            <Input
              placeholder="Nom d'usuari"
              boxShadow="base"
              variant="filled"
              onChange={handleChangeUsername}
              value={usernameValue}
            />
            <Input
              placeholder="Contrasenya"
              boxShadow="base"
              variant="filled"
              onChange={handleChangePassword}
              type="password"
              value={passwordValue}
            />
            {/* TODO: Check Button of WordInput.tsx to complete this button */}
            <Button colorScheme={colorScheme} type="submit">
              Entrar
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default Auth;
