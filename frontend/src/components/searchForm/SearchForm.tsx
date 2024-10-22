import {
  Autocomplete,
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import AddBrokerForm from "../addBrokerForm/AddBrokerForm";
import { Search } from "@mui/icons-material";
import { useBrokers } from "../../hooks/useBroker";
import { useTranslation } from "react-i18next";

export type TBroker = {
  _id?: string;
  name: string;
  address: string;
  city: string;
  country: string;
  __v?: number;
};

const SearchForm = () => {
  const [brokerSearchName, setBrokerSearchName] = useState<string>("");
  const [selectedBroker, setSelectedBroker] = useState<TBroker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isError, isLoading, refetch } = useBrokers(brokerSearchName);

  const { t } = useTranslation();

  const ADD_MANUALLY_OPTION: TBroker = {
    _id: "add_manually",
    name: `${t("Add manually")}`,
    address: "",
    city: "",
    country: "",
  };

  const handleBrokerSearchName = useCallback(
    (value: string) => {
      setBrokerSearchName(value.trim());
      refetch();
    },
    [setBrokerSearchName, refetch]
  );

  const handleSelectedBroker = useCallback(
    (broker: TBroker | null) => {
      if (broker?._id === ADD_MANUALLY_OPTION._id) {
        setIsModalOpen(true);
      } else if (broker?._id) {
        setSelectedBroker(broker);
      }
    },
    [setSelectedBroker, setIsModalOpen, ADD_MANUALLY_OPTION._id]
  );
  const handleClickOption = useCallback(
    (option: TBroker) => {
      if (option._id !== ADD_MANUALLY_OPTION._id) {
        setSelectedBroker(option);
      } else if (option._id === ADD_MANUALLY_OPTION._id) {
        setIsModalOpen(true);
      }
    },
    [setSelectedBroker, setIsModalOpen, ADD_MANUALLY_OPTION._id]
  );

  if (isError) {
    return <Box>Error</Box>;
  }

  const options = data && data.length > 0 ? [...data] : [];

  return (
    <Box>
      <Typography variant="h6" aria-label={t("Managing broker")}>
        {t("Managing broker")}
      </Typography>
      <Autocomplete
        options={options}
        filterOptions={(options) => {
          const filteredOptions = selectedBroker
            ? options.filter((option) => option._id !== selectedBroker._id)
            : options;
          return [...filteredOptions, ADD_MANUALLY_OPTION];
        }}
        noOptionsText={t("No result.")}
        getOptionLabel={(option: TBroker) => {
          return option._id === ADD_MANUALLY_OPTION._id
            ? ADD_MANUALLY_OPTION.name
            : `${option.name} - ${option.address}, ${option.city} - ${option.country}`;
        }}
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <Typography
              key={key}
              {...rest}
              onClick={() => handleClickOption(option)}
              sx={{
                textDecoration:
                  option._id === ADD_MANUALLY_OPTION._id ? "underline" : "none",
                cursor: "pointer",
              }}
              role={"option"}
              aria-selected={selectedBroker?._id === option._id}
            >
              {option._id === ADD_MANUALLY_OPTION._id
                ? ADD_MANUALLY_OPTION.name
                : `${option.name} - ${option.address}, ${option.city} - ${option.country}`}
            </Typography>
          );
        }}
        value={selectedBroker}
        loading={isLoading}
        fullWidth
        popupIcon={
          <InputAdornment position="end">
            {isLoading ? <CircularProgress size={20} /> : <Search />}
          </InputAdornment>
        }
        onChange={(_event, value) => handleSelectedBroker(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t("Name")}
            placeholder={isLoading ? t("Loading") : t("Name")}
            /*slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {isLoading ? <CircularProgress size={20} /> : <Search />}
                  </InputAdornment>
                ),
              },
            }}*/
            onChange={(event) => handleBrokerSearchName(event.target.value)}
            aria-label={t("Name")}
          />
        )}
      />
      <AddBrokerForm
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
};

export default SearchForm;
