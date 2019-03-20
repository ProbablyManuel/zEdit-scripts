const scriptPath = `${xelib.GetGlobal("ProgramPath")}\\scripts\\`;
const Database = require(`${scriptPath}Database.js`);
const TTLib = require(`${scriptPath}TT Library.js`);

let selected = zedit.GetSelectedRecords("WEAP");

let {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
    determinate: true,
    title: "Reqiem Weapon Patcher",
    message : "",
    canClose: true,
    current: 0,
    max: selected.length
});

for (let weapon of selected) {
	// Exclude staffs
	if (true) {
		let editorID = xelib.EditorID(weapon)
		let set = TTLib.GetSetFromEditorID(editorID);
		let type = TTLib.GetWeaponTypeFromEditorID(editorID);
		let goldOffset = 0;
		let goldMult = 1.0;
		let weightOffset = 0.0;
		let weightMult = 1.0;
		let damageOffset = 0;
		let damageMult = 1.0;
		let speedOffset = 0.0;
		let speedMult = 1.0;
		let reachOffset = 0.0;
		let reachMult = 1.0;
		let baseSet = "";

		if (set === "Blooded") {
			baseSet = "Steel";
			damageOffset = 4;
			weightOffset = 1.0;
			goldMult = 7.0;
			if (editorID.endsWith("The")) {
				goldMult = 0.0;
				goldOffset = 1630;
			}
		}
		else if (set === "Housecarl") {
			baseSet = "Steel";
			damageOffset = 3;
			weightOffset = 3.0;
			goldMult = 9.0;
		}
		else if (set === "Duskward") {
			baseSet = "Glass";
			weightOffset = 5.0;
			goldMult *= 0.5;
		}

		if (type === "Dagger") {
			weightOffset /= 2;
		}

		baseWeapon = Database.WeaponBySetAndType(baseSet, type);
		if (baseWeapon) {
			baseWeapon= xelib.GetWinningOverride(baseWeapon);
			newVal = xelib.GetGoldValue(baseWeapon) * goldMult + goldOffset;
			newVal = Math.round(newVal / 5) * 5;
			if (newVal !== xelib.GetGoldValue(weapon)) {
				xelib.SetGoldValue(weapon, newVal);
			}
			newVal = xelib.GetWeight(baseWeapon) * weightMult + weightOffset;
			if (Math.abs(newVal - xelib.GetWeight(weapon)) > 0.001) {
				xelib.SetWeight(weapon, newVal);
			}
			newVal = xelib.GetDamage(baseWeapon) * damageMult + damageOffset;
			newVal = Math.trunc(newVal);
			if (newVal !== xelib.GetDamage(weapon))  {
				xelib.SetDamage(weapon, newVal);
			}
		}
		else if (set !== "NULL") {
			logMessage(`${xelib.LongName(weapon)} doesn't have a base weapon. Base set is ${baseWeapon} and type is ${type}`);
		}
		addProgress(1);
	}
}
