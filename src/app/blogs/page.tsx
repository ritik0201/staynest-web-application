import Link from "next/link";
import Image from "next/image";
import { IBlog } from "@/models/blog";

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export default async function BlogsPage() {
  const blogs: IBlog[] = await getBlogs();

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold mb-12 text-center">
          <span className="">Latest Blogs</span>
        </h1>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-400">No blogs available yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link key={blog._id} href={`/blogs/${blog.slug}`}>
                <div className="group bg-gray-800 border border-purple-500/30 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-2 aspect-square flex flex-col">
                  {blog.coverImage && (
                    <div className="w-full h-2/3 overflow-hidden relative">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:opacity-90 transition-all duration-300 group-hover:scale-110"
                      />
                    </div>
                  )}

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400 text-sm mt-3">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
