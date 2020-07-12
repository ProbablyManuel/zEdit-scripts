const armors = xelib.GetRecords(0, "ARMO", false);

const {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
	determinate: true,
	title: "Requiem Armor Patcher",
	message : "",
	canClose: true,
	current: 0,
	max: armors.length
});

const minFactor = 1.0;
const maxFactor = 1.0;

let maxHeavyHelmet = Number.MIN_VALUE;
let maxHeavyCuirass = Number.MIN_VALUE;
let maxHeavyGauntlets = Number.MIN_VALUE;
let maxHeavyBoots = Number.MIN_VALUE;
let maxHeavyShield = Number.MIN_VALUE;
let maxLightHelmet = Number.MIN_VALUE;
let maxLightCuirass = Number.MIN_VALUE;
let maxLightGauntlets = Number.MIN_VALUE;
let maxLightBoots = Number.MIN_VALUE;
let maxLightShield = Number.MIN_VALUE;

let minHeavyHelmet = Number.MAX_VALUE;
let minHeavyCuirass = Number.MAX_VALUE;
let minHeavyGauntlets = Number.MAX_VALUE;
let minHeavyBoots = Number.MAX_VALUE;
let minHeavyShield = Number.MAX_VALUE;
let minLightHelmet = Number.MAX_VALUE;
let minLightCuirass = Number.MAX_VALUE;
let minLightGauntlets = Number.MAX_VALUE;
let minLightBoots = Number.MAX_VALUE;
let minLightShield = Number.MAX_VALUE;

const nullifiedRegex = /^[^_]+_NULL_.+$/

for (const armorAny of armors) {
	const armor = xelib.GetWinningOverride(armorAny);
	const armorEditorID = xelib.EditorID(armor);
	const hasTemplate = xelib.HasElement(armor, "TNAM");
	if (!hasTemplate && !nullifiedRegex.test(armorEditorID)) {
		const armorRating = xelib.GetArmorRating(armor);
		const armorType = xelib.GetArmorType(armor);
		if (armorType === "Heavy Armor") {
			if (xelib.HasKeyword(armor, "ArmorHelmet")) {
				maxHeavyHelmet = Math.max(maxHeavyHelmet, armorRating);
				minHeavyHelmet = Math.min(minHeavyHelmet, armorRating);
				if (armorRating > 23 * 1.5) {
					logMessage(`${xelib.LongName(armor)}`);
				}
			}
			else if (xelib.HasKeyword(armor, "ArmorCuirass")) {
				maxHeavyCuirass = Math.max(maxHeavyCuirass, armorRating);
				minHeavyCuirass = Math.min(minHeavyCuirass, armorRating);
				if (armorRating > 49 * 1.5) {
					logMessage(`${xelib.LongName(armor)}`);
				}
			}
			else if (xelib.HasKeyword(armor, "ArmorGauntlets")) {
				maxHeavyGauntlets = Math.max(maxHeavyGauntlets, armorRating);
				minHeavyGauntlets = Math.min(minHeavyGauntlets, armorRating);
				if (armorRating > 18 * 1.5) {
					logMessage(`${xelib.LongName(armor)}`);
				}
			}
			else if (xelib.HasKeyword(armor, "ArmorBoots")) {
				maxHeavyBoots = Math.max(maxHeavyBoots, armorRating);
				minHeavyBoots = Math.min(minHeavyBoots, armorRating);
				if (armorRating > 18 * 1.5) {
					logMessage(`${xelib.LongName(armor)}`);
				}
			}
			else if (xelib.HasKeyword(armor, "ArmorShield")) {
				maxHeavyShield = Math.max(maxHeavyShield, armorRating);
				minHeavyShield = Math.min(minHeavyShield, armorRating);
				if (armorRating > 36 * 1.5) {
					logMessage(`${xelib.LongName(armor)}`);
				}
			}
		}
		else if (armorType === "Light Armor") {
			if (xelib.HasKeyword(armor, "ArmorHelmet")) {
				maxLightHelmet = Math.max(maxLightHelmet, armorRating);
				minLightHelmet = Math.min(minLightHelmet, armorRating);
				if (armorRating > 17 * 1.5) {
					logMessage(`${xelib.LongName(armor)}`);
				}
			}
			else if (xelib.HasKeyword(armor, "ArmorCuirass")) {
				maxLightCuirass = Math.max(maxLightCuirass, armorRating);
				minLightCuirass = Math.min(minLightCuirass, armorRating);
				if (armorRating > 41 * 1.5) {
					logMessage(`${xelib.LongName(armor)}`);
				}
			}
			else if (xelib.HasKeyword(armor, "ArmorGauntlets")) {
				maxLightGauntlets = Math.max(maxLightGauntlets, armorRating);
				minLightGauntlets = Math.min(minLightGauntlets, armorRating);
				if (armorRating > 12 * 1.5) {
					logMessage(`${xelib.LongName(armor)}`);
				}
			}
			else if (xelib.HasKeyword(armor, "ArmorBoots")) {
				maxLightBoots = Math.max(maxLightBoots, armorRating);
				minLightBoots = Math.min(minLightBoots, armorRating);
				if (armorRating > 12 * 1.5) {
					logMessage(`${xelib.LongName(armor)}`);
				}
			}
			else if (xelib.HasKeyword(armor, "ArmorShield")) {
				maxLightShield = Math.max(maxLightShield, armorRating);
				minLightShield = Math.min(minLightShield, armorRating);
				if (armorRating > 29 * 1.5) {
					logMessage(`${xelib.LongName(armor)}`);
				}
			}
		}
	}
	addProgress(1);
}

logMessage(`Max Heavy Helmet: ${maxHeavyHelmet * maxFactor}`);
logMessage(`Max Heavy Cuirass: ${maxHeavyCuirass * maxFactor}`);
logMessage(`Max Heavy Gauntlets: ${maxHeavyGauntlets * maxFactor}`);
logMessage(`Max Heavy Boots: ${maxHeavyBoots * maxFactor}`);
logMessage(`Max Heavy Shield: ${maxHeavyShield * maxFactor}`);
logMessage(`Max Light Helmet: ${maxLightHelmet * maxFactor}`);
logMessage(`Max Light Cuirass: ${maxLightCuirass * maxFactor}`);
logMessage(`Max Light Gauntlets: ${maxLightGauntlets * maxFactor}`);
logMessage(`Max Light Boots: ${maxLightBoots * maxFactor}`);
logMessage(`Max Light Shield: ${maxLightShield * maxFactor}`);

logMessage(`Min Heavy Helmet: ${minHeavyHelmet * minFactor}`);
logMessage(`Min Heavy Cuirass: ${minHeavyCuirass * minFactor}`);
logMessage(`Min Heavy Gauntlets: ${minHeavyGauntlets * minFactor}`);
logMessage(`Min Heavy Boots: ${minHeavyBoots * minFactor}`);
logMessage(`Min Heavy Shield: ${minHeavyShield * minFactor}`);
logMessage(`Min Light Helmet: ${minLightHelmet * minFactor}`);
logMessage(`Min Light Cuirass: ${minLightCuirass * minFactor}`);
logMessage(`Min Light Gauntlets: ${minLightGauntlets * minFactor}`);
logMessage(`Min Light Boots: ${minLightBoots * minFactor}`);
logMessage(`Min Light Shield: ${minLightShield * minFactor}`);
