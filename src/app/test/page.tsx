"use client";

import { User, Mail, Star } from "lucide-react";

export default function ReviewCard() {
  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-purple-100 via-white to-purple-50 rounded-2xl shadow-lg border border-purple-200 p-6">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-purple-200">
          <User className="w-8 h-8 text-purple-700" />
        </div>
        <div>
          <p className="font-semibold text-lg text-purple-800">John Doe</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="w-4 h-4 text-gray-400" /> johndoe@example.com
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">4.0/5</span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm leading-relaxed mt-3">
        “The service was excellent, the support team was super helpful and
        quick to respond. Definitely recommend it to others looking for
        quality and reliability.”
      </p>
    </div>
  );
}
