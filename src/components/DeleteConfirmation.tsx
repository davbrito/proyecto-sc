import { Button, Container, Modal, Text } from "@nextui-org/react";
import React from "react";

interface Props {
  onDelete: () => void;
  onClose: () => void;
  open?: boolean;
}

const DeleteConfirmation = ({ onDelete, onClose, open }: Props) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-delete-confirm"
      width="380px"
      css={{ py: "$12", px: "$12" }}
      open={open}
      onClose={onClose}
      autoMargin
    >
      <Text h1 css={{ fontSize: "$3xl", fontWeight: "$semibold" }}>
        Esta seguro de eliminar el registro?
      </Text>
      <Container
        css={{ display: "flex", gap: "$6", justifyContent: "center", mt: "$6" }}
      >
        <Button
          onPress={() => onClose()}
          className="w-fit min-w-fit bg-blue-500 transition-all hover:bg-blue-600"
        >
          Cancelar
        </Button>
        <Button
          onPress={() => handleDelete()}
          className="w-fit min-w-fit bg-red-500 transition-all hover:bg-red-600"
        >
          Eliminar
        </Button>
      </Container>
    </Modal>
  );
};

export default DeleteConfirmation;
