declare const heic2any: any;

export const convertHeicToPng = async (file: File): Promise<Blob> => {
  try {
    const result = await heic2any({
      blob: file,
      toType: "image/png",
    });
    return result as Blob;
  } catch (error) {
    console.error("Conversion error:", error);
    throw new Error("Failed to convert HEIF to PNG");
  }
};
