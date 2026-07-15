import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
    ArrowLeft,
    Images,
    Upload,
    Trash2,
} from "lucide-react";

const IMAGE_URL = "http://192.168.1.17:4500";

export default function TurfGallery() {

    const [collapsed, setCollapsed] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();

    const [gallery, setGallery] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {

        loadGallery();

    }, []);

    const loadGallery = async () => {

        const res = await API.post("/turf/gallery/list", {

            turf_id: id,

        });

        setGallery(res.data.data);

    };

    const uploadImages = async () => {

        if (images.length === 0) return;

        if (gallery.length + images.length > 12) {

            alert("Maximum 10 images allowed.");

            return;

        }

        const formData = new FormData();

        formData.append("turf_id", id);
        formData.append("turf_name", state.turfName);

        images.forEach((img) => {

            formData.append("images", img);

        });

        await API.post(
            "/turf/gallery/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        setImages([]);

        loadGallery();

    };

    const deleteImage = async (image) => {

        if (!window.confirm("Delete Image?")) return;

        await API.delete("/turf/gallery/delete", {

            data: {

                gallery_id: image.id,
                image_path: image.image_path,

            },

        });

        loadGallery();

    };

    return (
        <div className="flex h-screen overflow-hidden bg-white">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 flex flex-col overflow-hidden">

                <Header setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto pl-8">


                    <div>

                        <div className="mx-auto max-w-7xl">



                            <div className="flex items-center justify-between">

                                <div>



                                    <h1 className="mt-3 text-2xl font-bold">

                                        {state.turfName}

                                    </h1>

                                    <p className="text-slate-500">

                                        Manage Gallery Images

                                    </p>

                                </div>

                                <div className="rounded-xl bg-white px-5 py-3 shadow">

                                    <div className="flex items-center gap-2">

                                        <Images size={20} />

                                        {gallery.length}/12 Images

                                    </div>

                                </div>

                            </div>

                            {/* Upload */}
                            <div className="mt-8 grid gap-6 lg:grid-cols-2">

                            

                            <div className="mt-10 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-8 pt-2 w-[90%]">

                                <div className="flex flex-col items-center justify-center text-center">

                                    <Upload
                                        size={55}
                                        className="text-emerald-600"
                                    />

                                    <h2 className="mt-4 text-xl font-semibold text-slate-800">
                                        Upload Turf Images
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Click the button below to select up to 12 gallery images.
                                    </p>

                                    <label
                                        htmlFor="gallery-upload"
                                        className="mt-6 cursor-pointer rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition hover:bg-emerald-800"
                                    >
                                        Select Images
                                    </label>

                                    <input
                                        id="gallery-upload"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setImages([...e.target.files])}
                                    />

                                    {images.length > 0 && (
                                        <>
                                            <p className="mt-4 text-sm font-medium text-emerald-700">
                                                {images.length} image(s) selected
                                            </p>

                                            <button
                                                onClick={uploadImages}
                                                className="mt-5 rounded-xl bg-emerald-800 px-6 py-3 text-white hover:bg-emerald-700"
                                            >
                                                Upload Images
                                            </button>
                                        </>
                                    )}

                                </div>
                                

                            </div>
                            <div className="rounded-2xl border bg-white p-6 shadow">

      <h2 className="text-xl font-semibold">
          Gallery Information
      </h2>

      <div className="mt-6 space-y-5">

          <div className="flex justify-between">
              <span>Total Images</span>
              <span>{gallery.length}/12</span>
          </div>

          <div className="flex justify-between">
              <span>Remaining</span>
              <span>{12-gallery.length}</span>
          </div>

          <div className="flex justify-between">
              <span>Supported</span>
              <span>JPG, PNG</span>
          </div>

          <div className="flex justify-between">
              <span>Maximum</span>
              <span>12 Images</span>
          </div>

      </div>

  </div>    
  </div>

                            {/* Gallery */}

                            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                {gallery.map((image) => (

                                    <div
                                        key={image.id}
                                        className="overflow-hidden rounded-2xl bg-white shadow hover:shadow-xl transition"
                                    >

                                        <img
                                            src={IMAGE_URL + image.image_path}
                                            className="h-52 w-full object-cover"
                                        />

                                        <div className="flex items-center justify-between p-4">

                                            <span className="truncate text-sm">

                                                {image.image_name}

                                            </span>

                                            <button
                                                onClick={() =>
                                                    deleteImage(image)
                                                }
                                                className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-600 hover:text-white transition"
                                            >

                                                <Trash2 size={18} />

                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                            {gallery.length === 0 && (

                                <div className="mt-20 text-center text-slate-400">

                                    <Images
                                        size={70}
                                        className="mx-auto"
                                    />

                                    <h2 className="mt-4 text-xl font-semibold">

                                        No Gallery Images

                                    </h2>

                                </div>

                            )}

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}



