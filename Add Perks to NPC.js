const scriptPath = `${xelib.GetGlobal("ProgramPath")}\\scripts\\`;
const Database = require(`${scriptPath}Database.js`);
const TTLib = require(`${scriptPath}TT Library.js`);

const npcs = zedit.GetSelectedRecords("NPC_");

const {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
	determinate: true,
	title: "Add Perks to NPCs",
	message : "",
	canClose: true,
	current: 0,
	max: npcs.length
});

const skills = [
	"Alchemy",
	"Alteration",
	"Block",
	"Conjuration",
	"Destruction",
	"Enchanting",
	"Light Armor",
	"Heavy Armor",
	"Illusion",
	"Lockpicking",
	"Archery",
	"One-Handed",
	"Pickpocket",
	"Restoration",
	"Smithing",
	"Sneak",
	"Speech",
	"Two-Handed"
]

for (const npc of npcs) {
	let inheritsPerks = xelib.HasElement(npc, "TPLT - Template") && xelib.GetFlag(npc, "ACBS\\Template Flags", "Use Spell List");
	if (!inheritsPerks) {
		for (const skill of skills) {
			AddPerks(npc, skill);
		}
	}
	addProgress(1);
}


function AddPerks(npc, skill) {
	const perks = Database.PerksBySkill(skill);
	const skillLevel = TTLib.GetActorSkill(npc, skill);
	if (skillLevel > 5) {
		for (const perk of perks) {
			const requiredSkill = TTLib.GetPerkRequiredSkill(perk, skill);
			if (requiredSkill === -1) {
				logMessage(`Failed to get required skill level for ${xelib.LongName(perk)}`);
			}
			else if (skillLevel >= requiredSkill) {
				const perkHexFormID = xelib.GetHexFormID(perk);
				if (!xelib.HasPerk(npc, perkHexFormID)) {
					xelib.AddPerk(npc, perkHexFormID,  "1");
				}
			}
		}
	}
}
