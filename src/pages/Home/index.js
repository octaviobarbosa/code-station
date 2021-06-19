import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ButtonColorMode } from "../../components";
import useNotification from "../../hooks/useNotification";

const Home = () => {
  const toast = useNotification();
  return (
    <Flex>
      <Text fontSize="24px">Página Home</Text>
      <Button onClick={() => toast.warning("teste", "title")}>Teste</Button>
      <ButtonColorMode />
    </Flex>
  );
};

export default Home;
