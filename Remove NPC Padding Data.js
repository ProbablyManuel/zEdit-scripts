let selected = zedit.GetSelectedRecords('NPC_');

let {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
    determinate: true,
    title: "Remove NPC Padding Data",
    message : "",
    canClose: true,
    current: 0,
    max: selected.length
});

for (let npc of selected) {
	if (xelib.HasElement(npc, 'TPLT - Template')) {
		if (xelib.GetFlag(npc, 'ACBS\\Template Flags', 'Use Spell List')) {
			xelib.RemoveElement(npc, 'Perks');
			xelib.RemoveElement(npc, 'PRKZ');
			xelib.RemoveElement(npc, 'Actor Effects');
			xelib.RemoveElement(npc, 'SPCT');
		}
	}
	addProgress(1);
}
