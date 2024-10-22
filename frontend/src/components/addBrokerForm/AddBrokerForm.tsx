import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { TBroker } from "../searchForm/SearchForm";
import { useMutateBroker } from "../../hooks/useBroker";
import { StyledTextField } from "./AddBroker.styles";
import { useTranslation } from "react-i18next";
import useSnackbar from "../../hooks/useSnackbar";

interface IAddBrokerForm {
  open: boolean;
  handleClose: () => void;
}

const AddBrokerForm = (props: IAddBrokerForm) => {
  const [newBroker, setNewBroker] = useState<TBroker>({
    name: "",
    address: "",
    city: "",
    country: "",
  });
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const { mutation } = useMutateBroker();
  const { t } = useTranslation();

  const isValidBroker = useMemo(
    () =>
      newBroker.name.trim() !== "" &&
      newBroker.address.trim() !== "" &&
      newBroker.city.trim() !== "" &&
      newBroker.country.trim() !== "",
    [newBroker]
  );

  const handleSubmit = useCallback(() => {
    if (isValidBroker) {
      mutation.mutate(newBroker, {
        onSuccess: (_data, variables) => {
          showSnackbar(
            `${variables.name} : ${t("SaveBrokerSuccessMessage")}`,
            "success"
          );
          setNewBroker({
            name: "",
            address: "",
            city: "",
            country: "",
          });
        },
        onError: (error) => {
          showSnackbar(`${t("ErrorMessage")} ${error.message || ""}`, "error");
        },
      });
    }
  }, [mutation, isValidBroker, showSnackbar, newBroker, t]);

  const handleChangeNewBroker = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewBroker((prev: TBroker) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setNewBroker]
  );

  return (
    <Box>
      <SnackbarComponent />
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby={t("Add manually")}
        aria-describedby={t("Add manually")}
      >
        <DialogTitle>{t("Add manually")}</DialogTitle>
        <IconButton
          aria-label={t("Close")}
          onClick={props.handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey",
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <DialogContentText>{t("Tutorial")}</DialogContentText>
          <StyledTextField
            label={t("Name")}
            name={"name"}
            value={newBroker.name}
            required
            fullWidth
            onChange={handleChangeNewBroker}
            type="text"
            slotProps={{ input: { "aria-required": "true" } }}
          />
          <StyledTextField
            label={t("Address")}
            name={"address"}
            value={newBroker.address}
            required
            fullWidth
            onChange={handleChangeNewBroker}
            type="text"
            slotProps={{ input: { "aria-required": "true" } }}
          />
          <StyledTextField
            label={t("City")}
            name={"city"}
            value={newBroker.city}
            required
            fullWidth
            onChange={handleChangeNewBroker}
            type="text"
            slotProps={{ input: { "aria-required": "true" } }}
          />
          <StyledTextField
            label={t("Country")}
            name={"country"}
            value={newBroker.country}
            required
            fullWidth
            onChange={handleChangeNewBroker}
            type="text"
            slotProps={{ input: { "aria-required": "true" } }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            onClick={props.handleClose}
            sx={{ color: "#757575" }}
          >
            {t("Cancel")}
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!isValidBroker}
            aria-disabled={!isValidBroker}
            sx={{ backgroundColor: "#26BAD4", color: "white" }}
          >
            {t("Save")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddBrokerForm;
