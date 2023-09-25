import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";

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
      size="md"
      isOpen={open}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader>
          <h2 className="mx-auto text-xl font-semibold">
            Esta seguro de eliminar el registro?
          </h2>
        </ModalHeader>
        <ModalBody>
          <div className="mt-6 flex justify-center gap-6">
            <Button
              onPress={() => onClose()}
              className="w-fit min-w-fit bg-blue-500 font-semibold text-white transition-all hover:bg-blue-600"
            >
              Cancelar
            </Button>
            <Button
              onPress={() => handleDelete()}
              className="w-fit min-w-fit bg-red-500 font-semibold text-white transition-all hover:bg-red-600"
            >
              Eliminar
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmation;
