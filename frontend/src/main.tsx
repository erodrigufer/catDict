import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Do not re-fetch when window's focus is changed.
      refetchOnWindowFocus: false,
      // Never re-fetch any data that has already been cached.
      staleTime: Infinity,
      // Do not refetch data if network connection is re-established.
      refetchOnReconnect: false,
      // After the cacheTime, the inactive data is garbage collected,
      // i.e. it would need to be refetched once more.
      cacheTime: 45 * 60 * 1000, // in ms
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
