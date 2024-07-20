const config = {
	content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					snake: "var(--accent-snake)",
					apple: "var(--accent-apple)",
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "var(--destructive-foreground)",
				},
			},
			fontFamily: {
				merienda: ["Merienda", "cursive"],
			},
		},
	},
}

export default config
