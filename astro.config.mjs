import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import franken from "franken-ui/plugin-vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      franken({
        preflight: false,
        layer: true,
        layerExceptions: ["chart"],
      }),
    ],
  },
});
