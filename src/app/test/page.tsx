 "use client";

// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const center = {
//   lat: 28.6139,
//   lng: 77.2090,
// };

// export default function StudentStayMap() {
//   return (
//     <div className="pt-20">
//       <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
//           <Marker position={center} />
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// }

import React, { useState } from "react";

const ImageGallery = () => {
  const images = [
    "https://picsum.photos/id/1018/600/400",
    "https://picsum.photos/id/1025/600/400",
    "https://picsum.photos/id/1035/600/400",
    "https://picsum.photos/id/1043/600/400",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center p-6">
      {/* Big Image */}
      <div className="w-full max-w-3xl h-[400px] mb-6">
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Small Images */}
      <div className="flex gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`w-24 h-16 object-cover rounded-md cursor-pointer border-2 
              ${selectedImage === img ? "border-blue-500" : "border-transparent"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
