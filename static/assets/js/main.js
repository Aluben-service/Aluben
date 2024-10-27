localforage.setDriver([
	localforage.INDEXEDDB,
	localforage.WEBSQL,
	localforage.LOCALSTORAGE,
]);

const themes = {
	bannana_split: "bannana_split",
};

// Load theme dynamically
document.addEventListener("DOMContentLoaded", async () => {
	// Get the saved theme from localStorage
	let savedTheme = await localforage.getItem("theme");

	// If there's a saved theme, set the corresponding option as selected
	if (savedTheme === null || savedTheme === undefined) {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "/assets/css/styles.css";
	} else if (savedTheme === "Default") {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "/assets/css/styles.css";
	} else {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = `/assets/css/themes/${savedTheme}.css`;
		const themesDropdown = document.getElementById("themes");
		themesDropdown.value = savedTheme;
	}
});

let cloaks;

localforage.getItem("customcloak").then((customCloak) => {
	cloaks = {
		Ebay: {
			favicon: "https://www.ebay.com/favicon.ico",
			title: "Error Page | Ebay",
		},
		Drive: {
			favicon:
				"https://raw.githack.com/Aluben-service/Aluben_icons/main/drive.png",
			title: "My Drive - Google Drive",
		},
		Classroom: {
			favicon:
				"https://raw.githack.com/Aluben-service/Aluben_icons/main/classroom.png",
			title: "Home",
		},
		Schoology: {
			favicon:
				"https://raw.githack.com/Aluben-service/Aluben_icons/main/schoology.png",
			title: "Home | Schoology",
		},
		Gmail: {
			favicon:
				"https://raw.githack.com/Aluben-service/Aluben_icons/main/gmail.png",
			title: "Gmail",
		},
		Clever: {
			favicon:
				"https://raw.githack.com/Aluben-service/Aluben_icons/main/clever.png",
			title: "Clever | Portal",
		},
		Khan: {
			favicon:
				"https://raw.githack.com/Aluben-service/Aluben_icons/main/khan.png",
			title: "Dashboard | Khan Academy",
		},
		Google: {
			favicon:
				"https://raw.githack.com/Aluben-service/Aluben_icons/main/google.png",
			title: "Google",
		},
		Custom: {
			title: customCloak?.title || "Google",
			favicon:
				customCloak?.favicon ||
				"https://raw.githack.com/Aluben-service/Aluben_icons/main/google.png",
		},
	};
});

Object.freeze(cloaks);

function changeFavicon(src) {
	try {
		// Check if favicon link already exists
		let faviconLink = document.querySelector("link[rel*='icon']");

		if (!faviconLink) {
			faviconLink = document.createElement("link");
			faviconLink.rel = "icon";
			document.head.appendChild(faviconLink);
		}

		faviconLink.href = src;
	} catch (error) {
		console.error("Error fetching favicon from localforage:", error);
	}
}

(async function () {
	const cloak = await localforage.getItem("cloak");
	const customcloak = await localforage.getItem("customcloak");

	const settings = cloaks[cloak] || customcloak || cloaks["Google"];
	changeFavicon(settings?.favicon);
	document.title = settings?.title;
})();

window.addEventListener("keydown", async (event) => {
	console.log("Typed key: " + event.key);
	let panicurl =
		(await localforage.getItem("panicurl")) || "https://google.com";
	panicurl = panicurl.replace(/\/$/, "");
	let panickey = await localforage.getItem("panickey");
	if (event.key === panickey) {
		window.location.href = panicurl;
	}
});
function handleVisibilityChange() {
	localforage.getItem("clickoff_cloaking").then((clickoffCloaking) => {
		if (clickoffCloaking === "true") {
			if (document.hidden) {
				document.title = "Google";
				const originalFavicon =
					document.querySelector("link[rel*='icon']").href;
				document.querySelector("link[rel*='icon']").href =
					"https://raw.githubusercontent.com/whitespider-dev/whitespider/Main/res/google.ico";
			} else {
				document.title = "Aluben";
				document.getElementById("favicon").href = originalFavicon;
			}
		}
	});
}

document.addEventListener("visibilitychange", handleVisibilityChange);

document.onkeydown = (e) => {
	if (e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
		switch (e.key) {
			default:
				break;
		}
	}
};

console.log(this);
