import * as deepar from "deepar";
import Carousel from "./carousel.js";

// Log the version. Just in case.
console.log("Deepar version: " + deepar.version);

export default function FaceFilterComponent(){

  const loadFilter=async()=>{
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
    }

    return(
      <div>
        <div class="fixed-fullscreen" id="loading-screen">
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        "
      >
        <img
          id="initial-loading-logo"
          style="max-width: 200px"
          src="/images/crystal.png"
          class="animate-bounce"
        />
        <div
          style="
            width: 100%;
            height: 8px;
            margin-top: 20px;
            background-color: rgb(55 65 81 / 1);
            border-radius: 100px;
            overflow: hidden;
          "
        >
          <div id="loading-progress-bar"></div>
        </div>
        <img
          id="initial-loading-text"
          style="max-width: 140px; margin-top: 30px"
          src="/images/powered-by.svg"
        />
      </div>
    </div>

    {/* <!-- permission denied screen --> */}
    <div
      class="fixed-fullscreen screen"
      id="permission-denied-screen"
      style="display: none"
    >
      <div class="permission-denied-text-container">
        <div class="permission-denied-text" id="camera_denied">
          <p>Please reload and allow camera access to use this app.</p>
          <a
            class="permission-denied-button"
            href="https://www.deepar.ai/projects"
            target="__blank"
          >
            Discover more
          </a>
        </div>
      </div>
    </div>

    {/* <!-- AR screen --> */}
    <div id="ar-screen" style="display: none">
      <canvas class="deepar" id="deepar-canvas"></canvas>

      <div class="carousel" id="carousel">
        <div class="carousel-center" id="carousel-center">
          <div class="lds-ring" id="loading-spinner" style="display: none">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="carousel-slider">
          <div class="slide">
            <img class="responsive-img" src="thumbs/ray-ban-wayfarer.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/viking.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/makeup.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/makeup-split.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/flower_face.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/stallone.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/galaxy.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/humanoid.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/devil_horns.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/ping_pong.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/pixel_hearts.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/snail.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/hope.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/vendetta.png" />
          </div>
          <div class="slide">
            <img class="responsive-img" src="thumbs/fire.png" />
          </div>
        </div>
      </div>
    </div>
      </div>
    )

}