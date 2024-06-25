import { Rotate3D } from "lucide-react";

export default function LoadSpinner() {
  return (
    // <div className="flex justify-center items-center h-full">
    //   <LoaderCircle color="#75A107" className="mr-2 h-10 w-10 animate-spin" />
    // </div>
    <div className="flex flex-col justify-center items-center h-full bg-gray-50">
      <div className="flex justify-center items-center">
        <Rotate3D color="#7C3AED" className="mr-2 h-10 w-10 animate-spin" />
      </div>
      <p className="text-gray-700 mt-4 animate-ping">Loading...</p>
    </div>
  );
}
