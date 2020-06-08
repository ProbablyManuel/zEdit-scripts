const selected = zedit.GetSelectedRecords("ARMO");
// const selected = xelib.GetRecords(xelib.FileByName("RRO-760.esp"), "ARMO", true);

const {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
	determinate: true,
	title: "Requiem Armor Patcher",
	message : "",
	canClose: true,
	current: 0,
	max: selected.length
});

const bodyRatio = 0.5;
const feetRatio = 0.15;
const handRatio = 0.15;
const headRatio = 0.2;
const shieldRatio = 0.25;

const armorRegex = /^[^_]+(?:_(?:Ench|NP|Var))?_(Heavy|Light)_([^_]+)_([^_]+)(?:_(.+))?$/
const artifactRegex = /^[^_]+_Artifact_(.+)$/
const clothingRegex = /^[^_]+(?:_(?:Ench|NP|Var))?_Cloth_([^_]+)_([^_]+)(?:_(.+))?$/
const creatureRegex = /^[^_]+_Creature_(.+)$/
const jewelryRegex = /^[^_]+(?:_(?:Ench|NP|Var))?_(Amulet|Circlet|Ring)_([^_]+)(?:_(.+))?$/
const nullifiedRegex = /^[^_]+_NULL_.+$/
const saddleRegex = /^[^_]+_Saddle_([^_]+)(?:_(.+))?$/

for (const armor of selected) {
	const editorID = xelib.EditorID(armor);
	const armorMatch = editorID.match(armorRegex);
	const artifactMatch = editorID.match(artifactRegex);
	if (armorMatch) {
		const type = armorMatch[1]
		const set = armorMatch[2];
		const part = armorMatch[3];
		const suffix = armorMatch[4];
		const armorValues = GetArmorValues(type, set, part, suffix);
		if (armorValues) {
			SetArmorValues(armor, armorValues);
		}
		else {
			logMessage(`Type ${type} and set ${set} is not recognized`);
		}
	}
	else if (artifactMatch) {
		const artifact = artifactMatch[1];
		const armorValues = GetArtifactValues(artifact);
		if (armorValues) {
			SetArmorValues(armor, armorValues);
		}
		else if (xelib.GetArmorType(armor) !== "Clothing") {
			logMessage(`Artifact ${artifact} is not recognized`);
		}
	}
	else {
		const clothingMatch = editorID.match(clothingRegex);
		const creatureMatch = editorID.match(creatureRegex);
		const jewelryMatch = editorID.match(jewelryRegex);
		const nullifiedMatch = editorID.match(nullifiedRegex);
		const saddleMatch = editorID.match(saddleRegex);
		if (!clothingMatch && !creatureMatch && !jewelryMatch && !nullifiedMatch && !saddleMatch) {
			logMessage(`EditorID ${editorID} is not recognized`);
		}
	}
	addProgress(1);
}


/**
 * Returns the final armor values for an item.
 * @param {string} type - Heavy or Light.
 * @param {string} set - Name of the set.
 * @param {string} part - Head, Body, Hands, Feet or Shield.
 * @param {string} suffix - Suffix to carry additional information for ambiguous items.
 * @returns {Object} armorValues - If the armor values cannot be determined, null is returned instead.
 * @returns {number} armorValues.armorRating - Armor rating of the item.
 * @returns {number} armorValues.weight - Weight of the item.
 * @returns {number} armorValues.gold - Price of the item.
 */
function GetArmorValues(type, set, part, suffix) {
	const setValues = GetArmorSetValues(type, set, part, suffix);
	if (!setValues) {
		return null;
	}
	const armorValues = {
		armorRating: GetArmorRatingForBodyPart(setValues.armorRating, part),
		weight: GetWeightForBodyPart(setValues.weight, part),
		gold: GetGoldForBodyPart(setValues.gold, part)
	};
	armorValues.armorRating += setValues.offset.armorRating;
	armorValues.weight += setValues.offset.weight;
	armorValues.gold += setValues.offset.gold;
	return armorValues;
}


/**
 * Sets the armor values of an item.
 * @param {object} armor - zEdit handle to the item.
 * @param {Object} values - The armor values of the item.
 * @param {number} values.armorRating - Armor rating of the item.
 * @param {number} values.weight - Weight of the item.
 * @param {number} values.gold - Price of the item.
 */
