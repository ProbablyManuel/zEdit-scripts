const scriptPath = `${xelib.GetGlobal("ProgramPath")}\\scripts\\`;
const Database = require(`${scriptPath}Database.js`);
const TTLib = require(`${scriptPath}TT Library.js`);

const selected = zedit.GetSelectedRecords("ARMO");

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

for (const armor of selected) {
	const editorID = xelib.EditorID(armor);
	const regex = /[^_]+(?:_(?:Ench|NonPlayable|Variant))?_([^_]+)_([^_]+)_([^_]+)(?:_(.+))?/
	const match = editorID.match(regex);
	if (match) {
		const type = match[1]
		const set = match[2];
		const part = match[3];
		const suffix = match[4];
		// Values for the whole set
		let armorRating = 0.0;
		let weight = 0.0;
		let gold = 0;
		// Offsets for this particular item
		let armorRatingOffset = 0.0;
		let weightOffset = 0.0;
		let goldOffset = 0;
	
		let baseSet = "";
		if (set === "Apotheus") {
			baseSet = "Leather";
			armorRating += 100;
			gold += 500;
		}
		else if (set === "BlackMageLight") {
			baseSet = "Scaled";
			weight -= 1.0;
			gold += 100;
		}
		else if (set === "BlackMageHeavy") {
			baseSet = "SteelPlate";
			gold += 200;
			weight -= 5.0;
		}
		else if (set === "BlackArchMageLight") {
			baseSet = "Glass";
			armorRating += 50.0;
			weightMult -= 3.0;
			gold += 4000;
		}
		else if (set === "BlackArchMageHeavy") {
			baseSet = "Ebony";
			armorRating += 50.0;
			weight -= 10.0;
			gold += 7500;
		}
		else if (set === "BretonKnight") {
			baseSet = "Elven";
		}
		else if (set === "Blooded") {
			baseSet = "SteelPlate";
			armorRating += 100.0;
			gold += 500;
		}
		else if (set === "CombinedSteel") {
			baseSet = "SteelPlate";
		}
		else if (set === "Ciri") {
			baseSet = "Scaled";
		}
		else if (set === "Dremora") {
			baseSet = "Daedric";
		}
		else if (set === "Duskward") {
			baseSet = "Guard";
			armorRating += 100.0;
			goldOffset += 500;
		}
		else if (set === "ESONord") {
			baseSet = "Steel";
		}
		else if (set === "Hermit") {
			baseSet = "Leather";
		}
		else if (set === "Housecarl") {
			baseSet = "SteelPlate";
			gold += 500;
		}
		else if (set === "Intrigue") {
			baseSet = "Leather";
		}
		else if (set === "NordBattlemage") {
			baseSet = "SteelPlate";
		}
		else if (set === "NordMage") {
			baseSet = "Scaled";
		}
		else if (set === "Shani") {
			baseSet = "Leather";
		}
		else if (set === "Stormcloak") {
			baseSet = "Guard";
		}
		else if (set === "SummersetShadows") {
			baseSet = "ThievesGuild";
		}
		else if (set === "ThievesGuildKarliah") {
			baseSet = "ThievesGuild";
		}
		else if (set === "Thief") {
			baseSet = "Leather";
		}
		else if (set === "Triss") {
			baseSet = "Elven";
		}
		else if (set === "Wayfarer") {
			baseSet = "Leather";
		}
		else if (set === "WornShrouded") {
			baseSet = "Shrouded";
		}
		else if (set === "Yennefer") {
			baseSet = "Chitin";
		}
		else {
			baseSet = set;
		}

		if (type === "Heavy") {
			if (baseSet === "Aetherium") {
				armorRating += 750.0;
				weight += 75.0;
				gold += 25000;
			}
			else if (baseSet === "AncientNord") {
				armorRating += 450.0;
				weight += 45.0;
				gold += 300;
			}
			else if (baseSet === "Blades") {
				armorRating += 550.0;
				weight += 55.0;
				gold += 2500;
			}
			else if (baseSet === "Chitin") {
				armorRating += 500.0;
				weight += 35.0;
				gold += 1000;
			}
			else if (baseSet === "Daedric") {
				armorRating += 1000.0;
				weight += 100.0;
				gold += 50000;
			}
			else if (baseSet === "Dawnguard") {
				armorRating += 600.0;
				weight += 60.0;
				gold += 1000;
			}
			else if (baseSet === "Dragonplate") {
				armorRating += 750.0;
				weight += 65.0;
				gold += 20000;
			}
			else if (baseSet === "Dwarven") {
				armorRating += 650.0;
				weight += 70.0;
				gold += 2000;
			}
			else if (baseSet === "Ebony") {
				armorRating += 750.0;
				weight += 80.0;
				gold += 10000;
			}
			else if (baseSet === "Falmer") {
				armorRating += 475.0;
				weight += 45.0;
				gold += 100;
			}
			else if (baseSet === "FalmerHardened") {
				armorRating += 600.0;
				weight += 60.0;
				gold += 400;
			}
			else if (baseSet === "FalmerHeavy") {
				armorRating += 600.0;
				weight += 60.0;
				gold += 400;
			}
			else if (baseSet === "Guard") {
				armorRating += 500.0;
				weight += 50.0;
				gold += 500;
				if (part === "Body") {
					goldOffset += 100;
					if (suffix === "TheReach") {
						armorRatingOffset += 25.0;
						weightOffset += 5.0;
						goldOffset += 50;
					}
					else if (suffix === "Hjaalmarch") {
						armorRatingOffset -= 25.0;
						weightOffset -= 5.0;
						goldOffset -= 50;
					}
					else if (suffix === "ThePale") {
						armorRatingOffset -= 25.0;
						weightOffset -= 5.0;
						goldOffset -= 50;
					}
					else if (suffix === "TheRift") {
						armorRatingOffset -= 25.0;
						weightOffset -= 5.0;
						goldOffset -= 50;
					}
					else if (suffix === "Winterhold") {
						armorRatingOffset -= 25.0;
						weightOffset -= 5.0;
						goldOffset -= 50;
					}
				}
			}
			else if (baseSet === "Imperial") {
				armorRating += 500.0;
				weight += 50.0;
				gold += 500;
			}
			else if (baseSet === "Iron") {
				armorRating += 425.0;
				weight += 40.0;
				gold += 250;
				if (suffix === "Pauldrons") {
					armorRatingOffset += 25.0;
					weightOffset += 2.5;
					goldOffset += 75;
				}
			}
			else if (baseSet === "Nordic") {
				armorRating += 600.0;
				weight += 60.0;
				gold += 1000;
			}
			else if (baseSet === "Orcish") {
				armorRating += 600.0;
				weight += 60.0;
				gold += 1500;
			}
			else if (baseSet === "Steel") {
				armorRating += 500.0;
				weight += 50.0;
				gold += 500;
			}
			else if (baseSet === "StormcloakOfficer") {
				armorRating += 500.0;
				weight += 50.0;
				gold += 500;
			}
			else if (baseSet === "SteelPlate") {
				armorRating += 600.0;
				weight += 60.0;
				gold += 1000;
			}
			else if (baseSet === "Ulfric") {
				armorRating += 600.0;
				weight += 60.0;
				gold += 5000;
			}
			else if (baseSet === "Vigilant") {
				armorRating += 600.0;
				weight += 60.0;
				gold += 1000;
			}
			else if (baseSet === "Wolf") {
				armorRating += 600.0;
				weight += 55.0;
				gold += 1000;
			}
			else if (baseSet !== "NULL") {
				logMessage(`${xelib.LongName(armor)} doesn't have a known set`);
			}
		}
		else if (type === "Light") {
			if (baseSet === "AncientShrouded") {
				armorRating += 300.0;
				weight += 12.0;
				gold += 400;
			}
			else if (baseSet === "Chitin") {
				armorRating += 300.0;
				weight += 15.0;
				gold += 800;
			}
			else if (baseSet === "Dawnguard") {
				armorRating += 300.0;
				weight += 15.0;
				gold += 400;
			}
			else if (baseSet === "Dragonscale") {
				armorRating += 400.0;
				weight += 20.0;
				gold += 16000;
			}
			else if (baseSet === "Elven") {
				armorRating += 300.0;
				weight += 15.0;
				gold += 800;
			}
			else if (baseSet === "Forsworn") {
				armorRating += 210.0;
				weight += 10.0;
				gold += 100;
			}
			else if (baseSet === "Fur") {
				armorRating += 210.0;
				weight += 10.0;
				gold += 100;
			}
			else if (baseSet === "Glass") {
				armorRating += 400.0;
				weight += 15.0;
				gold += 6000;
			}
			else if (baseSet === "Guard") {
				armorRating += 300.0;
				weight += 15.0;
				gold += 400;
				if (part === "Body") {
					weightOffset += 5.0;
					goldOffset += 50;
				}
			}
			else if (baseSet === "Hide") {
				armorRating += 190.0;
				weight += 8.0;
				gold += 80;
				if (suffix === "Studded") {
					armorRatingOffset += 35.0;
					weightOffset += 3.0;
					goldOffset += 25;
				}
			}
			else if (baseSet === "Imperial") {
				armorRating += 250.0;
				weight += 12.0;
				gold += 200;
				if (suffix === "Studded") {
					armorRatingOffset += 25.0;
				}
			}
			else if (baseSet === "Leather") {
				armorRating += 250.0;
				weight += 12.0;
				gold += 200;
			}
			else if (baseSet === "Linwe") {
				armorRating += 250.0;
				weight += 12.0;
				gold += 200;
			}
			else if (baseSet === "Nightingale") {
				armorRating += 400.0;
				weight += 12.0;
				gold += 10000;
			}
			else if (baseSet === "PenitusOculatus") {
				armorRating += 300.0;
				weight += 12.0;
				gold += 600;
			}
			else if (baseSet === "Scaled") {
				armorRating += 300.0;
				weight += 15.0;
				gold += 400;
			}
			else if (baseSet === "Shrouded") {
				armorRating += 250.0;
				weight += 12.0;
				gold += 200;
			}
			else if (baseSet === "SnowElf") {
				armorRating += 400.0;
				weight += 15.0;
				gold += 8000;
			}
			else if (baseSet === "ThievesGuild") {
				armorRating += 250.0;
				weight += 12.0;
				gold += 200;
			}
			else if (baseSet === "ThievesGuildMaster") {
				armorRating += 300.0;
				weight += 12.0;
				gold += 1000;
			}
			else if (baseSet === "Vampire") {
				armorRating += 250.0;
				weight += 12.0;
				gold += 200;
				if (suffix === "Royal" || suffix === "Valerica") {
					armorRatingOffset += 50;
					weightOffset += 3.0;
					goldOffset += 500;
				}
			}
			else if (baseSet !== "NULL") {
				logMessage(`${xelib.LongName(armor)} doesn't have a known set`);
			}
		}
		else if (type !== "Clothing") {
			logMessage(`${xelib.LongName(armor)} doesn't have a valid armor type`);
		}
	
		let newVal = GetGoldForBodyPart(gold, part) + goldOffset;
		if (newVal !== xelib.GetGoldValue(armor)) {
			xelib.SetGoldValue(armor, newVal);
		}
		newVal = GetWeightForBodyPart(weight, part) + weightOffset;
		if (Math.abs(newVal - xelib.GetWeight(armor)) > 0.001) {
			xelib.SetWeight(armor, newVal);
		}
		newVal = GetArmorRatingForBodyPart(armorRating, part) + armorRatingOffset;
		newVal = GetFinalArmorRating(newVal, armor);
		if (Math.abs(newVal - xelib.GetArmorRating(armor)) > 0.001)  {
			xelib.SetArmorRating(armor, newVal);
		}
	}
	else {
		logMessage(`${xelib.LongName(armor)} doesn't have a matching EditorID`);
	}
	addProgress(1);
}


