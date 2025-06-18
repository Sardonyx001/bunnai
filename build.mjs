import dts from "bun-plugin-dts";

await Bun.build({
	entrypoints: ["./src/index.ts"],
	target: "bun",
	outdir: "./dist",
	minify: true,
});
