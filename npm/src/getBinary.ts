import { Binary } from ".";
import {join} from 'path'
import * as os from "os";

function getPlatform() {
  const type = os.type();
  const arch = os.arch();

  if (type === "Linux" && arch === "x64") return "Linux";
  if (type === "Darwin" && arch === "x64") return "Darwin";

  throw new Error(`Unsupported platform: ${type} ${arch}`);
}

export function getBinary(name: string = "near-sandbox"): Promise<Binary> {
  const NEAR_SANDBOX_BIN_PATH =
    process.env["NEAR_SANDBOX_BIN_PATH"] ?? join(os.homedir(), ".near", "sandbox");
  const PATH = process.env["PATH"];
  process.env["PATH"] = `${NEAR_SANDBOX_BIN_PATH}:${PATH}`;
  const platform = getPlatform();
  // const version = require("./package.json").version;
  const baseUrl =
    process.env["SANDBOX_ARTIFACT_URL"] ??
    "https://ipfs.io/ipfs/QmZ6MQ9VMxBcahcmJZdfvUAbyQpjnbHa9ixbqnMTq2k8FG";
  const url = `${baseUrl}/${platform}-${name}.tar.gz`;
  return Binary.create(name, url);
}
