import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* match the page background decorators so the loader blends in */}
      <div className="absolute inset-0 bg-linear-to-tr from-indigo-500 to-purple-600 opacity-50" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full opacity-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400 rounded-full opacity-15 blur-xl" />

      <LoaderIcon className="w-12 h-12 text-white animate-spin z-10" />
    </div>
  );
}

export default PageLoader;