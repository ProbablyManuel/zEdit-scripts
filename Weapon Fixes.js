const scriptPath = `${xelib.GetGlobal("ProgramPath")}\\scripts\\`;
const Database = require(`${scriptPath}Database.js`);
const TTLib = require(`${scriptPath}TT Library.js`);

let selected = zedit.GetSelectedRecords("WEAP");

let {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
    determinate: true,
    title: "Weapon Fixes",
    message : "",
    canClose: true,
    current: 0,
    max: selected.length
});

for (let weapon of selected) {
	let editorID = xelib.EditorID(weapon);
	let set = TTLib.GetSetFromEditorID(editorID);
	let type = TTLib.GetWeaponTypeFromEditorID(editorID);
	let goldOffset = 0;
	let goldMult = 1.0;
	let weightOffset = 0.0;
	let weightMult = 1.0;
	let damageOffset = 0;
	let damageMult = 1.0;
	let speedOffset = 0.0;
	let reachOffset = 0.0;
	let alreadyReqtified = false;
	let baseSet = "Steel";
	let baseType = "";

	if (set === "Blades") {
		damageOffset = 3;
		weightOffset = 0.0;
		goldMult = 7.0;
	}
	else if (set === "Daedric") {
		damageOffset = 7;
		weightOffset = 7.0;
		goldMult = 100;
	}
	else if (set === "Dawnguard") {
		damageOffset = 2;
		weightOffset = 1.0;
		goldMult = 6.0;
	}
	else if (set === "Dragonbone") {
		damageOffset = 6;
		weightOffset = 6.0;
		goldMult = 80;
	}
	else if (set === "Draugr") {
		damageOffset = 0;
		weightOffset = 1.0;
		goldMult = 1 / 3;
	}
	else if (set === "DraugrHoned") {
		damageOffset = 3;
		weightOffset = 1.0;
		goldMult = 2 / 3;
	}
	else if (set === "Dwarven") {
		damageOffset = 1;
		weightOffset = 1.0;
		goldMult = 3.0;
	}
	else if (set === "Ebony") {
		damageOffset = 5;
		weightOffset = 5.0;
		goldMult = 40.0;
	}
	else if (set === "Elven") {
		damageOffset = 2;
		weightOffset = -2.0;
		goldMult = 4.0;
	}
	else if (set === "Falmer") {
		damageOffset = -1;
		weightOffset = 0.0;
		goldMult = 0.25;
	}
	else if (set === "FalmerHoned") {
		damageOffset = 2;
		weightOffset = 0.0;
		goldMult = 0.5;
	}
	else if (set === "Forsworn") {
		damageOffset = -2;
		weightOffset = -2.0;
		goldMult = 0.2;
	}
	else if (set === "Glass") {
		damageOffset = 4;
		weightOffset = -3.0;
		goldMult = 25.0;
	}
	else if (set === "Imperial") {
		damageOffset = 0;
		weightOffset = 0.0;
		goldMult = 4 / 3;
	}
	else if (set === "Iron") {
		damageOffset = -1;
		weightOffset = -1.0;
		goldMult = 0.55;
	}
	else if (set === "NordHero") {
		damageOffset = 3;
		weightOffset = -1.0;
		goldMult = 6.0;
	}
	else if (set === "Orcish") {
		damageOffset = 3;
		weightOffset = 2.0;
		goldMult = 5.0;
	}
	else if (set === "Silver") {
		damageOffset = 0;
		weightOffset = 0.0;
		goldMult = 2.0;
	}
	else if (set === "Steel") {
		damageOffset = 0;
		weightOffset = 0.0;
		goldMult = 1.0;
	}
	else if (set === "SkyforgeSteel") {
		damageOffset = 3;
		weightOffset = 0.0;
		goldMult = 7.0;
	}
	else {
		baseSet = "";
	}

	if (type === "Club") {
		baseType = "Mace";
		damageOffset -= 1.0;
		weightOffset -= 1.0;
		speedOffset += 0.05;
	}
	else if (type === "Dagger") {
		baseType = "Dagger";
		weightOffset /= 2;
	}
	else if (type === "Greatsword") {
		baseType = "Greatsword";
		speedOffset += 0.05;
	}
	else if (type === "Katana") {
		baseType = "Sword";
		weightOffset -= 1.5;
	}
	else if (type === "Longsword") {
		baseType = "Sword";
		damageOffset += 1;
		weightOffset += 1.0;
		speedOffset -= 0.05;
		reachOffset += 0.1;
	}
	else if (type === "Saber") {
		baseType = "Sword";
		damageOffset -= 1.0;
		weightOffset -= 1.0;
		speedOffset += 0.1;
	}
	else if (type === "Scimitar") {
		baseType = "Sword";
		damageOffset -= 0.5;
		weightOffset -= 0.5;
		speedOffset += 0.05;
		alreadyReqtified = true;
	}
	else if (type === "Shortsword") {
		baseType = "Sword";
		damageOffset -= 1;
		weightOffset -= 1.0;
		speedOffset += 0.15;
		reachOffset -= 0.1;
	}
	else if (type === "Tanto") {
		baseType = "Dagger";
		damageOffset += 1;
		weightOffset += 2.5;
		speedOffset -= 0.1;
		reachOffset += 0.1;
	}
	else {
		baseType = type;
	}

	let baseWeapon = Database.WeaponBySetAndType(baseSet, baseType);
	if (baseWeapon) {
		// Gold
		newVal = xelib.GetGoldValue(baseWeapon) * goldMult + goldOffset;
		newVal = Math.round(newVal / 5) * 5;
		if (newVal !== xelib.GetGoldValue(weapon)) {
			xelib.SetGoldValue(weapon, newVal);
		}
		// Weight
		newVal = xelib.GetWeight(baseWeapon) * weightMult + weightOffset;
		if (Math.abs(newVal - xelib.GetWeight(weapon)) > 0.001) {
			xelib.SetWeight(weapon, newVal);
		}
		// Damage
		newVal = xelib.GetDamage(baseWeapon) * damageMult + damageOffset;
		if (alreadyReqtified) {
			newVal *= 6;
		}
		newVal = Math.trunc(newVal);
		if (newVal !== xelib.GetDamage(weapon))  {
			xelib.SetDamage(weapon, newVal);
		}
		// Speed
		newVal = TTLib.GetWeaponSpeed(baseWeapon) + speedOffset;
		if (Math.abs(newVal - TTLib.GetWeaponSpeed(weapon)) > 0.001) {
			TTLib.SetWeaponSpeed(weapon, newVal);
		}
		// Reach
		newVal = TTLib.GetWeaponReach(baseWeapon) + reachOffset;
		if (alreadyReqtified) {
			newVal *= 0.7;
		}
		if (Math.abs(newVal - TTLib.GetWeaponReach(weapon)) > 0.001) {
			TTLib.SetWeaponReach(weapon, newVal);
		}
		// REQ_KW_AlreadyReqtified
		if (alreadyReqtified) {
			if (!xelib.HasKeyword(weapon, "REQ_KW_AlreadyReqtified")) {
				xelib.AddKeyword(weapon, "REQ_KW_AlreadyReqtified");
			}
		}
	}
	else if (set !== "NULL") {
		logMessage(`${xelib.LongName(weapon)} doesn't have a base weapon`);
	}
	addProgress(1);
}
