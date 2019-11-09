const scriptPath = `${xelib.GetGlobal("ProgramPath")}\\scripts\\`;
const Database = require(`${scriptPath}Database.js`);
const TTLib = require(`${scriptPath}TT Library.js`);

const selected = zedit.GetSelectedRecords("ARMO");

const {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
    determinate: true,
    title: "Requiem Armor Patcher",
    message : "",
    canClose: true,
    current: 0,
    max: selected.length
});

const bodyRatio = 0.65;
const feetRatio = 0.1;
const handRatio = 0.1;
const headRatio = 0.15;
const shieldRatio = 0.25;

for (let armor of selected) {
	const isClothing = xelib.GetArmorType(armor) === "Clothing";
	if (!isClothing) {
		const editorID = xelib.EditorID(armor);
		const regex = /[^_]+(?:_(?:Ench|NonPlayable|Variant))?_([^_]+)_([^_]+)(?:_(.+))?/
		const match = editorID.match(regex);
		if (match) {
			const set = match[1];
			const part = match[2];
			const suffix = match[3];
			let armorRating = 0.0;
			let armorRatingOffset = 0.0;
			let weight = 0.0;
			let weightOffset = 0.0;
			let gold = 0;
			let goldOffset = 0;
	
			let baseSet = "";
			if (set === "AncientNord") {
				baseSet = "Iron";
			}
			else if (set === "Apotheus") {
				baseSet = "Leather";
				armorRating += 100;
				gold += 500;
			}
			else if (set === "BlackMageLight") {
				baseSet = "Scaled";
				weight -= 1.0;
				gold += 100;
			}
			else if (set === "BlackMageHeavy") {
				baseSet = "SteelPlate";
				gold += 200;
				weight -= 5.0;
			}
			else if (set === "BlackArchMageLight") {
				baseSet = "Glass";
				armorRating += 50.0;
				weightMult -= 3.0;
				gold += 4000;
			}
			else if (set === "BlackArchMageHeavy") {
				baseSet = "Ebony";
				armorRating += 50.0;
				weight -= 10.0;
				gold += 7500;
			}
			else if (set === "BretonKnight") {
				baseSet = "Elven";
			}
			else if (set === "Blooded") {
				baseSet = "SteelPlate";
				armorRating += 100.0;
				gold += 500;
			}
			else if (set === "CombinedSteel") {
				baseSet = "SteelPlate";
			}
			else if (set === "Ciri") {
				baseSet = "Scaled";
			}
			else if (set === "DarkBrotherhood") {
				baseSet = "Leather";
			}
			else if (set === "DarkBrotherhoodAncient") {
				baseSet = "Leather";
				armorRating += 50.0;
			}
			else if (set === "Duskward") {
				baseSet = "GuardLight";
				armorRating += 100.0;
				goldOffset += 500;
			}
			else if (set === "ESONord") {
				baseSet = "Steel";
			}
			else if (set === "Forsworn") {
				baseSet = "Fur";
			}
			else if (set === "Hermit") {
				baseSet = "Leather";
			}
			else if (set === "Housecarl") {
				baseSet = "SteelPlate";
				gold += 500;
			}
			else if (set === "ImperialHeavy") {
				baseSet = "Steel";
			}
			else if (set === "ImperialLight") {
				baseSet = "Leather";
				if (suffix === "Studded") {
					armorRatingOffset += 25.0;
				}
			}
			else if (set === "Intrigue") {
				baseSet = "Leather";
			}
			else if (set === "Linwe") {
				baseSet = "Leather";
			}
			else if (set === "Nightingale") {
				baseSet = "Leather";
			}
			else if (set === "NordBattlemage") {
				baseSet = "SteelPlate";
			}
			else if (set === "NordMage") {
				baseSet = "Scaled";
			}
			else if (set === "RoyalVampire") {
				baseSet = "Scaled";
			}
			else if (set === "Shani") {
				baseSet = "Leather";
			}
			else if (set === "SnowElf") {
				baseSet = "Glass";
			}
			else if (set === "StormcloakOfficier") {
				baseSet = "Steel";
			}
			else if (set === "Thief") {
				baseSet = "Leather";
			}
			else if (set === "ThievesGuild") {
				baseSet = "Leather";
			}
			else if (set === "ThievesGuildMaster") {
				baseSet = "Leather";
				armorRating += 50.0;
			}
			else if (set === "Triss") {
				baseSet = "Elven";
			}
			else if (set === "Vampire") {
				baseSet = "Leather";
			}
			else if (set === "Wayfarer") {
				baseSet = "Leather";
			}
			else if (set === "Wolf") {
				baseSet = "SteelPlate";
				weight -= 5.0;
			}
			else if (set === "Yennefer") {
				baseSet = "ChitinLight";
			}
			else {
				baseSet = set;
			}

			if (baseSet === "Blades") {
				armorRating += 550.0;
				weight += 55.0;
				gold += 1000;
			}
			else if (baseSet === "ChitinHeavy") {
				armorRating += 500.0;
				weight += 35.0;
				gold += 1000;
			}
			else if (baseSet === "ChitinLight") {
				armorRating += 300.0;
				weight += 15.0;
				gold += 700;
			}
			else if (baseSet === "Daedric") {
				armorRating += 800.0;
				weight += 80.0;
				gold += 25000;
			}
			else if (baseSet === "DawnguardHeavy") {
				armorRating += 600.0;
				weight += 60.0;
				gold += 800;
			}
			else if (baseSet === "DawnguardLight") {
				armorRating += 300.0;
				weight += 15.0;
				gold += 400;
			}
			else if (baseSet === "DragonPlate") {
				armorRating += 750.0;
				weight += 65.0;
				gold += 20000;
			}
			else if (baseSet === "Dragonscale") {
				armorRating += 400.0;
				weight += 20.0;
				gold += 20000;
			}
			else if (baseSet === "Dwarven") {
				armorRating += 650.0;
				weight += 70.0;
				gold += 1500;
			}
			else if (baseSet === "Ebony") {
				armorRating += 750.0;
				weight += 75.0;
				gold += 10000;
			}
			else if (baseSet === "Elven") {
				armorRating += 300.0;
				weight += 15.0;
				gold += 650;
			}
			else if (baseSet === "Fur") {
				armorRating += 210.0;
				weight += 10.0;
				gold += 100;
			}
			else if (baseSet === "Glass") {
				armorRating += 400.0;
				weight += 15.0;
				gold += 6000;
			}
			else if (baseSet === "GuardLight") {
				armorRating += 300.0;
				weight += 20.0;
				gold += 200;
			}
			else if (baseSet === "Hide") {
				armorRating += 190.0;
				weight += 8.0;
				gold += 80;
				if (suffix === "Studded") {
					armorRatingOffset += 35.0;
					weightOffset += 3.0;
					goldOffset += 25;
				}
			}
			else if (baseSet === "Iron") {
				armorRating += 425.0;
				weight += 40.0;
				gold += 250;
				if (suffix === "Banded") {
					armorRatingOffset += 25.0;
					weightOffset += 2.5;
					goldOffset += 75;
				}
			}
			else if (baseSet === "Leather") {
				armorRating += 250.0;
				weight += 12.0;
				gold += 200;
			}
			else if (baseSet === "Nordic") {
				armorRating += 600.0;
				weight += 60.0;
				gold += 1000;
			}
			else if (baseSet === "Orcish") {
				armorRating += 600.0;
				weight += 60.0;
				gold += 1500;
			}
			else if (baseSet === "PenitusOculatus") {
				armorRating += 300.0;
				weight += 12.0;
				gold += 800;
			}
			else if (baseSet === "Scaled") {
				armorRating += 300.0;
				weight += 15.0;
				gold += 400;
			}
			else if (baseSet === "Steel") {
				armorRating += 500.0;
				weight += 50.0;
				gold += 500;
			}
			else if (baseSet === "SteelPlate") {
				armorRating += 600.0;
				weight += 60.0;
				gold += 1000;
			}
			else if (baseSet !== "NULL") {
				logMessage(`${xelib.LongName(armor)} doesn't have a base set`);
			}
	
			let newVal = GetGoldForBodyPart(gold, part) + goldOffset;
			if (newVal !== xelib.GetGoldValue(armor)) {
				xelib.SetGoldValue(armor, newVal);
			}
			newVal = GetWeightForBodyPart(weight, part) + weightOffset;
			if (Math.abs(newVal - xelib.GetWeight(armor)) > 0.001) {
				xelib.SetWeight(armor, newVal);
			}
			newVal = GetArmorRatingForBodyPart(armorRating, part) + armorRatingOffset;
			newVal = GetFinalArmorRating(newVal, armor);
			if (Math.abs(newVal - xelib.GetArmorRating(armor)) > 0.001)  {
				xelib.SetArmorRating(armor, newVal);
			}
		}
		else {
			logMessage(`${xelib.LongName(armor)} doesn't have a matching EditorID`);
		}
	}
	addProgress(1);
}


