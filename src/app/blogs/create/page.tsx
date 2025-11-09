"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";
import Image from "next/image";

// Dynamically import React Quill (fix SSR issue)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [writerName, setWriterName] = useState("")
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to generate a URL-friendly slug from a string
  const generateSlug = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  // Automatically update the slug when the title changes
  useEffect(() => {
    setSlug(generateSlug(title));
  }, [title]);

  // Handle file selection and create a preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImageFile(file);
      setCoverImage(URL.createObjectURL(file)); // Show a local preview
    }
  };

  // Handle blog submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Please enter a title and some content.");
      return;
    }
  
    setLoading(true);
    let uploadedImageUrl = "";
  
    try {
      // If a file is selected, upload it to Cloudinary first
      if (coverImageFile) {
        console.log(
          "Cloudinary Cloud Name:",
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        );
        console.log(
          "Cloudinary Upload Preset:",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );

        const formData = new FormData();
        formData.append("file", coverImageFile);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        );
  
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        uploadedImageUrl = res.data.secure_url;
      }
  
      // Now, post the blog content with the Cloudinary URL
      await axios.post("/api/blogs", {
        title,
        slug, // Send the custom or auto-generated slug
        content,
        coverImage: uploadedImageUrl,
        writerName,
      });
  
      toast.success("✅ Blog created successfully!");
      setTitle("");
      setSlug("");
      setCoverImage("");
      setCoverImageFile(null);
      setContent("");
    } catch (error) {
      console.error(error);
      toast.error("Error creating blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Toolbar configuration for formatting options
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: [] }, { background: [] }], // text and highlight color
      ["blockquote", "code-block"],
      ["clean"],
    ],
  };

  return (
    <div className="min-h-screen pt-20 py-10">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Create a New Blog Post
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white text-black p-8 rounded-2xl shadow-lg"
      >
        {/* Title input */}
        <input
          type="text"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-semibold border-b-2 border-gray-300 p-2 focus:outline-none focus:border-purple-500 transition bg-transparent"
        />

        {/* Slug input */}
        <div className="relative">
          <input
            type="text"
            placeholder="your-blog-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border-b-2 border-gray-300 p-2 pl-28 focus:outline-none focus:border-purple-500 transition bg-transparent"
          />
          <span className="absolute left-2 top-2 text-gray-500">/blogs/</span>
        </div>

        {/* Cover Image Upload */}
        <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 text-center cursor-pointer hover:border-purple-500 transition bg-gray-50">
          <label htmlFor="cover-image-upload" className="cursor-pointer">
            {coverImage ? (
              <Image
                src={coverImage}
                alt="Cover preview"
                width={300}
                height={200}
                className="w-full h-48 object-contain rounded-lg mx-auto"
                unoptimized // Necessary for blob: URLs
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <UploadCloud size={48} className="mb-2" />
                <span className="font-semibold">Click to upload a cover image</span>
                <span className="text-sm">PNG, JPG, GIF up to 10MB</span>
              </div>
            )}
          </label>
          <input
            id="cover-image-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {/* React Quill text editor */}
        <div className="bg-white rounded-lg quill-container border border-gray-200">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-64 md:h-96"
            placeholder="Start writing your blog content here..."
          />
        </div>

        <style jsx global>{`
          .quill-container .ql-editor {
            color: black;
            height: 100%;
            overflow-y: auto;
          }
        `}</style>

        {/* Submit button */}
        <div className="mt-20 flex flex-col md:flex-row justify-end items-center gap-4">
              <input
                type="text"
                value={writerName}
                onChange={(e) => setWriterName(e.target.value)}
                placeholder="Writer's Name"
                className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Publishing..." : "Publish Blog"}
              </button>
            </div>
      </form>
    </div>
  </div>
);

}
