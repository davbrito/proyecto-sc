import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { CustomLoading } from "../Loading";
import NextLink from "next/link";
import { UploadButton } from "~/utils/uploadthing";

export const ProfileData = () => {
  const { data, isLoading, refetch } = api.user.getById.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const update = api.user.updateAvatarById.useMutation();
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [isUploadImage, setIsUploadImage] = useState(false);

  if (isLoading) return <CustomLoading />;
  if (!data) return null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-8 sm:flex-row">
        <div className="flex flex-col gap-4">
          <Avatar
            name={data.name}
            src={data.image || "/profile.png"}
            className="mx-auto"
            isBordered
            size="lg"
          />
          <Button
            type="button"
            color="secondary"
            onPress={() => setUpdateAvatar(true)}
          >
            Cambiar
          </Button>
        </div>

        <div className="flex flex-col gap-3 sm:self-start">
          <div>
            <div className="text-small leading-none text-default-500">
              Nombre:
            </div>
            <div className="text-2xl font-light  leading-tight">
              <span className="capitalize">
                {data.name} {data.lastName}
              </span>
            </div>
          </div>
          <div>
            <div className="text-small leading-none text-default-500">
              Username:
            </div>
            <div className="text-2xl font-light leading-tight">
              {data.username}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 text-center">
        <Button as={NextLink} href="/profile/edit" color="danger">
          Actualizar
        </Button>
      </div>
      <Modal
        isOpen={updateAvatar}
        aria-labelledby="modal-edit-avatar"
        size="lg"
        scrollBehavior="inside"
        onClose={() => {
          setUpdateAvatar(false);
          refetch();
        }}
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>
                <h2 className="mx-auto text-2xl">Actualizacion de avatar</h2>
              </ModalHeader>
              <ModalBody className="py-4">
                <UploadButton
                  appearance={{
                    button: { padding: "8px" },
                  }}
                  endpoint="imageUploader"
                  onClientUploadComplete={async (res) => {
                    setIsUploadImage(false);

                    if (res && res[0]?.url) {
                      update.mutate(
                        {
                          user_id: data.id,
                          img_url: res[0].url,
                          old_url: data?.image || "",
                        },
                        {
                          onSuccess(data, variables, context) {
                            close();
                          },
                        }
                      );
                    }
                  }}
                  onUploadError={(error: Error) => {
                    setIsUploadImage(false);
                  }}
                  onUploadBegin={() => {
                    setIsUploadImage(true);
                  }}
                  content={{
                    allowedContent: "Max. 1MB",
                    button: "Subir archivo",
                  }}
                />
                {(update.isLoading || isUploadImage) && <CustomLoading />}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
