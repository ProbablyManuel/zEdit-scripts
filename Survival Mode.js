let update = xelib.FileByName('Update.esm');
let frostfall = xelib.FileByName('Frostfall.esp')

let FrostfallWarmthPoor = '01CC0E0F';
let FrostfallWarmthFair = '01CC0E11';
let FrostfallWarmthGood = '01CC0E12';
let FrostfallWarmthExecellent = '01CC0E13';
let FrostfallWarmthMax = '01CC0E14';
let FrostfallExtraHeadCloth = '01CC0E21';
let FrostfallExtraHeadWarm = '01CC0E24';
let Survival_ArmorCold = '01002ED8';
let Survival_ArmorWarm = '01002ED9';
let Survival_BodyAndHead = '01002ED8';


let selected = zedit.GetSelectedRecords('ARMO');
for (let rec of selected) {
	if (xelib.HasKeyword(rec, FrostfallWarmthPoor)) {
		if (!xelib.HasKeyword(rec, Survival_ArmorCold)) {
			xelib.AddKeyword(rec, Survival_ArmorCold);
		}
	}
	else if (xelib.HasKeyword(rec, FrostfallWarmthFair)) {
		// Survival Mode has no keyword for fair warmth
	}
	else if (xelib.HasKeyword(rec, FrostfallWarmthGood)) {
		if (!xelib.HasKeyword(rec, Survival_ArmorWarm)) {
			xelib.AddKeyword(rec, Survival_ArmorWarm);
		}
	}
	else if (xelib.HasKeyword(rec, FrostfallWarmthExecellent)) {
		if (!xelib.HasKeyword(rec, Survival_ArmorWarm)) {
			xelib.AddKeyword(rec, Survival_ArmorWarm);
		}
	}
	else if (xelib.HasKeyword(rec, FrostfallWarmthMax)) {
		if (!xelib.HasKeyword(rec, Survival_ArmorWarm)) {
			xelib.AddKeyword(rec, Survival_ArmorWarm);
		}
	}
	if (xelib.HasKeyword(rec, FrostfallExtraHeadWarm) || xelib.HasKeyword(rec, FrostfallExtraHeadCloth)) {
		if (!xelib.HasKeyword(rec, Survival_BodyAndHead)) {
			xelib.AddKeyword(rec, Survival_BodyAndHead);
		}
	}
}
