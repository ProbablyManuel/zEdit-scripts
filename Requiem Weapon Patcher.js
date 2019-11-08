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
	isBow = xelib.GetValue(weapon, "DNAM\\Animation Type") === "Bow";
	isCrossbow = xelib.GetValue(weapon, "DNAM\\Animation Type") === "Crossbow";
	isStaff = xelib.GetValue(weapon, "DNAM\\Animation Type") === "Staff";
	if (!isBow && !isCrossbow && !isStaff) {
		let editorID = xelib.EditorID(weapon)
		let regex = /[^_]+(?:_(?:Creature|Ench|NonPlayable|Variant))?_([^_]+)_([^_]+)(?:_(.+))?/
		let match = editorID.match(regex);
		if (match) {
			let set = match[1];
			let type = match[2];
			let suffix = match[3];
			let goldOffset = 0;
			let goldMult = 1.0;
			let weightOffset = 0.0;
			let weightMult = 1.0;
			let damageOffset = 0;
			let damageMult = 1.0;
			let speedOffset = 0.0;
			let reachOffset = 0.0;
			let baseSet = "";
			if (set === "Unique") {
				if (suffix === "AevarStoneSinger") {
					baseSet = "Daedric";
					goldOffset += 3000;
				}
				else if (suffix === "Afterslash") {
					baseSet = "Steel";
				}
				else if (suffix === "Alikr") {
					baseSet = "Redguard";
					damageOffset += 2;
					weightOffset += 1.0;
					goldOffset += 200;
				}
				else if (suffix === "Arming") {
					baseSet = "Steel";
				}
				else if (suffix === "AsumaTrenchKnife") {
					baseSet = "Orcish";
					weightOffset += 2;
					goldOffset += 40;
				}
				else if (suffix === "BiPolarBlade") {
					baseSet = "Daedric";
					goldOffset += 20000;
					damageOffset += 1;
				}
				else if (suffix === "BlackDragon") {
					baseSet = "Steel";
					damageOffset += 3;
					goldOffset += 400;
				}
				else if (suffix === "BlueDragon") {
					baseSet = "Steel";
					damageOffset += 3;
					goldOffset += 700;
				}
				else if (suffix === "ButchersKnife") {
					baseSet = "Steel";
					weightOffset += 4;
					goldOffset += 135;
				}
				else if (suffix === "Captain") {
					baseSet = "Steel";
					goldOffset += 35;
				}
				else if (suffix === "CeremonialAries" || suffix === "CeremonialTombstone") {
					baseSet = "DraugrHoned";
					goldOffset += 400;
				}
				else if (suffix === "Chrysamere") {
					baseSet = "Daedric";
					goldOffset += 30000;
				}
				else if (suffix === "Crow") {
					baseSet = "Steel";
					goldMult *= 15;
					damageOffset += 3;
					weightOffset += 1.0;
				}
				else if (suffix === "DaedricCleaver") {
					baseSet = "Daedric";
				}
				else if (suffix === "Dremora") {
					baseSet = "Daedric";
					goldMult *= 0.1;
				}
				else if (suffix === "DwemerControlRod") {
					baseSet = "Dwarven";
					goldOffset += 200;
				}
				else if (suffix === "EbonyHammer") {
					baseSet = "Ebony";
				}
				else if (suffix === "Emperor") {
					baseSet = "Steel";
					goldOffset += 800;
					damageOffset += 3;
				}
				else if (suffix === "EasternDwarven") {
					baseSet = "Dwarven";
					goldOffset += 100;
				}
				else if (suffix === "FleurDeLys") {
					baseSet = "Glass";
				}
				else if (suffix === "Goldbrand") {
					baseSet = "Daedric";
					goldOffset += 9000;
				}
				else if (suffix === "GreatBlade") {
					baseSet = "Steel";
					damageOffset += 3;
					weightOffset -= 3.0;
					goldMult *= 4.0;
					goldOffset += 500;
				}
				else if (suffix === "GreatBloodBlade") {
					baseSet = "Steel";
					damageOffset += 3;
					weightOffset -= 3.0;
					goldMult *= 4.0;
					goldOffset += 800;
				}
				else if (suffix === "GreatWingsBlade") {
					baseSet = "Steel";
					damageOffset += 3;
					weightOffset -= 3.0;
					goldMult *= 4.0;
					goldOffset += 600;
				}
				else if (suffix === "Greyblade") {
					baseSet = "Steel";
					damageOffset += 3;
					goldOffset += 400;
				}
				else if (suffix === "HollowBlade") {
					baseSet = "Steel";
					weightOffset += 1.0;
				}
				else if (suffix === "HotBlood") {
					baseSet = "Daedric";
					goldOffset += 1000;
				}
				else if (suffix === "Housecarl") {
					baseSet = "Steel";
					goldOffset += 100;
				}
				else if (suffix === "IceBladeOfTheMonarch") {
					baseSet = "Steel";
					damageOffset += 3;
					goldOffset += 6000;
				}
				else if (suffix === "Justice") {
					baseSet = "Steel";
				}
				else if (suffix === "MalacathsCleaver") {
					baseSet = "Daedric";
					goldOffset += 2000;
				}
				else if (suffix === "Ornate") {
					baseSet = "Ebony";
				}
				else if (suffix === "Orgnum") {
					baseSet = "Steel";
					damageOffset += 4;
					weightOffset += 5.0;
					goldOffset += 700;
				}
				else if (suffix === "Pokeblade") {
					baseSet = "Steel";
					damageOffset += 1;
					goldOffset += 15;
				}
				else if (suffix === "Shadowsting") {
					baseSet = "Daedric";
					goldOffset += 1000;
				}
				else if (suffix === "SixthHouseBell") {
					baseSet = "Ebony";
				}
				else if (suffix === "Skull") {
					baseSet = "Ebony";
				}
				else if (suffix === "Spearblade") {
					baseSet = "Steel";
					goldOffset += 50;
				}
				else if (suffix === "Splitter") {
					baseSet = "Iron";
					damageOffset += 1;
					goldOffset += 50;
					speedOffset = 0.15;
					reachOffset = -0.2;
				}
				else if (suffix === "ThresherMaul") {
					baseSet = "Steel";
					goldOffset += 400;
					weightOffset += 4.0;
					damageOffset += 3;
					speedOffset = -0.05;
				}
				else if (suffix === "TridentBlade") {
					baseSet = "Dwarven";
				}
				else if (suffix === "Umbra") {
					baseSet = "Daedric";
					goldOffset += 3000;
				}
				else if (suffix === "Wabbajack") {
					baseSet = "Daedric";
					goldOffset += 2000;
				}
				else if (suffix === "Wraith") {
					baseSet = "Daedric";
					goldOffset += 5000;
				}
			}
			else {
				if (set === "Blooded") {
					baseSet = "Steel";
					damageOffset += 4;
					weightOffset += 1.0;
					goldMult *= 7.0;
					if (suffix === "The") {
						goldMult *= 0.0;
						goldOffset += 1630;
					}
				}
				else if (set === "BretonKnight") {
					baseSet = "Steel";
					damageOffset += 1;
					goldMult *= 2.0;
				}
				else if (set === "Duke") {
					baseSet = "Steel";
					damageOffset += 1;
					weightOffset += 0.0;
					goldMult *= 1.5;
				}
				else if (set === "Duskward") {
					baseSet = "Steel";
					damageOffset += 4;
					weightOffset += 2.0;
					goldMult *= 10.0;
				}
				else if (set === "Housecarl") {
					baseSet = "Steel";
					damageOffset += 3;
					weightOffset += 3.0;
					goldMult *= 9.0;
				}
				else if (set === "Knight") {
					baseSet = "Steel";
					damageOffset += 0.5;
					weightOffset += 0.0;
					goldMult *= 1.25;
				}
				else if (set === "Noble") {
					baseSet = "Steel";
					damageOffset += 1.5;
					weightOffset += 0.0;
					goldMult *= 1.75;
				}
				else if (set === "Sithis") {
					baseSet = "Steel";
					damageOffset += 1;
					weightOffset += 0.0;
					goldMult *= 1.5;
				}
				else {
					baseSet = set;
				}
			}
			// Derive stats of base set from steel weapons
			if (baseSet === "Blades") {
				baseSet = "Steel";
				damageOffset += 3;
				weightOffset += 0.0;
				goldMult *= 7.0;
			}
			else if (baseSet === "Bound") {
				baseSet = "Steel";
				damageOffset += 1;
				weightMult = 0.0;
				goldMult *= 0.0;
			}
			else if (baseSet === "BoundMystic") {
				baseSet = "Steel";
				damageOffset += 6;
				weightMult = 0.0;
				goldMult *= 0.0;
			}
			else if (baseSet === "Daedric") {
				baseSet = "Steel";
				damageOffset += 7;
				weightOffset += 7.0;
				goldMult *= 100.0;
			}
			else if (baseSet === "Dawnguard") {
				baseSet = "Steel";
				damageOffset += 2;
				weightOffset += 1.0;
				goldMult *= 6.0;
			}
			else if (baseSet === "Dragonbone") {
				baseSet = "Steel";
				damageOffset += 6;
				weightOffset += 6.0;
				goldMult *= 80.0;
			}
			else if (baseSet === "Draugr") {
				baseSet = "Steel";
				damageOffset += 0;
				weightOffset += 1.0;
				goldMult *= 1 / 3;
			}
			else if (baseSet === "DraugrHoned") {
				baseSet = "Steel";
				damageOffset += 3;
				weightOffset += 1.0;
				goldMult *= 2 / 3;
			}
			else if (baseSet === "Dwarven") {
				baseSet = "Steel";
				damageOffset += 3;
				weightOffset += 4.0;
				goldMult *= 5.0;
			}
			else if (baseSet === "Ebony") {
				baseSet = "Steel";
				damageOffset += 5;
				weightOffset += 5.0;
				goldMult *= 40.0;
			}
			else if (baseSet === "Elven") {
				baseSet = "Steel";
				damageOffset += 1;
				weightOffset += -2.0;
				goldMult *= 3.0;
			}
			else if (baseSet === "Falmer") {
				baseSet = "Steel";
				damageOffset += -1;
				weightOffset += 0.0;
				goldMult *= 0.25;
			}
			else if (baseSet === "FalmerHoned") {
				baseSet = "Steel";
				damageOffset += 2;
				weightOffset += 0.0;
				goldMult *= 0.5;
			}
			else if (baseSet === "Forsworn") {
				baseSet = "Steel";
				damageOffset += -2;
				weightOffset += -2.0;
				goldMult *= 0.2;
			}
			else if (baseSet === "Glass") {
				baseSet = "Steel";
				damageOffset += 4;
				weightOffset += -3.0;
				goldMult *= 25.0;
			}
			else if (baseSet === "Imperial") {
				baseSet = "Steel";
				damageOffset += 0;
				weightOffset += 0.0;
				goldMult *= 4 / 3;
			}
			else if (baseSet === "Iron") {
				baseSet = "Steel";
				damageOffset += -1;
				weightOffset += -1.0;
				goldMult *= 0.55;
			}
			else if (baseSet === "NordHero") {
				baseSet = "Steel";
				damageOffset += 3;
				weightOffset += -1.0;
				goldMult *= 6.0;
			}
			else if (baseSet === "Nordic") {
				baseSet = "Steel";
				damageOffset += 2;
				weightOffset += 0.0;
				goldMult *= 4.0;
			}
			else if (baseSet === "Orcish") {
				baseSet = "Steel";
				damageOffset += 2;
				weightOffset += 2.0;
				goldMult *= 4.0;
			}
			else if (baseSet === "Redguard") {
				baseSet = "Steel";
				damageOffset += 0;
				weightOffset += 0.0;
				goldMult *= 1.5;
			}
			else if (baseSet === "Silver") {
				baseSet = "Steel";
				damageOffset += 0;
				weightOffset += 0.0;
				goldMult *= 2.0;
			}
			else if (baseSet === "SkyforgeSteel") {
				baseSet = "Steel";
				damageOffset += 3;
				weightOffset += 0.0;
				goldMult *= 7.0;
			}
			else if (baseSet === "SpectralDraugr") {
				baseSet = "Steel";
				damageOffset += 3;
				weightMult = 0.0;
				goldMult *= 0.0;
			}
			else if (baseSet === "Stalhrim") {
				baseSet = "Steel";
				damageOffset += 5;
				weightOffset += 4.0;
				goldMult *= 40.0;
			}
			else if (baseSet === "Steel") {
				baseSet = "Steel";
				damageOffset += 0;
				weightOffset += 0.0;
				goldMult *= 1.0;
			}
			else if (baseSet === "Wood") {
				baseSet = "Steel";
				damageOffset += -6;
				weightOffset += -7.0;
				goldMult *= 0.25;
			}
			else {
				baseSet = "";
			}
			// Derive stats of new weapon types from base weapons
			let baseType = type;
			if (type === "Anlace") {
				baseType = "Dagger";
				weightOffset -= 1.0;
			}
			else if (type === "Axestaff") {
				baseType = "Battleaxe";
			}
			else if (type === "Claymore") {
				baseType = "Greatsword";
			}
			else if (type === "Club") {
				baseType = "Mace";
				damageOffset -= 1.0;
				weightOffset -= 1.0;
				speedOffset += 0.05;
			}
			else if (type === "Crescent") {
				baseType = "Sword";
			}
			else if (type === "Dadao") {
				baseType = "Greatsword";
				damageOffset -= 0.5;
				weightOffset -= 1.0;
				speedOffset += 0.025;
			}
			else if (type === "DaiKatana") {
				baseType = "Greatsword";
				weightOffset -= 3.0;
			}
			else if (type === "DoubleAxe") {
				baseType = "Battleaxe";
				damageOffset += 1.0;
				weightOffset += 4.0;
			}
			else if (type === "Glaive") {
				baseType = "Greatsword";
			}
			else if (type === "GreatCrescent") {
				baseType = "Greatsword";
			}
			else if (type === "Halberd") {
				baseType = "Battleaxe";
				speedOffset -= 0.05;
				reachOffset += 0.1;
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
			else if (type === "LongMace") {
				baseType = "Warhammer";
				damageOffset -= 1;
				weightOffset -= 2.0;
				speedOffset += 0.05
			}
			else if (type === "Longsword") {
				baseType = "Sword";
				damageOffset += 1;
				weightOffset += 1.0;
				speedOffset -= 0.05;
				reachOffset += 0.1;
			}
			else if (type === "Maul") {
				baseType = "Mace";
				damageOffset += 1;
				weightOffset += 1.0;
				speedOffset -= 0.1;
			}
			else if (type === "Quarterstaff") {
				baseType = "Warhammer";
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
			}
			else if (type === "Scythe") {
				baseType = "Battleaxe";
				damageOffset += 1;
			}
			else if (type === "Shortspear") {
				baseType = "Sword";
			}
			else if (type === "Shortsword") {
				baseType = "Sword";
				damageOffset -= 1;
				weightOffset -= 1.0;
				speedOffset += 0.15;
				reachOffset -= 0.1;
			}
			else if (type === "Spear") {
				baseType = "Greatsword";
			}
			else if (type === "Tanto") {
				baseType = "Dagger";
				damageOffset += 1;
				weightOffset += 5.0;
				speedOffset -= 0.1;
				reachOffset += 0.1;
			}
			else if (type === "Trident") {
				baseType = "Greatsword";
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
			// Speed of greatswords is too low in Skyrim.esm
			if (baseType === "Greatsword") {
				speedOffset += 0.05;
			}
			else if (baseType === "Dagger") {
				weightOffset /= 2;
			}

			let baseWeapon = Database.WeaponBySetAndType(baseSet, baseType);
			if (baseWeapon) {
				let alreadyReqtified = !Number.isInteger(damageOffset);
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
				else {
					if (xelib.HasKeyword(weapon, "REQ_KW_AlreadyReqtified")) {
						xelib.RemoveKeyword(weapon, "REQ_KW_AlreadyReqtified");
					}
				}
			}
			else if (set !== "NULL") {
				logMessage(`${xelib.LongName(weapon)} doesn't have a base weapon`);
			}
		}
		else {
			logMessage(`${xelib.LongName(weapon)} doesn't have a matching EditorID`);
		}
	}
	addProgress(1);
}
