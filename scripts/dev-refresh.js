#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const exampleDir = path.join(rootDir, "example");

function run(cmd, cwd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

try {
  run("npm run build", rootDir);
} catch (err) {
  console.error("Falha ao rodar build.");
  process.exit(1);
}

// Tenta pedir reload ao Metro se ele estiver rodando.
try {
  run("curl -s -X POST http://localhost:8081/reload", exampleDir);
} catch (err) {
  console.warn(
    "Não foi possível pedir reload ao Metro. Inicie o Metro em `example/` e tente novamente."
  );
}
