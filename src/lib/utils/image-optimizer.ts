/**
 * Opciones para la optimización de la imagen.
 */
export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0 a 1
}

/**
 * Optimiza una imagen en el lado del cliente utilizando Canvas API.
 * Convierte la imagen a WebP para reducir su tamaño de manera significativa.
 * Si el archivo es un SVG, lo devuelve sin modificar.
 * 
 * @param file El archivo de imagen original
 * @param options Opciones de escalado y compresión
 * @returns Un Promise que resuelve con el archivo optimizado (o el original si es SVG)
 */
export const optimizeImage = async (
  file: File,
  options: ImageOptimizationOptions = {}
): Promise<File> => {
  // Ignorar SVG, devolver intacto
  if (file.type === "image/svg+xml") {
    return file;
  }

  const { maxWidth = 1920, maxHeight = 1080, quality = 0.8 } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calcular nuevas dimensiones manteniendo la relación de aspecto
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return reject(new Error("No se pudo obtener el contexto 2D del canvas"));
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error("No se pudo comprimir la imagen"));
            }
            
            // Generar nuevo nombre de archivo manteniendo la convención si existe
            const nameWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
            const newFileName = `${nameWithoutExtension}.webp`;

            const optimizedFile = new File([blob], newFileName, {
              type: "image/webp",
              lastModified: Date.now(),
            });

            resolve(optimizedFile);
          },
          "image/webp",
          quality
        );
      };

      img.onerror = () => {
        reject(new Error("Error al cargar la imagen para optimizar"));
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error("Error al leer el archivo"));
    };

    reader.readAsDataURL(file);
  });
};
