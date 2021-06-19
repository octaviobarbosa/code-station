import { useToast } from "@chakra-ui/react";

const options = {
  isClosable: true,
  position: "bottom-right",
  variant: "solid",
};

const useNotification = () => {
  const toast = useToast();

  const info = (description, title = "", duration = 4000) => {
    toast({ ...options, status: "info", description, title, duration });
  };

  const success = (description, title = "", duration = 4000) => {
    toast({ ...options, status: "success", description, title, duration });
  };

  const error = (description, title = "", duration = 4000) => {
    toast({ ...options, status: "error", description, title, duration });
  };

  const warning = (description, title = "", duration = 4000) => {
    toast({ ...options, status: "warning", description, title, duration });
  };

  return { info, success, error, warning };
};

export default useNotification;
