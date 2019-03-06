const scriptPath = `${xelib.GetGlobal("ProgramPath")}\\scripts\\`;
const Database = require(`${scriptPath}Database.js`);
const TTLib = require(`${scriptPath}TT Library.js`);

let selected = zedit.GetSelectedRecords("ARMO");

let {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
    determinate: true,
    title: "Black Mage Armor",
    message : "",
    canClose: true,
    current: 0,
    max: selected.length
});

for (let armor of selected) {
	let armorType = xelib.GetArmorType(armor)
	if (armorType === "Heavy Armor" || armorType === "Light Armor") {
		let set = TTLib.GetTextBetween(xelib.EditorID(armor), '_');
		let part = TTLib.GetArmorPart(armor);
		let goldOffset = 0;
		let goldMult = 1.0;
		let weightOffset = 0;
		let weightMult = 1.0;
		let armorOffset = 0;
		let armorMult = 1.0;
		let baseSet = set;
		if (set === "BlackMageLight") {
			baseSet = "Scaled";
			goldMult *= 1.2;
			weightMult *= 0.9;
		}
		else if (set === "BlackMageHeavy") {
			baseSet = "SteelPlate";
			goldMult *= 1.2;
			weightMult *= 0.9;
		}
		else if (set === "BlackArchMageLight") {
			baseSet = "Glass";
			goldMult *= 1.75;
			weightMult *= 0.8;
			armorMult *= 1.15;
		}
		else if (set === "BlackArchMageHeavy") {
			baseSet = "Ebony";
			goldMult *= 1.75;
			weightMult *= 0.8;
			armorMult *= 1.15;
		}
		baseArmor = Database.ArmorBySetAndPart(baseSet, part);
		if (baseArmor) {
			baseArmor = xelib.GetWinningOverride(baseArmor);
			let newVal = xelib.GetGoldValue(baseArmor) * goldMult + goldOffset;
			newVal = Math.round(newVal / 5) * 5
			if (newVal !== xelib.GetGoldValue(armor)) {
				xelib.SetGoldValue(armor, newVal);
			}
			newVal = xelib.GetWeight(baseArmor) * weightMult + weightOffset;
			if (Math.abs(newVal - xelib.GetWeight(armor)) > 0.001) {
				xelib.SetWeight(armor, newVal);
			}
			newVal = xelib.GetArmorRating(baseArmor) * armorMult + armorOffset;
			if (Math.abs(newVal - xelib.GetArmorRating(armor)) > 0.001)  {
				xelib.SetArmorRating(armor, newVal);
			}
		}
		else if (set !== "NULL") {
			logMessage(`${xelib.LongName(armor)} doesn't have a base armor`);
		}
	}
	addProgress(1);
}
