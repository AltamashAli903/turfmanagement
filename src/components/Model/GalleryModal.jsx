import { useEffect, useState } from "react";
import API, { IMAGE_URL } from "../../api/axios";
import {
  Upload,
  X,
  Trash2,
  ImageIcon,
} from "lucide-react";

export default function GalleryModal({
  open,
  turf,
  setOpen
}) {

  const [gallery, setGallery] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {

    if (open && turf) {
      loadGallery();
    }

  }, [open]);

  const loadGallery = async () => {

    const res = await API.post("/turf/gallery/list", {
      turf_id: turf.id
    });

    setGallery(res.data.data);

  };

  const uploadImages = async () => {

    if (images.length === 0) return;

    const formData = new FormData();

    formData.append("turf_id", turf.id);
    formData.append("turf_name", turf.turf_name);

    images.forEach((img) => {

      formData.append("images", img);

    });

    await API.post(
      "/turf/gallery/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    setImages([]);

    loadGallery();

  };

  const deleteImage = async (image) => {

    await API.delete("/turf/gallery/delete", {
      data: {
        gallery_id: image.id,
        image_path: image.image_path
      }
    });

    loadGallery();

  };

  if (!open) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-5xl h-[78vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Turf Gallery
            </h2>

            <p className="text-sm text-slate-500">
              {turf.turf_name}
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* Upload Section */}

        <div className="border-b bg-slate-50 px-5 py-4">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <label className="text-sm font-medium text-slate-700">
                Upload Images
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages([...e.target.files])}
                className="mt-2 block text-sm"
              />

              <p className="mt-2 text-sm text-slate-500">
                {gallery.length}/12 Images Uploaded
              </p>

            </div>

            <button
              onClick={uploadImages}
              disabled={images.length === 0 || gallery.length >= 12}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-white font-medium hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
            >
              <Upload size={18} />

              Upload
            </button>

          </div>

        </div>

        {/* Gallery */}

        <div className="flex-1 overflow-y-auto p-5">

          {gallery.length === 0 ? (

            <div className="flex h-full flex-col items-center justify-center text-center">

              <ImageIcon
                size={70}
                className="text-slate-300"
              />

              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                No Images Found
              </h3>

              <p className="mt-2 text-slate-500">
                Upload your first gallery image.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

              {gallery.map((image) => (

                <div
                  key={image.id}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="relative">

                    <img
                      src={IMAGE_URL + image.image_path}
                      alt={image.image_name}
                      className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <button
                      onClick={() => deleteImage(image)}
                      className="absolute top-2 right-2 rounded-full bg-red-600 p-2 text-white opacity-0 shadow transition group-hover:opacity-100 hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                  <div className="p-3">

                    <p className="truncate text-sm font-medium text-slate-700">
                      {image.image_name}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}