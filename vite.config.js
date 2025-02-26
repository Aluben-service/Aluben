import { join } from "node:path";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { partytownVite } from "@builder.io/partytown/utils";
import { ChemicalVitePlugin } from "chemicaljs";

export default defineConfig({
	plugins: [
		sveltekit(),
		partytownVite({
			dest: join(__dirname, "static", "~partytown"),
		}),
		        ChemicalVitePlugin({
            scramjet: false,
            rammerhead: false,
        }),

	]
});