function GetArmorRatingForBodyPart(armorRating, part) {
	part = part.toLowerCase();
	headArmorRating = Math.round(armorRating * headRatio);
	if (part === "head") {
		return headArmorRating;
	}
	feetArmorRating = Math.round(armorRating * feetRatio);
	if (part === "feet") {
		return feetArmorRating;
	}
	handArmorRating = Math.round(armorRating * handRatio);
	if (part === "hand") {
		return handArmorRating;
	}
	bodyArmorRating = armorRating - headArmorRating - feetArmorRating - handArmorRating;
	if (part === "body") {
		return bodyArmorRating;
	}
	if (part === "shield") {
		shieldArmorRating = Math.round(armorRating * shieldRatio);
		return shieldArmorRating;
	}
	return -1;
}

function GetGoldForBodyPart(gold, part) {
	part = part.toLowerCase();
	headGold = Math.round(gold * headRatio);
	if (part === "head") {
		return headGold;
	}
	feetGold = Math.round(gold * feetRatio);
	if (part === "feet") {
		return feetGold;
	}
	handGold = Math.round(gold * handRatio);
	if (part === "hand") {
		return handGold;
	}
	bodyGold = gold - headGold - feetGold - handGold;
	if (part === "body") {
		return bodyGold;
	}
	if (part === "shield") {
		shieldGold = Math.round(gold * shieldRatio);
		return shieldGold;
	}
	return -1;
}

