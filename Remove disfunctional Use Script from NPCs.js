const scriptPath = `${xelib.GetGlobal("ProgramPath")}\\scripts\\`;
const Database = require(`${scriptPath}Database.js`);
const TTLib = require(`${scriptPath}TT Library.js`);

const npcs = zedit.GetSelectedRecords('NPC_');

const {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
	determinate: true,
	title: "Remove disfunctional Use Script from NPCs",
	message : "",
	canClose: true,
	current: 0,
	max: npcs.length
});

for (let npc of npcs) {
	npc = xelib.GetWinningOverride(npc);
	if (xelib.GetFlag(npc, "ACBS\\Template Flags", "Use Script")) {
		const template = xelib.GetLinksTo(npc, "TPLT - Template");
		if (xelib.Signature(template) === "LVLN") {
			xelib.SetFlag(npc, "ACBS\\Template Flags", "Use Script", false);
		}
	}
	addProgress(1);
}
