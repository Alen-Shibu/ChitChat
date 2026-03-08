import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="signup-blob signup-blob--1" />
      <div className="signup-blob signup-blob--2" />
      <div className="page-loader__spinner">
        <LoaderIcon className="w-8 h-8 animate-spin" />
      </div>
    </div>
  );
}

export default PageLoader;