function SetArmorValues(armor, values) {
	if (values.gold !== xelib.GetGoldValue(armor)) {
		xelib.SetGoldValue(armor, values.gold);
	}
	if (Math.abs(values.weight - xelib.GetWeight(armor)) > 0.001) {
		xelib.SetWeight(armor, values.weight);
	}
	if (Math.abs(values.armorRating - xelib.GetArmorRating(armor)) > 0.001) {
		xelib.SetArmorRating(armor, values.armorRating);
	}
}


/**
 * Returns armor rating for a part of a set.
 * @param {number} setArmorRating - Armor rating of the set.
 * @param {string} part - Head, Body, Hands, Feet or Shield.
 * @returns {number} armorRating - Armor rating of the part or -1 if the part cannot be determined.
 */
function GetArmorRatingForBodyPart(setArmorRating, part) {
	const headArmorRating = Math.round(setArmorRating * headRatio);
	if (part === "Head") {
		return headArmorRating;
	}
	const feetArmorRating = Math.round(setArmorRating * feetRatio);
	if (part === "Feet") {
		return feetArmorRating;
	}
	const handArmorRating = Math.round(setArmorRating * handRatio);
	if (part === "Hands") {
		return handArmorRating;
	}
	const bodyArmorRating = setArmorRating - headArmorRating - feetArmorRating - handArmorRating;
	if (part === "Body") {
		return bodyArmorRating;
	}
	if (part === "Shield") {
		return Math.round(setArmorRating * shieldRatio);
	}
	return -1;
}


/**
 * Returns price for a part of a set.
 * @param {number} setGold - Price of the set.
 * @param {string} part - Head, Body, Hands, Feet or Shield.
 * @returns {number} gold - Price of the part or -1 if the part cannot be determined.
 */
function GetGoldForBodyPart(setGold, part) {
	const headGold = Math.round(setGold * headRatio);
	if (part === "Head") {
		return headGold;
	}
	const feetGold = Math.round(setGold * feetRatio);
	if (part === "Feet") {
		return feetGold;
	}
	const handGold = Math.round(setGold * handRatio);
	if (part === "Hands") {
		return handGold;
	}
	const bodyGold = setGold - headGold - feetGold - handGold;
	if (part === "Body") {
		return bodyGold;
	}
	if (part === "Shield") {
		return Math.round(setGold * shieldRatio);
	}
	return -1;
}


/**
 * Returns weight for a part of a set.
 * @param {number} setWeight - Weight of the set.
 * @param {string} part - Head, Body, Hands, Feet or Shield.
 * @returns {number} weight - Weight of the part or -1 if the part cannot be determined.
 */
function GetWeightForBodyPart(setWeight, part) {
	const headWeight = Math.round(setWeight * headRatio * 2) / 2;
	if (part === "Head") {
		return headWeight;
	}
	const feetWeight = Math.round(setWeight * feetRatio * 2) / 2;
	if (part === "Feet") {
		return feetWeight;
	}
	const handWeight = Math.round(setWeight * handRatio * 2) / 2;
	if (part === "Hands") {
		return handWeight;
	}
	const bodyWeight = setWeight - headWeight - feetWeight - handWeight;
	if (part === "Body") {
		return bodyWeight;
	}
	if (part === "Shield") {
		return Math.round(setWeight * shieldRatio * 2) / 2;
	}
	return -1;
}


/**
 * Returns armor values for the set of an item and the item's offsets relative to the set.
 * Armor values are defined for all armors in base Requiem and any armor added by you.
 * @param {string} type - Heavy or Light.
 * @param {string} set - Name of the set.
 * @param {string} part - Head, Body, Hands, Feet or Shield.
 * @param {string} suffix - Suffix to carry additional information for ambiguous items.
 * @returns {Object} armorValues - If the armor values cannot be determined, null is returned instead.
 * @returns {number} armorValues.armorRating - Armor rating of the set.
 * @returns {number} armorValues.weight - Weight of the set.
 * @returns {number} armorValues.gold - Price of the set.
 * @returns {number} armorValues.offset.armorRating - Armor rating offset of the item.
 * @returns {number} armorValues.offset.weight - Weight offset of the item.
 * @returns {number} armorValues.offset.gold - Price offset of the item.
 */
