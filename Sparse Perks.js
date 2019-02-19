let npcs = xelib.GetRecords(0, 'NPC_', false);

let {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
    determinate: true,
    title: 'Sparse Perks',
    message : '',
    canClose: true,
    current: 0,
    max: npcs.length
});

let skyrim = xelib.FileByName("Skyrim.esm");
let requiem = xelib.FileByName("Requiem.esp");

let skyrimIndex = xelib.Hex(xelib.GetFileLoadOrder(skyrim), 2);
let requiemIndex = xelib.Hex(xelib.GetFileLoadOrder(requiem), 2);

// If a perk in a stack is found, all subsequent perks are added to the npc
let perkStack = [
 [`${skyrimIndex}106257`, `${skyrimIndex}106256`],  // Flurry
 [`${skyrimIndex}079343`, `${skyrimIndex}0BABE4`],  // Weapon Mastery
 [`${skyrimIndex}079346`, `${skyrimIndex}0BABE8`],  // Great Weapon Mastery
 [`${skyrimIndex}0C1E95`, `${skyrimIndex}0C1E94`, `${skyrimIndex}03AF83`],  // Greatsword Focus
 [`${skyrimIndex}0C5C07`, `${skyrimIndex}0C5C06`, `${skyrimIndex}0C5C05`],  // Battleaxe Focus
 [`${skyrimIndex}0C1E97`, `${skyrimIndex}0C1E96`, `${skyrimIndex}03AF84`],  // Warhammer Focus
 [`${skyrimIndex}0C1E91`, `${skyrimIndex}0C1E90`, `${skyrimIndex}05F56F`],  // Sword Focus
 [`${skyrimIndex}0C3679`, `${skyrimIndex}0C3678`, `${skyrimIndex}03FFFA`],  // War Axe Focus
 [`${skyrimIndex}0C1E93`, `${skyrimIndex}0C1E92`, `${skyrimIndex}05F592`],  // Mace Focus
 [`${requiemIndex}AD3998`, `${requiemIndex}AD3999`, `${requiemIndex}AD399A`]  // Dagger Focus
];

let fileName = "RRO-449.esp";

let sparsePerkPlugin = xelib.FileByName(fileName);
if (sparsePerkPlugin) {
	xelib.NukeFile(sparsePerkPlugin);
}
else {
	sparsePerkPlugin = xelib.AddFile(fileName);
}

for (let npc of npcs) {
	npc = xelib.GetWinningOverride(npc);
	let inheritsPerks = xelib.HasElement(npc, 'TPLT - Template') && xelib.GetFlag(npc, 'ACBS\\Template Flags', 'Use Spell List');
	if (!inheritsPerks) {
		for (let stack of perkStack) {
			let perkFound = false;  // Did we find one of the perks in the stack?
			let copiedToPlugin = false;  // Did we copy the npc to the plugin?
			for (let perk of stack) {
				if (perkFound) {
					if (!xelib.HasPerk(npc, perk)) {
						if (!copiedToPlugin) {
							xelib.AddRequiredMasters(npc, sparsePerkPlugin, false);
							npc = xelib.CopyElement(npc, sparsePerkPlugin, false);
							copiedToPlugin = true;
						}
						xelib.AddPerk(npc, perk, '1');
					}
				}
				else if (xelib.HasPerk(npc, perk)) {
					perkFound = true;
				}
			}
		}
	}
	addProgress(1);
}
