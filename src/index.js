// 1. Export the full Studio Wizard (Named Export for Tree-shaking)
export { default as QraftStudio } from "./App";

// 2. Export the standalone Widget (Named Export for Tree-shaking)
export { default as QraftWidget } from "./components/QRLabel";

// 3. Export pure logic utilities for developers building custom UIs/backends
export { buildUPIString, encodeShareParams } from "./utils/upi";

// 4. Export DOM/Export utilities (These will be guarded for SSR internally)
export {
  downloadPNG,
  downloadJPG,
  printLabel,
  captureLabel,
} from "./utils/export";
