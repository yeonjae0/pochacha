import * as deepar from "deepar";
import Carousel from "./carousel.js";

// Log the version. Just in case.
console.log("Deepar version: " + deepar.version);

// Top-level await is not supported.
// So we wrap the whole code in an async function that is called immediatly.
(async function () {
  // Resize the canvas according to screen size and pixel ratio.
  const canvas = document.getElementById("deepar-canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);

  // trigger loading progress bar animation
  const loadingProgressBar = document.getElementById("loading-progress-bar");
  loadingProgressBar.style.width = "100%";

  // All the effects are in the public/effects folder.
  // Here we define the order of effect files.
  const effectList = [
    "effects/ray-ban-wayfarer.deepar",
    "effects/viking_helmet.deepar",
    "effects/MakeupLook.deepar",
    "effects/Split_View_Look.deepar",
    "effects/flower_face.deepar",
    "effects/Stallone.deepar",
    "effects/galaxy_background_web.deepar",
    "effects/Humanoid.deepar",
    "effects/Neon_Devil_Horns.deepar",
    "effects/Ping_Pong.deepar",
    "effects/Pixel_Hearts.deepar",
    "effects/Snail.deepar",
    "effects/Hope.deepar",
    "effects/Vendetta_Mask.deepar",
    "effects/Fire_Effect.deepar",
  ];

  let deepAR = null;

  // Initialize DeepAR with an effect file.
  try {
    deepAR = await deepar.initialize({
      licenseKey: "278cc7b9cd550b7b553b0c6b3629c269ea59e76ba24c8393a927b41264da4ff4ca7c1a0d1e640e90",
      canvas,
      effect: effectList[0],
      // Removing the rootPath option will make DeepAR load the resources from the JSdelivr CDN,
      // which is fine for development but is not recommended for production since it's not optimized for performance and can be unstable.
      // More info here: https://docs.deepar.ai/deepar-sdk/deep-ar-sdk-for-web/download-optimizations#custom-deployment-of-deepar-web-resources
      rootPath: "./deepar-resources",
    });
  } catch (error) {
    console.error(error);
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("permission-denied-screen").style.display = "block";
    return;
  }

  var resizeCanvas = function () {
    const canvas = document.getElementById("deepar-canvas");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
  };

  window.addEventListener("resize", resizeCanvas);

  // Hide the loading screen.
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("ar-screen").style.display = "block";

  window.effect = effectList[0];

  const glassesCarousel = new Carousel("carousel");
  glassesCarousel.onChange = async (value) => {
    const loadingSpinner = document.getElementById("loading-spinner");

    if (window.effect !== effectList[value]) {
      loadingSpinner.style.display = "block";
      await deepAR.switchEffect(effectList[value]);
      window.effect = effectList[value];
    }
    loadingSpinner.style.display = "none";
  };
})();
