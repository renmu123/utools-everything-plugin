const path = require("path");
const Everything = require("everything-node");

const everything = new Everything(false);
everything.setExecPath(path.join(__dirname, "bin", "es.exe"));
window.everything = everything;

// window.getFiles = getFiles;
// window.
