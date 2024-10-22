import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TBroker } from "../components/searchForm/SearchForm";

export const useBrokers = (brokerSearchName: string) =>
  useQuery({
    queryKey: ["brokers"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/brokers?search=${
          brokerSearchName.length === 0 ? undefined : brokerSearchName
        }`
      );
      return response.data;
    },
    enabled: brokerSearchName.length > 0,
  });

export const useMutateBroker = () => {
  const mutation = useMutation({
    mutationFn: async (broker: TBroker) =>
      await axios.post("http://localhost:5000/api/v1/brokers", broker),
  });

  return { mutation };
};
