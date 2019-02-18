let armors = xelib.GetRecords(0, 'ARMO', false);
let {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
    determinate: true,
    title: 'Test ArmorKeywordAssignments',
    message : '',
    canClose: true,
    current: 0,
    max: armors.length
});

// let requiem = xelib.FileByName('Requiem.esp');
// let requiemIndex = xelib.Hex(xelib.GetFileLoadOrder(requiem), 2);

// let crush_none = `${requiemIndex}AD395C`;
// let crush_tier1 = `${requiemIndex}AD395A`;
// let crush_tier2 = `${requiemIndex}AD3959`;
// let crush_tier3 = `${requiemIndex}AD3958`;
// let crush_immune = `${requiemIndex}AD395B`;

// let pierce_none = `${requiemIndex}AD3960`;
// let pierce_tier1 = `${requiemIndex}AD395F`;
// let pierce_tier2 = `${requiemIndex}AD395E`;
// let pierce_tier3 = `${requiemIndex}AD395D`;
// let pierce_immune = `${requiemIndex}AD3961`;

// let ranged_none = `${requiemIndex}AD3953`;
// let ranged_tier1 = `${requiemIndex}AD3952`;
// let ranged_tier2 = `${requiemIndex}AD3951`;
// let ranged_tier3 = `${requiemIndex}AD3950`;
// let ranged_immune = `${requiemIndex}AD394F`;

// let slash_none = `${requiemIndex}AD3966`;
// let slash_tier1 = `${requiemIndex}AD3965`;
// let slash_tier2 = `${requiemIndex}AD3964`;
// let slash_tier3 = `${requiemIndex}AD3963`;
// let slash_immune = `${requiemIndex}AD3962`;

// let crushKeywords = [crush_none, crush_tier1, crush_tier2, crush_tier3, crush_immune]
// let pierceKeywords = [pierce_none, pierce_tier1, pierce_tier2, pierce_tier3, pierce_immune]
// let rangedKeywords = [ranged_none, ranged_tier1, ranged_tier2, ranged_tier3, ranged_immune]
// let slashKeywords = [slash_none, slash_tier1, slash_tier2, slash_tier3, slash_immune]

let crushKeywords = ['REQ_KW_Armor_Resistance_Crush_None', 'REQ_KW_Armor_Resistance_Crush_Tier1', 'REQ_KW_Armor_Resistance_Crush_Tier2', 'REQ_KW_Armor_Resistance_Crush_Tier3', 'REQ_KW_Armor_Resistance_Crush_Immune'];
let pierceKeywords = ['REQ_KW_Armor_Resistance_Pierce_None', 'REQ_KW_Armor_Resistance_Pierce_Tier1', 'REQ_KW_Armor_Resistance_Pierce_Tier2', 'REQ_KW_Armor_Resistance_Pierce_Tier3', 'REQ_KW_Armor_Resistance_Pierce_Immune'];
let rangedKeywords = ['REQ_KW_Armor_Resistance_Ranged_None', 'REQ_KW_Armor_Resistance_Ranged_Tier1', 'REQ_KW_Armor_Resistance_Ranged_Tier2', 'REQ_KW_Armor_Resistance_Ranged_Tier3', 'REQ_KW_Armor_Resistance_Ranged_Immune'];
let slashKeywords = ['REQ_KW_Armor_Resistance_Slash_None', 'REQ_KW_Armor_Resistance_Slash_Tier1', 'REQ_KW_Armor_Resistance_Slash_Tier2', 'REQ_KW_Armor_Resistance_Slash_Tier3', 'REQ_KW_Armor_Resistance_Slash_Immune'];

for (let armor of armors) {
	armor = xelib.GetWinningOverride(armor);
	if (!xelib.HasElement(armor, 'TNAM') && xelib.HasKeyword(armor, 'ArmorCuirass')) {
		let crushCount = getKeywordCount(armor, crushKeywords);
		if (crushCount !== 1) {
			logMessage(`${xelib.LongName(armor)} has ${crushCount} crush resistances`);
		}
		let pierceCount = getKeywordCount(armor, pierceKeywords);
		if (pierceCount !== 1) {
			logMessage(`${xelib.LongName(armor)} has ${pierceCount} pierce resistances`);
		}
		let rangedCount = getKeywordCount(armor, rangedKeywords);
		if (rangedCount !== 1) {
			logMessage(`${xelib.LongName(armor)} has ${rangedCount} ranged resistances`);
		}
		let slashCount = getKeywordCount(armor, slashKeywords);
		if (slashCount !== 1) {
			logMessage(`${xelib.LongName(armor)} has ${slashCount} slash resistances`);
		}
	}
	addProgress(1);
}


function getKeywordCount(armor, keywords) {
	let count = 0;
	for (let keyword of keywords)
	{
		if (xelib.HasKeyword(armor, keyword)) {
			count++;
		}
	}
	return count;
}