function GetArmorSetValues(type, set, part, suffix) {
	let setValues = GetArmorSetValuesVariants(type, set, part, suffix);
	if (setValues) {
		return setValues;
	}
	setValues = GetArmorSetValuesBlackMage(type, set, part, suffix);
	if (setValues) {
		return setValues;
	}
	setValues = GetArmorSetValuesCombinedSteel(type, set, part, suffix);
	if (setValues) {
		return setValues;
	}
	setValues = GetArmorSetValuesTheWitcher(type, set, part, suffix);
	if (setValues) {
		return setValues;
	}
	setValues = GetArmorSetValuesUlagsLegacy(type, set, part, suffix);
	if (setValues) {
		return setValues;
	}
	return GetArmorSetValuesBase(type, set, part, suffix);
}


/**
 * Returns armor values for the set of an item and the item's offsets relative to the set.
 * Armor values are defined for all sets in base Requiem.
 * @param {string} type - Heavy or Light.
 * @param {string} set - Name of the set.
 * @param {string} part - Head, Body, Hands, Feet or Shield.
 * @param {string} suffix - Suffix to carry additional information for ambiguous items.
 * @returns {Object} armorValues - If the armor values cannot be determined, null is returned instead.
 * @returns {number} armorValues.armorRating - Armor rating of the set.
 * @returns {number} armorValues.weight - Weight of the set.
 * @returns {number} armorValues.gold - Price of the set.
 * @returns {number} armorValues.offset.armorRating - Armor rating offset of the item.
 * @returns {number} armorValues.offset.weight - Weight offset of the item.
 * @returns {number} armorValues.offset.gold - Price offset of the item.
 */
function GetArmorSetValuesBase(type, set, part, suffix) {
	const setValues = GetBaseSetValues(type, set);
	if (setValues) {
		setValues.offset = GetBaseOffsetValues(type, set, part, suffix);
	}
	return setValues;
}


function GetArmorSetValuesBlackMage(type, set, part, suffix) {
	if (set === "BlackMageLight") {
		const setValues = GetArmorSetValuesBase(type, "Scaled", part, suffix);
		setValues.weight -= 1;
		setValues.gold += 100;
		return setValues;
	}
	else if (set === "BlackMageHeavy") {
		const setValues = GetArmorSetValuesBase(type, "SteelPlate", part, suffix);
		setValues.gold += 200;
		setValues.weight -= 5;
		return setValues;
	}
	else if (set === "BlackArchMageLight") {
		const setValues = GetArmorSetValuesBase(type, "Glass", part, suffix);
		setValues.armorRating += 50;
		setValues.weight -= 3;
		setValues.gold += 4000;
		return setValues;
	}
	else if (set === "BlackArchMageHeavy") {
		const setValues = GetArmorSetValuesBase(type, "Ebony", part, suffix);
		setValues.armorRating += 50;
		setValues.weight -= 10;
		setValues.gold += 7500;
		return setValues;
	}
	return null;
}


function GetArmorSetValuesCombinedSteel(type, set, part, suffix) {
	if (set === "CombinedSteel") {
		return GetArmorSetValuesBase(type, "SteelPlate", part, suffix);
	}
	return null;
}


function GetArmorSetValuesTheWitcher(type, set, part, suffix) {
	if (set === "Ciri") {
		return GetArmorSetValuesBase(type, "Scaled", part, suffix);
	}
	if (set === "Shani") {
		return GetArmorSetValuesBase(type, "Leather", part, suffix);
	}
	if (set === "Triss") {
		return GetArmorSetValuesBase(type, "Elven", part, suffix);
	}
	if (set === "Yennefer") {
		return GetArmorSetValuesBase(type, "Chitin", part, suffix);
	}
	return null;
}


function GetArmorSetValuesUlagsLegacy(type, set, part, suffix) {
	if (set === "Apotheus") {
		let setValues = GetArmorSetValuesBase(type, "Leather", part, suffix);
		setValues.armorRating += 100;
		setValues.gold += 500;
		return setValues;
	}
	if (set === "Blooded") {
		let setValues = GetArmorSetValuesBase(type, "SteelPlate", part, suffix);
		setValues.armorRating += 100;
		setValues.gold += 500;
		return setValues;
	}
	if (set === "Duskward") {
		let setValues = GetArmorSetValuesBase(type, "Guard", part, suffix);
		setValues.armorRating += 100;
		setValues.gold += 500;
		return setValues;
	}
	return null;
}