function GetArmorRatingForBodyPart(armorRating, part) {
	part = part.toLowerCase();
	headArmorRating = Math.round(armorRating * headRatio);
	if (part === "head") {
		return headArmorRating;
	}
	feetArmorRating = Math.round(armorRating * feetRatio);
	if (part === "feet") {
		return feetArmorRating;
	}
	handArmorRating = Math.round(armorRating * handRatio);
	if (part === "hands") {
		return handArmorRating;
	}
	bodyArmorRating = armorRating - headArmorRating - feetArmorRating - handArmorRating;
	if (part === "body") {
		return bodyArmorRating;
	}
	if (part === "shield") {
		shieldArmorRating = Math.round(armorRating * shieldRatio);
		return shieldArmorRating;
	}
	return -1;
}

function GetGoldForBodyPart(gold, part) {
	part = part.toLowerCase();
	headGold = Math.round(gold * headRatio);
	if (part === "head") {
		return headGold;
	}
	feetGold = Math.round(gold * feetRatio);
	if (part === "feet") {
		return feetGold;
	}
	handGold = Math.round(gold * handRatio);
	if (part === "hands") {
		return handGold;
	}
	bodyGold = gold - headGold - feetGold - handGold;
	if (part === "body") {
		return bodyGold;
	}
	if (part === "shield") {
		shieldGold = Math.round(gold * shieldRatio);
		return shieldGold;
	}
	return -1;
}

