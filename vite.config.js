import { defineConfig } from "vite";
import { glob } from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import SortCss from "postcss-sort-media-queries"; 

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },
    root: "src",
    css: {
      postcss: {
        plugins: [
          SortCss({
            sort: "mobile-first",
          }),
        ],
      },
    },
    build: {
      base: "/UMT-markup-practice-kotliar/",
      sourcemap: true,
      rollupOptions: {
        input: glob.sync("./src/*.html"),
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith(".css")) {
              return "assets/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
      outDir: "../dist",
      emptyOutDir: true,
    },
    plugins: [injectHTML(), FullReload(["./src/**/**.html"])],
  };
});
