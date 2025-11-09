import React from "react";
import parse, { Element } from "html-react-parser";
import Image from "next/image";

// Fetch a single blog using slug
async function getBlog(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch blog");

  return res.json();
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; 
  const blog = await getBlog(slug);

  // Parse and style content dynamically
  const styledContent = parse(blog.content, {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const tag = domNode.name;
        const classMap: Record<string, string> = {
          h1: "text-3xl md:text-4xl font-bold text-pink-400 mb-4",
          h2: "text-2xl font-semibold text-purple-400 mt-6 mb-3",
          h3: "text-1xl font-semibold text-blue-400 mt-5 mb-2",
          h4: "text-xl font-semibold text-indigo-400 mt-4 mb-2",
          p: "text-gray-300 leading-relaxed mb-4",
          strong: "text-white font-semibold",
          a: "text-purple-400 hover:underline",
          ul: "list-disc list-inside text-white mb-4",
          ol: "list-decimal list-inside text-white mb-4",
          li: "mb-1",
        };

        const extraClass = classMap[tag];
        if (extraClass) {
          domNode.attribs = {
            ...domNode.attribs,
            className: `${domNode.attribs.className || ""} ${extraClass}`,
          };
        }
      }
    },
  });

  return (
    <div className="min-h-screen text-white pt-20 py-10">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {blog.coverImage && (
          <div className="relative w-full h-72 mb-8">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover rounded-2xl shadow-lg shadow-purple-500/20"
            />
          </div>
        )}

        <article>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {blog.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-400 text-md mb-10">
            <p>
              Published on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            {blog.writerName && (
              <p className="mt-2 sm:mt-0">Written by: <span className="font-semibold text-gray-300">{blog.writerName}</span></p>
            )}
          </div>

          {/* Dynamic content rendering with automatic class injection */}
          <div>{styledContent}</div>
        </article>
      </div>
    </div>
  );
}
