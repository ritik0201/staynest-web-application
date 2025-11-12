import React from "react";
import parse, { Element } from "html-react-parser";
import Image from "next/image";
import Footer from "@/components/footer";
import CommentForm from "@/components/CommentForm";
import { IComment } from "@/models/blog";

// Fetch a single blog using slug
async function getBlog(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`;
  console.log(`Attempting to fetch blog from: ${url}`);
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text(); // Get the response body as text
    throw new Error(`Failed to fetch blog: Status ${res.status}, Message: ${errorText}`);
  }
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
          h1: "text-4xl md:text-5xl font-bold mb-4",
          h2: "text-3xl font-semibold mt-3 mb-3",
          h3: "text-2xl font-semibold mt-4 mb-2",
          h4: "text-xl font-semibold mt-3 mb-2",
          p: "text-gray-300 leading-relaxed mb-3",
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
    <div className="min-h-screen text-white pt-20 bg-gray-900/50">
      <div className="max-w-4xl mx-auto my-12 p-6 sm:p-8 lg:p-10 bg-gray-800/60 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/10">
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

        <div className="mt-16 pt-8 border-t border-purple-500/30">
          <h2 className="text-3xl font-bold mb-6">Comments ({blog.comments?.length || 0})</h2>
          <div className="space-y-6 mb-10">
            {blog.comments && blog.comments.length > 0 ? (
              blog.comments.map((comment: IComment, index: number) => (
                  <div key={index} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600" >
                  <div className="flex items-center mb-2 flex-wrap">
                    <p className="font-semibold text-purple-300">{comment.username}</p>
                    <span className="text-gray-500 mx-2">•</span>
                    <p className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-300">{comment.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No comments yet. Be the first to comment!</p>
            )}
          </div>
          <CommentForm slug={slug} />
        </div>
      </div>
      < Footer/>
    </div>
  );
}
