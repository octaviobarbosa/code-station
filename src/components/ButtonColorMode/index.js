import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return <Button onClick={toggleColorMode}>Color Mode {colorMode}</Button>;
};

export default Home;
