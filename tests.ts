import glob from "glob";
import { run } from "node:test";
import chalk from "chalk";

interface TestDetailsParent {
  duration: number,
  error: Error,
}

interface BaseTest {
  details: unknown,
  testNumber: string,
  name:string
}

interface TestDetailsYAML {
  yaml: string
}

interface TestFail {
  details: TestDetailsParent | TestDetailsYAML,
  testNumber: string,
  name:string
}

let failCount = 0;

const stream = run({
	files: glob.sync("packages/*/__tests__/**/*.test.ts"),
});

stream.on("test:diagnostic", (e) => {
	if (e.includes("node:") || e.includes("node --trace-warnings")) {
		return;
	}
	console.log(e);
});

stream.on("test:pass", (e) => {
	// titleTest(e as never, "green");
});

function isParentTest(e: TestDetailsParent | TestDetailsYAML): boolean {
	if ((e as TestDetailsYAML)["yaml"]) {
		return false;
	}
	return true;
}

function titleTest(e: BaseTest, color: "green" | "red") {
	if (isParentTest(e.details as TestDetailsParent | TestDetailsYAML)) {
		console.log(chalk[color](`--- ${e.name} ---`));
	}else{
		console.log(chalk[color](`${e.name}`));
	}
}

stream.on("test:fail", (e: TestFail) => {
	titleTest(e,"red");
	failCount++;
	
	if (typeof (e.details as TestDetailsYAML).yaml === "string") {
		// const parsed = parse((e.details as TestDetailsYAML).yaml, {
		// 	strict: false
		// });
		console.log(e.details);
		return;
	}
});

process.once("beforeExit",() => {
	if (failCount > 0) {
		process.exit(1);
	}
});