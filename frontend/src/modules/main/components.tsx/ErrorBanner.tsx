import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";

interface Props {
  errorMessage: string;
}

const ErrorBanner = ({ errorMessage }: Props) => {
  return (
    <>
      <Alert status="error">
        <AlertIcon />
        {/* <AlertTitle></AlertTitle> */}
        <AlertDescription>
          There was an error processing your request: {errorMessage}
        </AlertDescription>
      </Alert>
    </>
  );
};

export default ErrorBanner;
