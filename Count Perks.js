let npcs = xelib.GetRecords(0, 'NPC_', true);

let {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
    determinate: true,
    title: 'Count Perks',
    message : '',
    canClose: true,
    current: 0,
    max: npcs.length
});

for (let npc of npcs) {
	npc = xelib.GetWinningOverride(npc);
	let inheritsPerks = xelib.HasElement(npc, 'TPLT - Template') && xelib.GetFlag(npc, 'ACBS\\Template Flags', 'Use Spell List');
	if (!inheritsPerks) {
		let perkCount = xelib.GetIntValue(npc, 'PRKZ');
		if (perkCount > 0) {
			logMessage(`${perkCount};  ${xelib.LongName(npc)}`);
		}
	}
	addProgress(1);
}