/**
 * Returns armor values for the set of an item and the item's offsets relative to the sets.
 * Armor values are defined for all variants of sets in base Requiem (e.g. Worn Shrouded Armor).
 * @param {string} type - Heavy or Light.
 * @param {string} set - Name of the set.
 * @param {string} part - Head, Body, Hands, Feet or Shield.
 * @param {string} suffix - Suffix to carry additional information for ambiguous items.
 * @returns {Object} armorValues - If the armor values cannot be determined, null is returned instead.
 * @returns {number} armorValues.armorRating - Armor rating of the set.
 * @returns {number} armorValues.weight - Weight of the set.
 * @returns {number} armorValues.gold - Price of the set.
 * @returns {number} armorValues.offset.armorRating - Armor rating offset of the item.
 * @returns {number} armorValues.offset.weight - Weight offset of the item.
 * @returns {number} armorValues.offset.gold - Price offset of the item.
 */
function GetArmorSetValuesVariants(type, set, part, suffix) {
	if (set === "Dremora") {
		return GetArmorSetValuesBase(type, "Daedric", part, suffix);
	}
	if (set === "Shellbug") {
		return GetArmorSetValuesBase(type, "FalmerHeavy", part, suffix);
	}
	if (set === "Stormcloak") {
		return GetArmorSetValuesBase(type, "Guard", part, suffix);
	}
	if (set === "SummersetShadows") {
		return GetArmorSetValuesBase(type, "ThievesGuild", part, suffix);
	}
	if (set === "ThievesGuildKarliah") {
		return GetArmorSetValuesBase(type, "ThievesGuild", part, suffix);
	}
	if (set === "WornShrouded") {
		return GetArmorSetValuesBase(type, "Shrouded", part, suffix);
	}
	return null;
}


/**
 * Returns the final armor values for an artifact.
 * Armor values are defined for all artifacts in base Requiem.
 * @param {string} artifact - Name of the artifact without whitespaces and apostrophes.
 * @returns {Object} armorValues - If the armor values cannot be determined, null is returned instead.
 * @returns {number} armorValues.armorRating - Armor rating of the item.
 * @returns {number} armorValues.weight - Weight of the item.
 * @returns {number} armorValues.gold - Price of the item.
 */
function GetArtifactValues(artifact) {
	if (artifact === "AetherialShield") {
		const armorValues = GetArmorValues("Heavy", "Aetherium", "Shield");
		armorValues.gold = 50000;
		return armorValues;
	}
	if (artifact === "AurielsShield") {
		const armorValues = GetArmorValues("Light", "SnowElf", "Shield");
		armorValues.gold = 100000;
		return armorValues;
	}
	if (artifact === "DawnguardRuneShield") {
		return GetArmorValues("Heavy", "Dawnguard", "Shield");
	}
	if (artifact === "EbonyMail") {
		const armorValues = GetArmorValues("Heavy", "Ebony", "Body");
		armorValues.gold = 100000;
		return armorValues;
	}
	if (artifact === "HelmOfYngol") {
		const armorValues = GetArmorValues("Heavy", "AncientNord", "Head");
		armorValues.gold = 1000;
		return armorValues;
	}
	if (artifact === "JaggedCrown") {
		const armorValues =  GetArmorValues("Heavy", "Dragonplate", "Head");
		armorValues.weight -= 4;
		armorValues.gold = 5000;
		return armorValues;
	}
	if (artifact === "SaviorsHide") {
		const armorValues = GetArmorValues("Light", "Scaled", "Body");
		armorValues.gold = 100000;
		return armorValues;
	}
	if (artifact === "ShieldOfSolitude") {
		const armorValues = GetArmorValues("Light", "Guard", "Shield");
		armorValues.gold = 5000;
		armorValues.armorRating += 25;
		return armorValues;
	}
	if (artifact === "ShieldOfYsgramor") {
		const armorValues = GetArmorValues("Heavy", "Ebony", "Shield");
		armorValues.gold = 50000;
		return armorValues;
	}
	if (artifact === "Spellbreaker") {
		const armorValues = GetArmorValues("Heavy", "Dwarven", "Shield");
		armorValues.armorRating += 50;
		armorValues.gold = 100000;
		return armorValues;
	}
	if (artifact === "TargeOfTheBlooded") {
		const armorValues = GetArmorValues("Heavy", "Steel", "Shield");
		armorValues.gold = 300;
		return armorValues;
	}
	return null;
}


