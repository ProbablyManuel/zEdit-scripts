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

let bluntKeywords = ['REQ_KW_Armor_Resistance_Blunt_None',
                     'REQ_KW_Armor_Resistance_Blunt_Tier1',
                     'REQ_KW_Armor_Resistance_Blunt_Tier2',
                     'REQ_KW_Armor_Resistance_Blunt_Tier3',
                     'REQ_KW_Armor_Resistance_Blunt_Tier4',
                     'REQ_KW_Armor_Resistance_Blunt_Tier5'];
let pierceKeywords = ['REQ_KW_Armor_Resistance_Pierce_None',
                      'REQ_KW_Armor_Resistance_Pierce_Tier1',
                      'REQ_KW_Armor_Resistance_Pierce_Tier2',
                      'REQ_KW_Armor_Resistance_Pierce_Tier3',
                      'REQ_KW_Armor_Resistance_Pierce_Tier4',
                      'REQ_KW_Armor_Resistance_Pierce_Tier5'];
let rangedKeywords = ['REQ_KW_Armor_Resistance_Ranged_None',
                      'REQ_KW_Armor_Resistance_Ranged_Tier1',
                      'REQ_KW_Armor_Resistance_Ranged_Tier2',
                      'REQ_KW_Armor_Resistance_Ranged_Tier3',
                      'REQ_KW_Armor_Resistance_Ranged_Tier4',
                      'REQ_KW_Armor_Resistance_Ranged_Tier5'];
let slashKeywords = ['REQ_KW_Armor_Resistance_Slash_None',
                     'REQ_KW_Armor_Resistance_Slash_Tier1',
                     'REQ_KW_Armor_Resistance_Slash_Tier2',
                     'REQ_KW_Armor_Resistance_Slash_Tier3',
                     'REQ_KW_Armor_Resistance_Slash_Tier4',
                     'REQ_KW_Armor_Resistance_Slash_Tier5'];

for (let armor of armors) {
	armor = xelib.GetWinningOverride(armor);
	if (!xelib.HasElement(armor, 'TNAM') && xelib.HasKeyword(armor, 'ArmorCuirass')) {
		let bluntCount = getKeywordCount(armor, bluntKeywords);
		if (bluntCount !== 1) {
			logMessage(`${xelib.LongName(armor)} has ${bluntCount} blunt resistances`);
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