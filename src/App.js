import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import Routes from "./routes";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  );
};

export default App;