/**
 * Returns armor values for the set of an item.
 * Armor values are defined for all sets in base Requiem.
 * @param {string} type - Heavy or Light.
 * @param {string} set - Name of the set.
 * @returns {Object} armorValues - If the armor values cannot be determined, null is returned instead.
 * @returns {number} armorValues.armorRating - Armor rating of the item.
 * @returns {number} armorValues.weight - Weight of the item.
 * @returns {number} armorValues.gold - Price of the item.
 */
function GetBaseSetValues(type, set) {
	if (type === "Heavy") {
		if (set === "Aetherium") {
			return {armorRating: 900, weight: 75, gold: 50000};
		}
		else if (set === "AncientNord") {
			return {armorRating: 550, weight: 40, gold: 300};
		}
		else if (set === "Blades") {
			return {armorRating: 700, weight: 55, gold: 2500};
		}
		else if (set === "Chitin") {
			return {armorRating: 600, weight: 35, gold: 1000};
		}
		else if (set === "Daedric") {
			return {armorRating: 1200, weight: 100, gold: 50000};
		}
		else if (set === "Dawnguard") {
			return {armorRating: 720, weight: 60, gold: 1000};
		}
		else if (set === "Dragonplate") {
			return {armorRating: 900, weight: 65, gold: 20000};
		}
		else if (set === "Dwarven") {
			return {armorRating: 780, weight: 70, gold: 2000};
		}
		else if (set === "Ebony") {
			return {armorRating: 900, weight: 75, gold: 10000};
		}
		else if (set === "Falmer") {
			return {armorRating: 600, weight: 40, gold: 100};
		}
		else if (set === "FalmerHardened") {
			return {armorRating: 720, weight: 60, gold: 400};
		}
		else if (set === "FalmerHeavy") {
			return {armorRating: 720, weight: 60, gold: 400};
		}
		else if (set === "Guard") {
			return {armorRating: 600, weight: 50, gold: 500};
		}
		else if (set === "Imperial") {
			return {armorRating: 600, weight: 50, gold: 500};
		}
		else if (set === "Iron") {
			return {armorRating: 510, weight: 40, gold: 250};
		}
		else if (set === "Nordic") {
			return {armorRating: 720, weight: 60, gold: 1000};
		}
		else if (set === "Orcish") {
			return {armorRating: 720, weight: 60, gold: 1500};
		}
		else if (set === "Steel") {
			return {armorRating: 600, weight: 50, gold: 500};
		}
		else if (set === "StormcloakOfficer") {
			return {armorRating: 600, weight: 50, gold: 500};
		}
		else if (set === "SteelPlate") {
			return {armorRating: 720, weight: 60, gold: 1000};
		}
		else if (set === "Ulfric") {
			return {armorRating: 720, weight: 60, gold: 5000};
		}
		else if (set === "Vigilant") {
			return {armorRating: 720, weight: 60, gold: 1000};
		}
		else if (set === "Wolf") {
			return {armorRating: 720, weight: 50, gold: 1000};
		}
	}
	else if (type === "Light") {
		if (set === "Alikr") {
			return {armorRating: 300, weight: 12, gold: 300};
		}
		else if (set === "AncientShrouded") {
			return {armorRating: 360, weight: 12, gold: 400};
		}
		else if (set === "Chitin") {
			return {armorRating: 360, weight: 15, gold: 800};
		}
		else if (set === "Dawnguard") {
			return {armorRating: 360, weight: 15, gold: 600};
		}
		else if (set === "Dragonscale") {
			return {armorRating: 480, weight: 20, gold: 16000};
		}
		else if (set === "Elven") {
			return {armorRating: 360, weight: 15, gold: 800};
		}
		else if (set === "Forsworn") {
			return {armorRating: 250, weight: 10, gold: 100};
		}
		else if (set === "Fur") {
			return {armorRating: 250, weight: 10, gold: 100};
		}
		else if (set === "Glass") {
			return {armorRating: 480, weight: 15, gold: 6000};
		}
		else if (set === "Guard") {
			return {armorRating: 360, weight: 15, gold: 400};
		}
		else if (set === "Hide") {
			return {armorRating: 230, weight: 8, gold: 80};
		}
		else if (set === "Imperial") {
			return {armorRating: 300, weight: 12, gold: 200};
		}
		else if (set === "Leather") {
			return {armorRating: 300, weight: 12, gold: 200};
		}
		else if (set === "Linwe") {
			return {armorRating: 300, weight: 12, gold: 200};
		}
		else if (set === "Nightingale") {
			return {armorRating: 360, weight: 12, gold: 10000};
		}
		else if (set === "PenitusOculatus") {
			return {armorRating: 360, weight: 12, gold: 600};
		}
		else if (set === "Scaled") {
			return {armorRating: 360, weight: 15, gold: 400};
		}
		else if (set === "Shrouded") {
			return {armorRating: 300, weight: 12, gold: 200};
		}
		else if (set === "SnowElf") {
			return {armorRating: 480, weight: 15, gold: 8000};
		}
		else if (set === "ThievesGuild") {
			return {armorRating: 300, weight: 12, gold: 200};
		}
		else if (set === "ThievesGuildMaster") {
			return {armorRating: 360, weight: 12, gold: 1000};
		}
		else if (set === "Vampire") {
			return {armorRating: 300, weight: 12, gold: 200};
		}
	}
	return null;
}


