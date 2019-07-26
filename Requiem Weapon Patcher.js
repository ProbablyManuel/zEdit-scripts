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
	IsBow = xelib.GetValue(weapon, "DNAM\\Animation Type") === "Bow";
	IsCrossbow = xelib.GetValue(weapon, "DNAM\\Animation Type") === "Crossbow";
	IsStaff = xelib.GetValue(weapon, "DNAM\\Animation Type") === "Staff";
	if (!IsBow && !IsCrossbow && !IsStaff) {
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
		let reachOffset = 0.0;
		let baseSet = "Steel";
		let baseType = "";
		let alreadyReqtified = false;

		prefixes = ["Ench", "NonPlayable", "Unique"];
		for (let prefix of prefixes) {
			if (set !== prefix && set.startsWith(prefix)) {
				set = set.slice(prefix.length);
			}
		}

		if (set === "Blades") {
			damageOffset = 3;
			weightOffset = 0.0;
			goldMult = 7.0;
		}
		else if (set === "Blooded") {
			damageOffset = 4;
			weightOffset = 1.0;
			goldMult = 7.0;
			if (editorID.endsWith("The")) {
				goldMult = 0.0;
				goldOffset = 1630;
			}
		}
		else if (set === "Bound") {
			damageOffset = 1;
			weightMult = 0.0;
			goldMult = 0.0;
		}
		else if (set === "BoundMystic") {
			damageOffset = 6;
			weightMult = 0.0;
			goldMult = 0.0;
		}
		else if (set === "BretonKnight") {
			damageOffset = 1;
			goldMult = 2.0;
		}
		else if (set === "Daedric") {
			damageOffset = 7;
			weightOffset = 7.0;
			goldMult = 100.0;
		}
		else if (set === "Dawnguard") {
			damageOffset = 2;
			weightOffset = 1.0;
			goldMult = 6.0;
		}
		else if (set === "Dragonbone") {
			damageOffset = 6;
			weightOffset = 6.0;
			goldMult = 80.0;
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
		else if (set === "Duskward") {
			damageOffset = 4;
			weightOffset = 2.0;
			goldMult = 10.0;
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
		else if (set === "Housecarl") {
			damageOffset = 3;
			weightOffset = 3.0;
			goldMult = 9.0;
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
		else if (set === "Spectral") {
			damageOffset = 3;
			weightMult = 0.0;
			goldMult = 0.0;
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
		else if (set === "Wood") {
			damageOffset = -5;
			weightOffset = -8.0;
			goldMult = 0.25;
		}
		else if (set === "Unique") {
			if (editorID.endsWith("Afterslash")) {
			}
			else if (editorID.endsWith("Alikr")) {
				damageOffset = 2;
				weightOffset = 1.0;
				goldOffset = 200;
			}
			else if (editorID.endsWith("ArmingSword")) {
			}
			else if (editorID.endsWith("AsumaTrenchKnife")) {
				baseSet = "Orcish";
				weightOffset = 2;
				goldOffset = 110;
			}
			else if (editorID.endsWith("AzurasMoon")) {
				// Manually edited in the plugin
			}
			else if (editorID.endsWith("BiPolarBlade")) {
				baseSet = "Daedric";
				goldOffset = 20000;
				damageOffset = 1;
			}
			else if (editorID.endsWith("BlackDragon")) {
				damageOffset = 3;
				goldOffset = 400;
			}
			else if (editorID.endsWith("BlueDragon")) {
				damageOffset = 3;
				goldOffset = 700;
			}
			else if (editorID.endsWith("ButchersKnife")) {
				weightOffset = 4;
				goldOffset = 135;
			}
			else if (editorID.endsWith("CaptainsSword")) {
				goldOffset = 35;
			}
			else if (editorID.endsWith("Chakram")) {
				baseSet = "Ebony";
			}
			else if (editorID.endsWith("Chrysamere")) {
				baseSet = "Daedric";
				goldOffset = 30000;
			}
			else if (editorID.endsWith("DaedricCleaver")) {
				baseSet = "Daedric";
			}
			else if (editorID.endsWith("CrowGreatsword")) {
				goldMult = 0;
				goldOffset = 1400;
				damageOffset = 3;
				weightOffset = 1.0;
			}
			else if (editorID.endsWith("CrowSword")) {
				goldMult = 0;
				goldOffset = 900;
				damageOffset = 3;
				weightOffset = 1.0;
			}
			else if (editorID.endsWith("Dremora")) {
				baseSet = "Daedric";
				goldOffset = -6000;
			}
			 else if (editorID.endsWith("DwemerControlRod")) {
				baseSet = "Dwarven";
				goldOffset = 200;
			}
			else if (editorID.endsWith("EbonyHammer")) {
				baseSet = "Ebony";
			}
			else if (editorID.endsWith("EmperorsGreatsword")) {
				goldOffset = 800;
				damageOffset = 3;
			}
			else if (editorID.endsWith("EasternDwarvenWarAxe")) {
				baseSet = "Dwarven";
				goldOffset = 100;
			}
			else if (editorID.endsWith("FleurDeLys")) {
				baseSet = "Elven";
			}
			else if (editorID.endsWith("ForkOfHorripilation")) {
				// Manually edited in the plugin
			}
			else if (editorID.endsWith("Goldbrand")) {
				baseSet = "Daedric";
				goldOffset = 6000;
			}
			else if (editorID.endsWith("GreatBlade")) {
				damageOffset = 3;
				goldMult = 4.0;
				goldOffset = 500;
			}
			else if (editorID.endsWith("GreatBloodBlade")) {
				damageOffset = 3;
				goldMult = 4.0;
				goldOffset = 800;
			}
			else if (editorID.endsWith("GreatWingsBlade")) {
				damageOffset = 3;
				goldMult = 4.0;
				goldOffset = 600;
			}
			else if (editorID.endsWith("Greyblade")) {
				damageOffset = 3;
				goldOffset = 400;
			}
			else if (editorID.endsWith("HollowBlade")) {
				weightOffset = 1.0;
			}
			else if (editorID.endsWith("HotBlood")) {
				baseSet = "Daedric";
				goldOffset = 1000;
			}
			else if (editorID.endsWith("HousecarlsGreatsword")) {
				goldOffset = 100;
			}
			else if (editorID.endsWith("IceBladeOfTheMonarch")) {
				damageOffset = 3;
				goldOffset = 6000;
			}
			else if (editorID.endsWith("Justice")) {
			}
			else if (editorID.endsWith("MaceOfAevarStoneSinger")) {
				baseSet = "Daedric";
				goldOffset = 3000;
			}
			else if (editorID.endsWith("MalacathsCleaver")) {
				baseSet = "Daedric";
				goldOffset = 2000;
			}
			else if (editorID.endsWith("OrnateWarhammer")) {
				baseSet = "Ebony";
			}
			else if (editorID.endsWith("OrgnumsDagger")) {
				damageOffset = 4;
				weightOffset = 2.0;
				goldMult = 15.0;
			}
			else if (editorID.endsWith("Umbra")) {
				baseSet = "Daedric";
			}
			else if (editorID.endsWith("Pokeblade")) {
				damageOffset = 1;
				goldOffset = 15;
			}
			else if (editorID.endsWith("Shadowsting")) {
				baseSet = "Daedric";
			}
			else if (editorID.endsWith("SixthHouseBell")) {
				baseSet = "Ebony";
			}
			else if (editorID.endsWith("Skull")) {
				baseSet = "Ebony";
			}
			else if (editorID.endsWith("Spearblade")) {
				goldOffset = 50;
			}
			else if (editorID.endsWith("Splitter")) {
				speedOffset = 0.15;
				reachOffset = -0.2;
			}
			else if (editorID.endsWith("ThresherMaul")) {
				goldOffset = 400;
				weightOffset = 4.0;
				damageOffset = 3;
				speedOffset = -0.05;
			}
			else if (editorID.endsWith("CeremonialGreatsword")) {
				damageOffset = 2;
				weightOffset = 1.0;
				goldOffset = 400;
			}
			else if (editorID.endsWith("TridentBlade")) {
				baseSet = "Dwarven";
			}
			else if (editorID.endsWith("Wabbajack")) {
				baseSet = "Daedric";
			}
			else if (editorID.endsWith("Wraith")) {
				baseSet = "Daedric";
				goldOffset = 5000;
			}
		}
		else {
			baseSet = "";
		}

		if (type === "Anlace") {
			baseType = "Dagger";
			weightOffset /= 2;
			weightOffset -= 0.5;
		}
		else if (type === "Club") {
			baseType = "Mace";
			damageOffset -= 1.0;
			weightOffset -= 1.0;
			speedOffset += 0.05;
		}
		else if (type === "Dagger") {
			baseType = "Dagger";
			weightOffset /= 2;
		}
		else if (type === "Dadao") {
			baseType = "Greatsword";
			damageOffset -= 0.5;
			weightOffset -= 1.0;
			speedOffset += 0.025;
			alreadyReqtified = true;
		}
		else if (type === "DaiKatana") {
			baseType = "Greatsword";
			weightOffset -= 3.0;
		}
		else if (type === "DoubleAxe") {
			baseType = "Battleaxe";
			damageOffset += 1.0;
			weightOffset += 2.0;
		}
		else if (type === "Greatsword") {
			baseType = "Greatsword";
			speedOffset += 0.05;
		}
		else if (type === "Halberd") {
			baseType = "Battleaxe";
			speedOffset -= 0.05;
			reachOffset += 0.2;
		}
		else if (type === "Hatchet") {
			baseType = "WarAxe";
			damageOffset -= 1;
			weightOffset -= 1.0;
			speedOffset += 0.1;
			reachOffset -= 0.1;
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
		else if (type === "Longmace") {
			baseType = "Warhammer";
			damageOffset -= 1;
			weightOffset -= 2.0;
			speedOffset += 0.05
		}
		else if (type === "Maul") {
			baseType = "Mace";
			damageOffset += 1;
			weightOffset += 1.0;
			speedOffset -= 0.1;
		}
		else if (type === "Quarterstaff") {
			damageOffset -= 4;
			weightOffset -= 6.0;
			speedOffset += 0.15;
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
		else if (type === "Scythe") {
			baseType = "Battleaxe";
			damageOffset += 1;
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
		else if (type === "Wakizashi") {
			baseType = "Sword";
			damageOffset -= 1;
			weightOffset -= 2.5;
			speedOffset += 0.15;
			reachOffset -= 0.1
		}
		else if (type === "WarPick") {
			baseType = "WarAxe";
			damageOffset -= 1;
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
		else if (set !== "NULL" && !prefixes.includes(set)) {
			logMessage(`${xelib.LongName(weapon)} doesn't have a base weapon`);
		}
	}
	addProgress(1);
}
