const scriptPath = `${xelib.GetGlobal("ProgramPath")}\\scripts\\`;
const Database = require(`${scriptPath}Database.js`);
const TTLib = require(`${scriptPath}TT Library.js`);

const selected = zedit.GetSelectedRecords("WEAP");

const {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
	determinate: true,
	title: "Reqiem Weapon Patcher",
	message : "",
	canClose: true,
	current: 0,
	max: selected.length
});

const weaponRegex = /^[^_]+(?:_(?:Creature|Ench|NP|Var))?_([^_]+)_([^_]+)(?:_(.+))?$/

for (const weapon of selected) {
	const isBow = xelib.GetValue(weapon, "DNAM\\Animation Type") === "Bow";
	const isCrossbow = xelib.GetValue(weapon, "DNAM\\Animation Type") === "Crossbow";
	const isStaff = xelib.GetValue(weapon, "DNAM\\Animation Type") === "Staff";
	if (!isBow && !isCrossbow && !isStaff) {
		const editorID = xelib.EditorID(weapon)
		const match = editorID.match(weaponRegex);
		if (match) {
			const set = match[1];
			const type = match[2];
			const suffix = match[3];
			let goldOffset = 0;
			let goldMult = 1;
			let weightOffset = 0;
			let weightMult = 1;
			let damageOffset = 0;
			let speedOffset = 0;
			let reachOffset = 0;
			let staggerOffset = 0;
			let baseSet = "";
			if (set === "Artifact" || set === "Replica") {
				if (suffix === "Aegisbane") {
					baseSet = "Iron";
				}
				else if (suffix === "Amren") {
					baseSet = "Redguard";
				}
				else if (suffix === "AncientDawnguard") {
					baseSet = "Dawnguard";
					goldOffset = 5000;
					goldMult = 0;
					damageOffset += 2;
				}
				else if (suffix === "BladeOfSacrifice") {
					baseSet = "Ebony";
				}
				else if (suffix === "BladeOfWoeAstrid") {
					baseSet = "Ebony";
				}
				else if (suffix === "BladeOfWoeAwakened") {
					baseSet = "Ebony";
				}
				else if (suffix === "Bloodscythe") {
					baseSet = "Ebony";
					goldOffset = 15000;
					goldMult = 0;
					weightOffset -= 1;
				}
				else if (suffix === "BloodskalBlade") {
					baseSet = "Silver";
					goldOffset = 5000;
					goldMult = 0;
				}
				else if (suffix === "BolarsOathblade") {
					baseSet = "Blades";
				}
				else if (suffix === "Chillrend") {
					baseSet = "Glass";
				}
				else if (suffix === "Dawnbreaker") {
					baseSet = "Silver";
					goldOffset = 100000;
					goldMult = 0;
					damageOffset += 1;
				}
				else if (suffix === "Dragonbane") {
					baseSet = "Blades";
					goldOffset += 5000;
					goldMult = 0;
				}
				else if (suffix === "EbonyBlade") {
					baseSet = "Ebony";
					goldOffset = 100000;
					goldMult = 0;
				}
				else if (suffix === "Eduj") {
					baseSet = "NordHero";
				}
				else if (suffix === "GauldurBlackblade") {
					baseSet = "NordHero";
				}
				else if (suffix === "Ghostblade") {
					baseSet = "SpectralDraugr";
					goldOffset = 2000;
				}
				else if (suffix === "Gorak") {
					baseSet = "Forsworn";
				}
				else if (suffix === "Grimsever") {
					baseSet = "Glass";
				}
				else if (suffix === "Harkon") {
					baseSet = "Daedric";
					goldOffset = 15000;
					goldMult = 0;
					damageOffset += 1;
				}
				else if (suffix === "Horksbane") {
					baseSet = "Steel";
				}
				else if (suffix === "KahvozeinsFang") {
					baseSet = "Dragonbone";
					goldOffset = 2000;
					goldMult = 0;
				}
				else if (suffix === "Keening") {
					baseSet = "Daedric";
					goldOffset = 50000;
					goldMult = 0;
					damageOffset += 1;
				}
				else if (suffix === "Longhammer") {
					baseSet = "Iron";
					weightOffset -= 4;
					speedOffset += 0.2;
				}
				else if (suffix === "MehrunesRazor") {
					baseSet = "Ebony";
					goldOffset = 100000;
					goldMult = 0;
				}
				else if (suffix === "Miraak") {
					baseSet = "Daedric";
					goldOffset = 100000;
					goldMult = 0;
					damageOffset += 1;
					reachOffset += 0.2;
				}
				else if (suffix === "MolagBal") {
					baseSet = "Ebony";
					goldOffset = 100000;
					goldMult = 0;
					weightOffset = 4;
				}
				else if (suffix === "Nettlebane") {
					baseSet = "Ebony";
					goldOffset += 2000;
					goldMult = 0;
				}
				else if (suffix === "Nightingale") {
					baseSet = "Ebony";
					goldOffset = 15000;
					goldMult = 0;
				}
				else if (suffix === "Okin") {
					baseSet = "NordHero";
				}
				else if (suffix === "QueenFreydis") {
					baseSet = "Iron";
					goldOffset = 500;
					goldMult = 0;
				}
				else if (suffix === "RuefulAxe") {
					baseSet = "Silver";
					goldOffset = 100000;
					goldMult = 0;
					damageOffset += 3;
				}
				else if (suffix === "RedEaglesBane") {
					baseSet = "Forsworn";
					goldOffset = 1000;
					goldMult = 0;
					damageOffset += 5;
				}
				else if (suffix === "RedEaglesFury") {
					baseSet = "Forsworn";
				}
				else if (suffix === "Soulrender") {
					baseSet = "Ebony";
					goldOffset = 15000;
					goldMult = 0;
					weightOffset -= 1;
				}
				else if (suffix === "Stormbringer") {
					baseSet = "Ebony";
					goldOffset = 15000;
					goldMult = 0;
				}
				else if (suffix === "Stormfang") {
					baseSet = "Nordic";
					speedOffset += 0.05;
				}
				else if (suffix === "ThePaleBlade") {
					baseSet = "NordHero";
				}
				else if (suffix === "Valdr") {
					baseSet = "Steel";
				}
				else if (suffix === "Volendrung") {
					baseSet = "Ebony";
					goldOffset = 100000;
					goldMult = 0;
					weightOffset += 7;
				}
				else if (suffix === "Windshear") {
					baseSet = "Redguard";
					damageOffset += 3;
				}
				else if (suffix === "WoodsmansFriend") {
					baseSet = "Iron";
				}
				else if (suffix === "Wuuthrad") {
					baseSet = "Ebony";
					goldOffset = 50000;
					goldMult = 0;
				}
				// Royal Armory
				else if (suffix === "AldmeriSword") {
					baseSet = "Elven";
					goldMult *= 10;
				}
				else if (suffix === "BlackBriar") {
					baseSet = "Ebony";
				}
				else if (suffix === "Carcette") {
					baseSet = "Steel";
				}
				else if (suffix === "Crescent") {
					baseSet = "Stalhrim";
				}
				else if (suffix === "Dragonfang") {
					baseSet = "Steel";
				}
				else if (suffix === "Dragonsreach") {
					baseSet = "NordHero";
				}
				else if (suffix === "Esbern") {
					baseSet = "Blades";
				}
				else if (suffix === "FoeBreaker") {
					baseSet = "SkyforgeSteel";
				}
				else if (suffix === "Hafyllbrand") {
					baseSet = "NordHero";
				}
				else if (suffix === "HammerOfLight") {
					baseSet = "Dawnguard";
				}
				else if (suffix === "Harbinger") {
					baseSet = "Silver";
					goldOffset = 100000;
					goldMult = 0;
				}
				else if (suffix === "Jolhert") {
					baseSet = "Stalhrim";
				}
				else if (suffix === "Judgement") {
					baseSet = "Steel";
				}
				else if (suffix === "KematusScimitar") {
					baseSet = "Steel";
					damageOffset += 3;
					weightOffset += 0;
					goldMult *= 7;
					speedOffset += 0.1;
				}
				else if (suffix === "Malice") {
					baseSet = "Ebony";
				}
				else if (suffix === "NorthernHonor") {
					baseSet = "Steel";
				}
				else if (suffix === "Regnving") {
					baseSet = "Ebony";
				}
				else if (suffix === "Rikvard") {
					baseSet = "Steel";
				}
				else if (suffix === "Shalidor") {
					baseSet = "Ebony";
				}
				else if (suffix === "Shard") {
					baseSet = "Dwarven";
				}
				else if (suffix === "Silverblood") {
					baseSet = "Silver";
				}
				else if (suffix === "Smile") {
					baseSet = "Ebony";
				}
				else if (suffix === "Snaerving") {
					baseSet = "Ebony";
				}
				else if (suffix === "Stormbird") {
					baseSet = "Elven";
				}
			}
			else {
				if (set === "AlikrElite") {
					baseSet = "Steel";
					damageOffset += 3;
					weightOffset += 0;
					goldMult *= 7;
					speedOffset += 0.1;
				}
				else if (set === "Angarvunde") {
					baseSet = "Ebony";
				}
				else if (set === "BlackthornFamily") {
					baseSet = "Iron";
				}
				else if (set === "DivineWrath") {
					baseSet = "Silver";
					damageOffset += 1;
					weightOffset += 1;
					goldMult *= 10;
				}
				else if (set === "Blooded") {
					baseSet = "Steel";
					goldMult *= 10;
					speedOffset += 0.15;
				}
				else if (set === "Duskward") {
					baseSet = "SkyforgeSteel";
					goldMult *= 2;
					speedOffset += 0.1;
				}
				else if (set === "Hoth") {
					baseSet = "Orcish";
				}
				else if (set === "ImperialLoyalist") {
					baseSet = "Nordic";
				}
				else {
					baseSet = set;
				}
			}
			// Derive stats of base set from steel weapons
			if (baseSet === "Blades") {
				baseSet = "Steel";
				damageOffset += 3;
				weightOffset += 0;
				goldMult *= 7;
			}
			else if (baseSet === "Bound") {
				baseSet = "Steel";
				damageOffset += 1;
				weightMult = 0;
				goldMult *= 0;
			}
			else if (baseSet === "BoundMystic") {
				baseSet = "Steel";
				damageOffset += 6;
				weightMult = 0;
				goldMult *= 0;
			}
			else if (baseSet === "Daedric") {
				baseSet = "Steel";
				damageOffset += 7;
				weightOffset += 7;
				goldMult *= 100;
			}
			else if (baseSet === "Dawnguard") {
				baseSet = "Steel";
				damageOffset += 2;
				weightOffset += 1;
				goldMult *= 6;
			}
			else if (baseSet === "Dragonbone") {
				baseSet = "Steel";
				damageOffset += 6;
				weightOffset += 6;
				goldMult *= 80;
			}
			else if (baseSet === "Draugr") {
				baseSet = "Steel";
				damageOffset += 0;
				weightOffset += 1;
				goldMult *= 1 / 3;
			}
			else if (baseSet === "DraugrHoned") {
				baseSet = "Steel";
				damageOffset += 3;
				weightOffset += 1;
				goldMult *= 2 / 3;
			}
			else if (baseSet === "Dwarven") {
				baseSet = "Steel";
				damageOffset += 3;
				weightOffset += 4;
				goldMult *= 5;
			}
			else if (baseSet === "Ebony") {
				baseSet = "Steel";
				damageOffset += 5;
				weightOffset += 5;
				goldMult *= 40;
			}
			else if (baseSet === "Elven") {
				baseSet = "Steel";
				damageOffset += 1;
				weightOffset += -2;
				goldMult *= 3;
			}
			else if (baseSet === "Falmer") {
				baseSet = "Steel";
				damageOffset += -1;
				weightOffset += 0;
				goldMult *= 0.25;
			}
			else if (baseSet === "FalmerHoned") {
				baseSet = "Steel";
				damageOffset += 2;
				weightOffset += 0;
				goldMult *= 0.5;
			}
			else if (baseSet === "Forsworn") {
				baseSet = "Steel";
				damageOffset += -2;
				weightOffset += -2;
				goldMult *= 0.2;
			}
			else if (baseSet === "Glass") {
				baseSet = "Steel";
				damageOffset += 4;
				weightOffset += -1;
				goldMult *= 25;
			}
			else if (baseSet === "Imperial") {
				baseSet = "Steel";
				damageOffset += 0;
				weightOffset += 0;
				goldMult *= 4 / 3;
			}
			else if (baseSet === "Iron") {
				baseSet = "Steel";
				damageOffset += -1;
				weightOffset += -1;
				goldMult *= 0.55;
			}
			else if (baseSet === "NordHero") {
				baseSet = "Steel";
				damageOffset += 3;
				weightOffset += -1;
				goldMult *= 6;
			}
			else if (baseSet === "Nordic") {
				baseSet = "Steel";
				damageOffset += 2;
				weightOffset += 0;
				goldMult *= 4;
			}
			else if (baseSet === "Orcish") {
				baseSet = "Steel";
				damageOffset += 2;
				weightOffset += 2;
				goldMult *= 4;
			}
			else if (baseSet === "Redguard") {
				baseSet = "Steel";
				damageOffset += 0;
				weightOffset += 0;
				goldMult *= 1.5;
			}
			else if (baseSet === "Silver") {
				baseSet = "Steel";
				damageOffset += 0;
				weightOffset += 0;
				goldMult *= 2;
			}
			else if (baseSet === "SkyforgeSteel") {
				baseSet = "Steel";
				damageOffset += 3;
				weightOffset += 0;
				goldMult *= 7;
			}
			else if (baseSet === "SpectralDraugr") {
				baseSet = "Steel";
				damageOffset += 3;
				weightMult = 0;
				goldMult *= 0;
			}
			else if (baseSet === "Stalhrim") {
				baseSet = "Steel";
				damageOffset += 5;
				weightOffset += 4;
				goldMult *= 40;
			}
			else if (baseSet === "Steel") {
				baseSet = "Steel";
				damageOffset += 0;
				weightOffset += 0;
				goldMult *= 1;
			}
			else if (baseSet === "Wood") {
				baseSet = "Steel";
				damageOffset += -6;
				weightOffset += -7;
				goldMult *= 0.25;
			}
			else {
				baseSet = "";
			}
			// Derive stats of new weapon types from base weapons
			let baseType = type;
			if (type === "Club") {
				baseType = "Mace";
				damageOffset -= 1;
				weightOffset -= 1;
				speedOffset += 0.05;
				staggerOffset -= 0.15;
			}
			else if (type === "DaiKatana") {
				baseType = "Greatsword";
				damageOffset -= 1;
				speedOffset += 0.075;
			}
			else if (type === "Glaive") {
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
				weightOffset -= 1;
				speedOffset += 0.1;
				reachOffset -= 0.1;
				staggerOffset -= 0.15;
			}
			else if (type === "Katana") {
				baseType = "Sword";
				damageOffset -= 1;
				speedOffset += 0.075;
			}
			else if (type === "LongMace") {
				baseType = "Warhammer";
				damageOffset -= 1;
				weightOffset -= 2;
				speedOffset += 0.05;
				staggerOffset -= 0.15;
			}
			else if (type === "Maul") {
				baseType = "Mace";
				damageOffset += 1;
				weightOffset += 1;
				speedOffset -= 0.1;
				staggerOffset += 0.1;
			}
			else if (type === "Quarterstaff") {
				baseType = "Warhammer";
				damageOffset -= 4;
				weightOffset -= 6;
				speedOffset += 0.15;
				staggerOffset -= 0.25;
			}
			else if (type === "Scimitar") {
				baseType = "Sword";
				speedOffset += 0.05;
			}
			else if (type === "Shortspear") {
				baseType = "Sword";
			}
			else if (type === "Shortsword") {
				baseType = "Sword";
				damageOffset -= 1;
				weightOffset -= 1;
				speedOffset += 0.15;
				reachOffset -= 0.1;
				staggerOffset -= 0.15;
			}
			else if (type === "Spear") {
				baseType = "Greatsword";
			}
			else if (type === "Tanto") {
				baseType = "Dagger";
				damageOffset += 1;
				weightOffset += 4;
				speedOffset -= 0.1;
				reachOffset += 0.1;
			}
			else if (type === "Trident") {
				baseType = "Greatsword";
			}
			else if (type === "Wakizashi") {
				baseType = "Sword";
				damageOffset -= 1;
				weightOffset -= 1;
				speedOffset += 0.15;
				reachOffset -= 0.1;
				staggerOffset -= 0.15;
			}
			// Speed of greatswords is too low in Skyrim.esm
			if (baseType === "Greatsword") {
				speedOffset += 0.05;
			}
			else if (baseType === "Dagger") {
				weightOffset /= 2;
			}

			const baseWeapon = Database.WeaponBySetAndType(baseSet, baseType);
			if (baseWeapon) {
				// Gold
				let gold = xelib.GetGoldValue(baseWeapon) * goldMult + goldOffset;
				gold = Math.round(gold / 5) * 5;
				if (gold !== xelib.GetGoldValue(weapon)) {
					xelib.SetGoldValue(weapon, gold);
				}
				// Weight
				let weight = xelib.GetWeight(baseWeapon) * weightMult + weightOffset;
				if (Math.abs(weight - xelib.GetWeight(weapon)) > 0.001) {
					xelib.SetWeight(weapon, weight);
				}
				// Damage
				let damage = xelib.GetDamage(baseWeapon) + damageOffset;
				const criticalDamage = Math.trunc(damage / 2);
				if (!Number.isInteger(damage)) {
					damage *= 6;
					if (!xelib.HasKeyword(weapon, "RFTI_Exclusions_NoDamageRescale")) {
						xelib.AddKeyword(weapon, "RFTI_Exclusions_NoDamageRescale");
					}
				}
				else {
					if (xelib.HasKeyword(weapon, "RFTI_Exclusions_NoDamageRescale")) {
						xelib.RemoveKeyword(weapon, "RFTI_Exclusions_NoDamageRescale");
					}
				}
				if (damage !== xelib.GetDamage(weapon))  {
					xelib.SetDamage(weapon, damage);
				}
				if (criticalDamage !== TTLib.GetCriticalDamage(weapon))  {
					TTLib.SetCriticalDamage(weapon, criticalDamage);
				}
				// Speed
				const speed = TTLib.GetWeaponSpeed(baseWeapon) + speedOffset;
				if (Math.abs(speed - TTLib.GetWeaponSpeed(weapon)) > 0.001) {
					TTLib.SetWeaponSpeed(weapon, speed);
				}
				// Reach
				const reach = TTLib.GetWeaponReach(baseWeapon) + reachOffset;
				if (Math.abs(reach - TTLib.GetWeaponReach(weapon)) > 0.001) {
					TTLib.SetWeaponReach(weapon, reach);
				}
				// Stagger
				const stagger = TTLib.GetWeaponStagger(baseWeapon) + staggerOffset;
				if (Math.abs(stagger - TTLib.GetWeaponStagger(weapon)) > 0.001) {
					TTLib.SetWeaponStagger(weapon, stagger);
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