/**
 * Returns armor values for the offsets of an item relative to its set.
 * Armor values are defined for all items in base Requiem.
 * @param {string} type - Heavy or Light.
 * @param {string} set - Name of the set.
 * @param {string} part - Head, Body, Hands, Feet or Shield.
 * @param {string} suffix - Suffix to carry additional information for ambiguous items.
 * @returns {Object} offset
 * @returns {number} offset.armorRating - Armor rating of the item.
 * @returns {number} offset.weight - Weight of the item.
 * @returns {number} offset.gold - Price of the item.
 */
function GetBaseOffsetValues(type, set, part, suffix) {
	if (type === "Heavy") {
		if (set === "Guard") {
			if (part === "Body") {
				if (suffix === "TheReach") {
					return {armorRating: 50, weight: 5, gold: 150};
				}
				if (suffix === "Hjaalmarch") {
					return {armorRating: -50, weight: -5, gold: -100};
				}
				if (suffix === "ThePale") {
					return {armorRating: -50, weight: -5, gold: -100};
				}
				if (suffix === "TheRift") {
					return {armorRating: -50, weight: -5, gold: -100};
				}
				if (suffix === "Winterhold") {
					return {armorRating: -50, weight: -5, gold: -100};
				}
			}
		}
		else if (set === "Iron") {
			if (part === "Body") {
				if (suffix === "Pauldrons") {
					return {armorRating: 30, weight: 2.5, gold: 75};
				}
			}
			else if (part === "Shield") {
				if (suffix === "Banded") {
					return {armorRating: 10, weight: 2, gold: 40};
				}
			}
		}
		else if (set === "Orcish") {
			if (part === "Shield") {
				return {armorRating: 5, weight: 1, gold: 0};
			}
		}
	}
	else if (type === "Light") {
		if (set === "Chitin") {
			if (part === "Shield") {
				return {armorRating: 5, weight: 2, gold: 0};
			}
		}
		else if (set === "Guard") {
			if (part === "Body") {
				return {armorRating: 0, weight: 5, gold: 50};
			}
			if (part === "Shield") {
				return {armorRating: -15, weight: -1, gold: -50};
			}
		}
		else if (set === "Hide") {
			if (part === "Body") {
				if (suffix === "Studded") {
					return {armorRating: 40, weight: 3, gold: 25};
				}
			}
		}
		else if (set === "Imperial") {
			if (part === "Body") {
				if (suffix === "Studded") {
					return {armorRating: 25, weight: 1, gold: 25};
				}
				if (suffix === "Tullius") {
					return {armorRating: 50, weight: 0, gold: 3000};
				}
			}
		}
		else if (set === "Vampire") {
			if (part === "Body") {
				if (suffix === "Royal" || suffix === "Valerica") {
					return {armorRating: 60, weight: 3, gold: 500};
				}
			}
		}
	}
	return {armorRating: 0, weight: 0, gold: 0};
}