function GetWeightForBodyPart(weight, part) {
	part = part.toLowerCase();
	headWeight = Math.round(weight * headRatio * 2) / 2;
	if (part === "head") {
		return headWeight;
	}
	feetWeight = Math.round(weight * feetRatio * 2) / 2;
	if (part === "feet") {
		return feetWeight;
	}
	handWeight = Math.round(weight * handRatio * 2) / 2;
	if (part === "hands") {
		return handWeight;
	}
	bodyWeight = weight - headWeight - feetWeight - handWeight;
	if (part === "body") {
		return bodyWeight;
	}
	if (part === "shield") {
		shieldWeight = Math.round(weight * shieldRatio * 2) / 2;
		return shieldWeight;
	}
	return -1.0;
}

function GetFinalArmorRating(armorRating, armor) {
	finalArmorRating = armorRating;
	if (xelib.HasKeyword(armor, "ArmorCuirass")) {
		finalArmorRating -= 55;
	}
	else {
		finalArmorRating -= 15;
	}
	armorType = xelib.GetArmorType(armor);
	if (armorType === "Heavy Armor") {
		finalArmorRating /= 5.5;
	}
	else if (armorType === "Light Armor") {
		finalArmorRating /= 2.75;
	}
	else {
		finalArmorRating = -1.0;
	}
	finalArmorRating = Math.ceil(finalArmorRating * 100) / 100;
	return finalArmorRating;
}