function GetWeightForBodyPart(weight, part) {
	part = part.toLowerCase();
	headWeight = Math.round(weight * headRatio * 2) / 2;
	if (part === "head") {
		return headWeight;
	}
	feetWeight = Math.round(weight * feetRatio * 2) / 2;
	if (part === "feet") {
		return feetWeight;
	}
	handWeight = Math.round(weight * handRatio * 2) / 2;
	if (part === "hand") {
		return handWeight;
	}
	bodyWeight = weight - headWeight - feetWeight - handWeight;
	if (part === "body") {
		return bodyWeight;
	}
	if (part === "shield") {
		shieldWeight = Math.round(weight * shieldRatio * 2) / 2;
		return shieldWeight;
	}
	return -1.0;
}

function GetFinalArmorRating(armorRating, armor) {
	finalArmorRating = armorRating;
	if (xelib.HasKeyword(armor, "ArmorCuirass")) {
		finalArmorRating -= 55;
	}
	else {
		finalArmorRating -= 15;
	}
	armorType = xelib.GetArmorType(armor);
	if (armorType === "Heavy Armor") {
		finalArmorRating /= 5.5;
	}
	else if (armorType === "Light Armor") {
		finalArmorRating /= 2.75;
	}
	else {
		finalArmorRating = -1.0;
	}
	finalArmorRating = Math.ceil(finalArmorRating * 100) / 100;
	return finalArmorRating;
}