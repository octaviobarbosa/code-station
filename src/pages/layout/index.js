import { Flex } from "@chakra-ui/react";
import React from "react";

const Layout = ({ title, children }) => {
  return (
    <Flex justifyContent="center" p="10px">
      {children}
    </Flex>
  );
};

export default Layout;
