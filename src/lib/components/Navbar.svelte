<script>
	import Swal from "../utils/sweetAlerts.js"; // Adjust the path as needed

	// const Byblk = () => open("./byeblock", "_self");
	const apps = () => open("/apps", "_self");
	const games = () => open("/games", "_self");
	const settings = () => open("/settings", "_self");
	const home = () => open("/", "_self");
	const chat = () => open("/chat", "_self");
	// const prox = () => open("/prox", "_self");
	/*
	const aboutblank = () => {
		let win = window.open();
		let url = window.location.href;
		let iframe = win.document.createElement("iframe");
		iframe.style =
			"position:fixed;width:100vw;height:100vh;top:0x;left:0px;right:0px;bottom:0px;z-index:2147483647;background-color:white;border:none;";
		iframe.src = url;
		win.document.body.appendChild(iframe);
	};*/
	const calculator = async () => {
		// Prompt the user for input using SweetAlert2
		const { value: calculation } = await Swal.fire({
			title: "Enter a calculation",
			input: "text",
			inputLabel:
				"Calculation (only +, -, *, /, whatever else will be ignored):",
			inputPlaceholder: "e.g., 3 + 5 * (2 - 8)",
			showCancelButton: true,
			confirmButtonText: "Calculate",
			cancelButtonText: "Cancel",
		});

		// Check if the user pressed "Cancel" or entered nothing
		if (calculation !== null && calculation.trim() !== "") {
			// Sanitize the input
			const sanitizedCalculation = calculation.replace(
				/[^-()\d/*+.]/g,
				"",
			);

			// Perform the calculation
			try {
				// Use Function constructor safely
				const result = Function(
					'"use strict"; return (' + sanitizedCalculation + ")",
				)();
				// Show the result using SweetAlert2
				await Swal.fire({
					title: "Result",
					text: `The result is: ${result}`,
					icon: "info",
					confirmButtonText: "OK",
				});
			} catch (error) {
				// Handle any errors
				await Swal.fire({
					title: "Error",
					text: "There was an error with the calculation.",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
		}
	};
</script>

<div class="navbar" id="navbar">
	<button class="button" on:click={home}>Home</button>
	<button class="button" on:click={chat}>Chat</button>
	<!-- imma add this to like a utilities thing, testuserforlearning	<button class="button" on:click={calculator}
		>Calculator</button
	>-->
	<button class="button" on:click={apps}>Apps</button>
	<button class="button" on:click={games}>Games</button>
	<button class="button" on:click={settings}>Settings</button>
	<!--	<button class="button" type="button" on:click={aboutblank}
		>open in about:blank</button
	> stop trolling me with this -->
	<!-- fine lol -->
	<!-- <section id="controls" is="chemical-controls">
		<button on:click={() => chemicalAction("back", "web")}>Back</button>
		<button on:click={() => chemicalAction("forward", "web")}
			>Forward</button
		>
		<button on:click={() => window.open(document.getElementById("web").src)}
			>Open in a new tab</button
		>
		<button on:click={() => chemicalAction("reload", "web")}>Reload</button>
		<button on:click={() => chemicalAction("close", "web")}>Close</button>
	</section> -->
</div>

<style>
	:global(.button) {
		margin-top: 2px;
		background-color: #0b0724;
		color: floralwhite;
		margin-top: 2px;
		background-color: #0b0724;
		color: floralwhite;
		border: 1px dotted rgb(43, 207, 21);
		border-radius: 5px;
		padding: 2px 4px;
		padding: 2px 4px;
		margin: 5px;
	}

	:global(.button:hover) {
		transition: 1000ms;
		padding: 2px 8px;
		padding: 2px 8px;
		transform: translateY(-0px);
		background-color: #0b0724;
		color: floralwhite;
		border: solid 3px rgb(252, 245, 115);
	}

	.navbar {
		color: rgb(255, 255, 255);
		background-color: rgb(36, 36, 36);
		/*opacity: 0.8; /* Adjust the value between 0 and 1 to control transparency */
		text-align: center;
		position: fixed;
		height: 35px;
		width: 100%;
		top: 0;
		z-index: 10;
		left: 0;
		backdrop-filter: blur(10px);
		background: rgba(255, 255, 255, 0.3);
	}

	/* Add margin to the top of the content to prevent it from overlapping with the navbar */
	:global(html) {
		margin-top: 35px; /* Same height as the navbar */
	}
</style>
