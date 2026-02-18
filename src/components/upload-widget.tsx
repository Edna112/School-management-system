import { UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../constants";
import { UploadWidgetValue } from "../types";

interface UploadWidgetPropsWithField {
  value?: UploadWidgetValue | null;
  onChange?: (file: UploadWidgetValue | null, field?: unknown) => void;
  disabled?: boolean;
  field?: unknown;
}

const UploadWidget = ({ value = null, onChange, disabled = false, field }: UploadWidgetPropsWithField) => {
  const widgetRef = useRef<CloudinaryWidget | null>(null);
  const onChangeRef = useRef(onChange);
  const fieldRef = useRef(field);

  const [preview, setPreview] = useState<UploadWidgetValue | null>(value);
  // const [deleteToken, setDeleteToken] = useState<string | null>(null);
  // const [isRemoving, setIsRemoving] = useState(false);
  // Initialize Cloudinary Upload Widget
  useEffect(() => {
    setPreview(value);
    // if (!value) setDeleteToken(null);
  }, [value]);
  // Update onChange and field parameter
  useEffect(() => {
    onChangeRef.current = onChange;
    fieldRef.current = field;
  }, [onChange, field]);

  //initialize Cloudinary Upload Widget for client side only
  useEffect(() => {
    if (typeof window === "undefined") return; //exit if server side rendering

    //create new instance of cloudinary upload widget
    const initializeWidget = () => {
      if (!window.cloudinary || widgetRef.current) return false;
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          uploadPreset: CLOUDINARY_UPLOAD_PRESET,
          multiple: false,
          folder: "uploads",
          maxFileSize: 500000, //5mb
          clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
          maxFiles: 1,
          cropping: true, // Enable cropping
          croppingAspectRatio: 16 / 9, // Example: force 16:9 aspect ratio (customize as needed)
          croppingShowDimensions: true, // Show dimensions to user
          croppingCoordinatesMode: "custom", // Allow user to select crop area
          showSkipCropButton: false, // Hide skip crop to force cropping
        },
        (error, result) => {
          if (!error && result.event === "success") {
            const payload: UploadWidgetValue = {
              url: result.info.secure_url ?? (result.info as { url?: string }).url ?? "",
              publicId: result.info.public_id,
            };
            setPreview(payload);
            // setDeleteToken(result.info.delete_token || null);
            onChangeRef.current?.(payload, fieldRef.current);
          }
        },
      );
      return true;
    };
    if (initializeWidget()) return;

    //creating an interval id(pull until cloudinary script is loaded)
    const intervalId = window.setInterval(() => {
      if (initializeWidget()) {
        window.clearInterval(intervalId);
      }
    }, 500);

    //return the cleanup function to clear the interval
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const openWidget = () => {
    if (!disabled) widgetRef.current?.open();
  };

  // const removeFromCloudinary = async () => {};

  return (
    <div className="space-y-2">
      {/*preview image if available*/}
      {preview ? (
        <div className="upload-preview">
          <img
            src={preview.url}
            alt="Upload preview"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ) : (
        <div
          className="upload-dropzone"
          role="button"
          tabIndex={0}
          onClick={openWidget}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              openWidget();
            }
          }}
        >
          <div className="upload-prompt">
            <UploadCloud className="upload" />
            <div>
              <p>Click to upload</p>
              <p>PNG, JPG, JPEG up to 5mb</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
