module.exports = {
	roots: ["./src"],
	transform: {
		"^.+\\.jsx?$": require.resolve("babel-jest"),
		"^.+\\.tsx?$": "ts-jest"
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
