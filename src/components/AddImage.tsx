"use client";

import { z } from "zod";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "./Modal";
import LoadingRing from "./LoadingRing";

import { addImage, getUser } from "@/utils/helpers";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  image: z.any().refine(
    (files: FileList) => {
      return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
    },
    { message: "Image type should be jpg, jpeg, png or webp" },
  ),
  title: z.string().min(1, "Title is required"),
});

type TFormValues = z.infer<typeof schema>;

export default function AddImage() {
  const session = useSession();
  const router = useRouter();
  const [popupOpen, setPopupOpen] = useState(false);
  const [image, setImage] = useState<File>();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFormValues>({
    resolver: zodResolver(schema),
  });
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    enabled: !!session.data?.user,
  });

  const imageUrl = useMemo(() => {
    if (image) {
      return URL.createObjectURL(image);
    }
    return "";
  }, [image]);

  const handleOpen = () => {
    setPopupOpen((prev) => !prev);
  };

  if (!userData || "error" in userData) return null;

  const onImageSubmit = async (data: TFormValues) => {
    const formData = new FormData();
    formData.set("file", data.image.item(0) as File);
    formData.set("title", data.title);
    formData.set("userId", userData?.data.user.id);

    const res = await addImage(formData);

    if ("error" in res) {
      console.error(res.error);
      setMessage(res.error);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }

    if ("data" in res) {
      setMessage(`${res.data.message}. Redirecting...`);
      setTitle("");
      setImage(undefined);

      setTimeout(() => {
        setMessage("");
        setPopupOpen(false);
        router.push("/gallery");
      }, 2000);
    }
  };

  return (
    <div className="absolute right-1 flex items-center justify-end md:right-2">
      <button
        onClick={handleOpen}
        title="Add new image"
        className="flex items-center justify-center transition-transform duration-300 ease-in-out hover:-rotate-90"
      >
        <i className="icon-plus"></i>
      </button>
      {popupOpen && (
        <Modal navigation={handleOpen}>
          <form
            className="flex flex-col items-center gap-4 rounded-xl p-2"
            onSubmit={handleSubmit(onImageSubmit)}
          >
            {image && (
              <Image
                className="w-full max-w-[400px] rounded-xl"
                src={imageUrl}
                width={800}
                height={800}
                alt={title}
              />
            )}
            <input
              {...register("title", { required: true })}
              type="text"
              name="title"
              placeholder="Image title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border-gray-600 bg-white bg-opacity-10 px-4 py-2 outline-none"
            />
            {errors.title && (
              <div className="text-red-500">{errors.title.message}</div>
            )}
            <div className="flex w-full max-w-[400px] justify-between">
              <label className="add-image-label">
                <input
                  {...register("image", { required: true })}
                  type="file"
                  name="image"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  onChange={(e) => setImage(e.target.files?.[0])}
                />
              </label>
              <button
                className="ml-4 rounded-xl bg-white bg-opacity-10 px-6
                  py-2 text-sm transition-colors duration-300
                    ease-in-out hover:bg-primary hover:text-black"
                title="Add image"
              >
                {isSubmitting ? (
                  <LoadingRing size={1} />
                ) : (
                  <i className="icon-plus"></i>
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {message && <Modal>{message}</Modal>}
    </div>
  );
}
