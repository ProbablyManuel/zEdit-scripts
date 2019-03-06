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
	let set = TTLib.GetTextBetween(xelib.EditorID(weapon), '_');
	let type = TTLib.GetWeaponType(weapon);
	let weightOffset = 0.0;
	let weightMult = 1.0;
	let damageOffset = 0;
	let damageMult = 1.0;
	let reach = 0.0;
	let speed = 0.0;
	let baseSet = "Steel";
	if (set === "Daedric") {
		damageOffset = 8;
		weightOffset = 8.0;
	}
	else if (set === "Dragonbone") {
		damageOffset = 6;
		weightOffset = 6.0;
	}
	else if (set === "Draugr") {
		damageOffset = 0;
		weightOffset = 1.0;
	}
	else if (set === "DraugrHoned") {
		damageOffset = 3;
		weightOffset = 4.0;
	}
	else if (set === "Dwarven") {
		damageOffset = 1;
		weightOffset = 1.0;
	}
	else if (set === "Ebony") {
		damageOffset = 5;
		weightOffset = 5.0;
	}
	else if (set === "Elven") {
		damageOffset = 2;
		weightOffset = -2.0;
	}
	else if (set === "Falmer") {
		damageOffset = -1;
		weightOffset = 0.0;
	}
	else if (set === "FalmerHoned") {
		damageOffset = 0;
		weightOffset = 0.0;
	}
	else if (set === "Forsworn") {
		damageOffset = -2;
		weightOffset = -2.0;
	}
	else if (set === "Glass") {
		damageOffset = 4;
		weightOffset = -3.0;
	}
	else if (set === "Imperial") {
		damageOffset = 0;
		weightOffset = 0.0;
	}
	else if (set === "Iron") {
		damageOffset = -1;
		weightOffset = -1.0;
	}
	else if (set === "NordHero") {
		damageOffset = 3;
		weightOffset = -1.0;
	}
	else if (set === "Orcish") {
		damageOffset = 3;
		weightOffset = 2.0;
	}
	else if (set === "Silver") {
		damageOffset = 0;
		weightOffset = 0.0;
	}
	else if (set === "SkyforgeSteel") {
		damageOffset = 3;
		weightOffset = 0.0;
	}
	else {
		baseSet = "";
		logMessage(`${xelib.Name(weapon)} has no known set`);
	}

	if (type === "Battleaxe") {
		reach = 1.3;
		speed = 0.7;
	}
	else if (type === "Bow") {

	}
	else if (type === "Dagger") {
		reach = 0.7;
		speed = 1.3;
	}
	else if (type === "Greatsword") {
		reach = 1.3;
		speed = 0.8;
	}
	else if (type === "Mace") {
		reach = 1.0;
		speed = 0.8;
	}
	else if (type === "Sword") {
		reach = 1.0;
		speed = 1.0;
	}
	else if (type === "WarAxe") {
		reach = 1.0;
		speed = 0.9;
	}
	else if (type === "Warhammer") {
		reach = 1.3;
		speed = 0.6;
	}
	else {
		logMessage(`${xelib.Name(weapon)} has no known weapon type`);
	}

	if (type === "Dagger") {
		weightOffset /= 2;
	}

	baseWeapon = Database.WeaponBySetAndType(baseSet, type);
	if (baseWeapon) {
		newVal = xelib.GetWeight(baseWeapon) * weightMult + weightOffset;
		if (Math.abs(newVal - xelib.GetWeight(weapon)) > 0.001) {
			xelib.SetWeight(weapon, newVal);
		}
		newVal = xelib.GetDamage(baseWeapon) * damageMult + damageOffset;
		newVal = Math.trunc(newVal);
		if (newVal !== xelib.GetDamage(weapon))  {
			xelib.SetDamage(weapon, newVal);
		}
		newVal = Math.trunc(newVal / 2);
		if (newVal !== TTLib.GetCriticalDamage(weapon)) {
			TTLib.SetCriticalDamage(weapon, newVal);
		}
		if (Math.abs(reach - TTLib.GetWeaponReach(weapon)) > 0.001) {
			TTLib.SetWeaponReach(weapon, reach);
		}
		if (Math.abs(speed - TTLib.GetWeaponSpeed(weapon)) > 0.001) {
			TTLib.SetWeaponSpeed(weapon, speed);
		}
	}
	else if (set !== "NULL") {
		logMessage(`${xelib.LongName(weapon)} doesn't have a base weapon`);
	}
	addProgress(1);
}
