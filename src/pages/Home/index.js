import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import useNotification from "../../hooks/useNotification";

const Home = () => {
  const toast = useNotification();
  return (
    <Flex>
      <Text fontSize="24px">Página Home</Text>
      <Button onClick={() => toast.warning("teste", "title")}>Teste</Button>
    </Flex>
  );
};

export default Home;
