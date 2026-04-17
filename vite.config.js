import { defineConfig } from "vite";
import { glob } from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import SortCss from "postcss-sort-media-queries";

export default defineConfig(({ command }) => {
  // Отримуємо всі HTML файли, використовуючи прямі слеші (для Windows)
  const formattedInput = glob.sync("./src/**/*.html").reduce((acc, file) => {
    // Створюємо зрозуміле ім'я для кожного файлу (наприклад, 'index' або 'sections/header')
    const name = file.replace("./src/", "").replace(".html", "");
    acc[name] = file;
    return acc;
  }, {});

  return {
    define: {
      [command === "serve" ? "global" : "global"]: {},
    },
    root: "src",
    build: {
      sourcemap: true,
      outDir: "../dist",
      emptyOutDir: true,
      rollupOptions: {
        // Якщо glob нічого не знайшов, ми вручну перевіримо шлях
        input:
          Object.keys(formattedInput).length > 0
            ? formattedInput
            : { main: "index.html" },
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          entryFileNames: "[name].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },
    plugins: [injectHTML(), FullReload(["./src/**/*.html"])],
    css: {
      postcss: {
        plugins: [SortCss()],
      },
    },
  };
});
