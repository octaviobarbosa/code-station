import { StarIcon } from "@chakra-ui/icons";
import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";

const CardDoctor = ({ data }) => {
  const history = useHistory();

  return (
    <Flex
      borderRadius="5px"
      bg="primary.100"
      w="340px"
      // w="100%"
      h="100px"
      alignItems="center"
      justifyContent="flex-start"
      cursor="pointer"
      onClick={() => {
        history.push(`/doctor-detail/${data.user_id}`);
      }}
      key={data.id}
    >
      <Stack pl="15px">
        <Avatar size="lg" name={data?.user.name} src={data?.user.avatar} />
      </Stack>

      <Flex pl="15px" direction="column">
        <Text fontSize="sm" fontWeight={500} color="white.200">
          {data?.user.name}
        </Text>
        <Text fontSize="sm" color="white.100">
          {data?.category.name}
        </Text>
        <Text fontSize="sm" color="white.100">
          {data.uf}
          {data.crm}
        </Text>
        <Flex>
          <StarIcon
            boxSize={4}
            color={data.rating >= 1 ? "orange.100" : "white.50"}
          />
          <StarIcon
            boxSize={4}
            color={data.rating >= 2 ? "orange.100" : "white.50"}
          />
          <StarIcon
            boxSize={4}
            color={data.rating >= 3 ? "orange.100" : "white.50"}
          />
          <StarIcon
            boxSize={4}
            color={data.rating >= 4 ? "orange.100" : "white.50"}
          />
          <StarIcon
            boxSize={4}
            color={data.rating >= 5 ? "orange.100" : "white.50"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardDoctor;
