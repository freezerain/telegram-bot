/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
export default {

	//https://legacy.miniflare.dev/testing/jest
	// Configuration is automatically loaded from `.env`, `package.json` and
	// `wrangler.toml` files by default, but you can pass any additional Miniflare
	// API options here:
	//testEnvironmentOptions: {
	//	bindings: { KEY: "value" },
	//	kvNamespaces: ["TEST_NAMESPACE"],
	//	scriptPath: "./dist/index.mjs",
	//	modules: true,
	//},

	// The test environment that will be used for testing
	// testEnvironment: "jest-environment-node",
	// TODO minflare envirenment NOT WORKING
	// not implemented on cloudflare side.........
	//testEnvironment: "miniflare",

	// The glob patterns Jest uses to detect test files
	testMatch: [
		"**/test/**/*.[jt]s?(x)",
		"**/?(*.)+(spec|test).[tj]s?(x)"
	],

	// A map from regular expressions to paths to transformers
	//transform: { },


  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // Automatically clear mock calls, instances, contexts and results before every test
  //clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  //collectCoverage: false,

  // The directory where Jest should output its coverage files
  //coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  //coverageProvider: "v8",

  // A path to a custom dependency extractor
  // dependencyExtractor: undefined,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: undefined,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],
};

