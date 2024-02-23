"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Modal from "./Modal";

import { deleteImage, getImageById } from "@/utils/helpers";
import ImageEditor from "./ImageEditor";

type ImageOptionsProps = {
  id: string;
};

export default function ImageOptions({ id }: Readonly<ImageOptionsProps>) {
  const router = useRouter();

  const [toolsOpen, setToolsOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { data: imageData } = useQuery({
    queryKey: ["image", id],
    queryFn: () => getImageById(id),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  if (!imageData || "error" in imageData) return null;

  const toggleState = (stateSetter: Dispatch<SetStateAction<boolean>>) => () =>
    stateSetter((state) => !state);

  const handleOptionsOpen = toggleState(setToolsOpen);
  const handleEditorOpen = toggleState(setEditorOpen);

  const handleDelete = async () => {
    const res = await deleteImage(id);

    if ("error" in res) {
      setMessage(res.error);
      return;
    }

    setMessage(res.data.message);
    setTimeout(() => {
      setMessage("");
      setEditorOpen(false);
      router.push("/gallery");
    }, 2000);
  };

  return (
    <div
      className={`${
        toolsOpen ? "bg-white" : "link-shadow bg-black hover:bg-opacity-90"
      } transition-color absolute right-2 top-2 grid grid-cols-1 items-center
        justify-center rounded-xl bg-opacity-50 duration-500 ease-in-out`}
    >
      <button
        onClick={handleOptionsOpen}
        className={`${
          toolsOpen ? "rotate-180 text-black" : ""
        } flex p-2 transition-all duration-500 ease-in-out hover:scale-[1.15] hover:text-white`}
        title="Options"
      >
        <i className="icon-cog"></i>
      </button>

      <div className={`${toolsOpen ? "open" : ""} collapse`}>
        <div className="grid grid-cols-1 overflow-hidden text-black">
          <button
            onClick={handleEditorOpen}
            className={`flex p-2 transition-all duration-500
              ease-in-out hover:scale-[1.15] hover:text-yellow-400`}
            title="Edit image"
          >
            <i className="icon-pencil"></i>
          </button>
          <button
            onClick={handleDelete}
            className={`flex p-2 transition-all duration-500
              ease-in-out hover:scale-[1.15] hover:text-red-600`}
            title="Delete image"
          >
            <i className="icon-cross"></i>
          </button>
        </div>
      </div>

      {message && (
        <Modal>
          <div className="px-6 py-4">{message}</div>
        </Modal>
      )}

      {editorOpen && (
        <ImageEditor
          handleEditorOpen={handleEditorOpen}
          imageData={imageData.data.image}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}
