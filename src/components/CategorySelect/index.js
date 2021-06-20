import { Select } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";

const CategorySelect = ({ ...props }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(async () => {
    try {
      const responseApi = await api.get("/categories");

      if (responseApi.status === 200) {
        setCategories(responseApi.data);
      }
    } catch (error) {
      // toast.error(error, "Error");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);
  return (
    <Select placeholder="Category" size="md" color="text.100" {...props}>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};

export default CategorySelect;
