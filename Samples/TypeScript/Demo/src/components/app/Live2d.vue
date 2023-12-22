<template>
  <h1>HI</h1>
</template>

<script>
export default {
  name: "Live2d",
  mounted() {
    // Import the necessary libraries and scripts
    const coreJsScript = document.createElement("script");
    coreJsScript.src = "https://unpkg.com/core-js-bundle@3.6.1/minified.js";
    document.head.appendChild(coreJsScript);

    const live2dScript = document.createElement("script");
    live2dScript.src = "../../../../../../Core/live2dcubismcore.js";
    document.head.appendChild(live2dScript);

    const bundleScript = document.createElement("script");
    bundleScript.src = "./dist/bundle.js";
    document.head.appendChild(bundleScript);
  },
};
</script>
