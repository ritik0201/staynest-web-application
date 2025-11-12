"use client";

import { useState, FormEvent } from "react";
import RegisterModal from "@/components/modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CommentForm({ slug }: { slug: string }) {
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { status } = useSession();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment) {
      setError("Comment cannot be empty.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit comment");
      }

      setComment("");
      router.refresh(); // Refresh the page to show the new comment
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "unauthenticated") {
    return (
      <>
        <p className="text-gray-400">
          Please{" "}
          <button
            onClick={() => setOpenModal(true)}
            className="text-purple-400 hover:underline focus:outline-none"
          >
            log in
          </button>{" "}
          to write a comment.
        </p>
        <RegisterModal open={openModal} handleClose={() => setOpenModal(false)} />
      </>
    );
  }

      return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-2xl font-semibold">Write a comment</h3>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
            required
          ></textarea>
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <button type="submit" disabled={submitting} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md disabled:bg-gray-500">
          {submitting ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
    );
  }