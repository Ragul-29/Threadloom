import { useEffect, useRef, useState } from "react";

const COLOR_MAP = {
  blue: "#2454a6",
  cream: "#e8dcc8",
  white: "#f5f5f2",
  black: "#171717",
  red: "#a62d2d",
  green: "#3f6948",
  pink: "#d88d9d",
  brown: "#704b36",
  beige: "#cdbb9f",
  yellow: "#d8b83e",
  orange: "#c96c2f",
  purple: "#75528c",
  grey: "#8a8a86",
  gray: "#8a8a86",
  maroon: "#6e2630",
  navy: "#1d3157",
};

function getColorValue(color) {
  const key = String(color || "")
    .toLowerCase()
    .trim();

  return COLOR_MAP[key] || color || "#777777";
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");

  if (clean.length !== 6) {
    return { r: 128, g: 128, b: 128 };
  }

  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function ProductColorImage({
  image,
  mask,
  color,
  alt = "",
  className = "",
  onClick,
}) {
  const canvasRef = useRef(null);
  const [maskLoaded, setMaskLoaded] = useState(false);

  useEffect(() => {
    if (!image) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) return;

    const baseImage = new Image();
    baseImage.crossOrigin = "anonymous";

    const maskImage = new Image();
    maskImage.crossOrigin = "anonymous";

    baseImage.onload = () => {
      const width = baseImage.naturalWidth;
      const height = baseImage.naturalHeight;

      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);

      // Draw original image first.
      ctx.drawImage(
        baseImage,
        0,
        0,
        width,
        height
      );

      // No mask = show original image.
      if (!mask) {
        setMaskLoaded(false);
        return;
      }

      maskImage.onload = () => {
        try {
          const maskCanvas =
            document.createElement("canvas");

          maskCanvas.width = width;
          maskCanvas.height = height;

          const maskCtx =
            maskCanvas.getContext("2d", {
              willReadFrequently: true,
            });

          maskCtx.drawImage(
            maskImage,
            0,
            0,
            width,
            height
          );

          const originalPixels =
            ctx.getImageData(
              0,
              0,
              width,
              height
            );

          const maskPixels =
            maskCtx.getImageData(
              0,
              0,
              width,
              height
            );

          const output =
            originalPixels.data;

          const maskData =
            maskPixels.data;

          const targetColor =
            hexToRgb(getColorValue(color));

          for (
            let i = 0;
            i < output.length;
            i += 4
          ) {
            const maskRed = maskData[i];
            const maskGreen = maskData[i + 1];
            const maskBlue = maskData[i + 2];
            const maskAlpha = maskData[i + 3];

            /*
             * White area of mask = dress.
             * Black/transparent area = keep original.
             */
            const maskStrength =
              Math.max(
                maskRed,
                maskGreen,
                maskBlue
              ) / 255;

            const alphaStrength =
              maskAlpha / 255;

            const strength =
              maskStrength * alphaStrength;

            if (strength < 0.05) {
              continue;
            }

            const originalR = output[i];
            const originalG = output[i + 1];
            const originalB = output[i + 2];

            /*
             * Calculate original brightness.
             * This keeps the original dress
             * shadows and highlights.
             */
            const brightness =
              0.299 * originalR +
              0.587 * originalG +
              0.114 * originalB;

            const normalizedBrightness =
              Math.max(
                0.35,
                Math.min(
                  1.15,
                  brightness / 180
                )
              );

            const newR = Math.min(
              255,
              targetColor.r *
                normalizedBrightness
            );

            const newG = Math.min(
              255,
              targetColor.g *
                normalizedBrightness
            );

            const newB = Math.min(
              255,
              targetColor.b *
                normalizedBrightness
            );

            /*
             * Blend the new colour with
             * the original fabric.
             */
            output[i] =
              originalR * (1 - strength) +
              newR * strength;

            output[i + 1] =
              originalG * (1 - strength) +
              newG * strength;

            output[i + 2] =
              originalB * (1 - strength) +
              newB * strength;
          }

          ctx.putImageData(
            originalPixels,
            0,
            0
          );

          setMaskLoaded(true);
        } catch (error) {
          console.error(
            "Mask processing failed:",
            error
          );

          setMaskLoaded(false);

          ctx.clearRect(
            0,
            0,
            width,
            height
          );

          ctx.drawImage(
            baseImage,
            0,
            0,
            width,
            height
          );
        }
      };

      maskImage.onerror = () => {
        console.warn(
          `Mask not found: ${mask}`
        );

        setMaskLoaded(false);

        ctx.clearRect(
          0,
          0,
          width,
          height
        );

        ctx.drawImage(
          baseImage,
          0,
          0,
          width,
          height
        );
      };

      maskImage.src = mask;
    };

    baseImage.onerror = () => {
      console.error(
        `Product image could not load: ${image}`
      );
    };

    baseImage.src = image;
  }, [image, mask, color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onClick={onClick}
      aria-label={alt}
      role={onClick ? "button" : undefined}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        cursor: onClick
          ? "zoom-in"
          : "default",
      }}
      data-mask-loaded={maskLoaded}
    />
  );
}

export default ProductColorImage;