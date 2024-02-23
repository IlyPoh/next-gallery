"use client";

import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "./Modal";
import LoadingRing from "./LoadingRing";

import { TImage } from "@/types";

import { editImage } from "@/utils/helpers";

type ImageEditorProps = {
  imageData: TImage;
  handleEditorOpen: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function ImageEditor({
  imageData,
  handleEditorOpen,
  setMessage,
}: Readonly<ImageEditorProps>) {
  const router = useRouter();
  const [imageTitle, setImageTitle] = useState("");

  const schema = z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .refine(
        (title) => title !== imageData.title,
        "Title must be different from the current one",
      ),
  });

  type TFormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFormValues>({
    resolver: zodResolver(schema),
  });

  const handleEdit = async (data: TFormValues) => {
    const res = await editImage(imageData.id, data.title);

    if ("error" in res) {
      setMessage(res.error);
      return;
    }

    handleEditorOpen();
    setMessage(res.data.message);
    setTimeout(() => {
      setMessage("");
      router.push(`/gallery/${imageData.id}`);
    }, 2000);
  };

  return (
    <Modal navigation={handleEditorOpen}>
      <form
        onSubmit={handleSubmit(handleEdit)}
        className="flex min-w-[400px] flex-col items-center gap-4 px-6 py-4"
      >
        <div>
          <span className="mr-2 text-gray-500">Current title:</span>
          {imageData.title}
        </div>
        <input
          {...register("title")}
          type="text"
          value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)}
          placeholder="Image title"
          className={`w-full rounded-xl border-2 border-gray-600 bg-transparent
            px-4 py-2 outline-none transition-colors
            duration-300 ease-in-out focus-visible:border-primary
            ${errors.title && "border-red-500 focus-visible:border-red-500"}`}
        />
        {errors.title && (
          <div className="text-red-500">{errors.title.message}</div>
        )}
        <button
          className="rounded-xl bg-gray-600 bg-opacity-70 px-6 py-2 
            transition-colors duration-300 ease-in-out hover:bg-primary
              hover:text-black"
        >
          {isSubmitting ? <LoadingRing size={1.5} /> : "Change image title"}
        </button>
      </form>
    </Modal>
  );
}
