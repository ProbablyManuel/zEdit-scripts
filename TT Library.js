module.exports = {
	BodyPartToArmorPart: function(str) {
		str = str.toLowerCase();
		switch (str) {
			case "head": return "Helmet"; 
			case "body": return "Cuirass"; 
			case "hand": return "Gauntlets"; 
			case "feet": return "Boots"; 
			default: return str;
		}
	},

	GetSetFromEditorID: function(str) {
		return GetTextBetween(str, '_');
	},

	GetBodyPartFromEditorID: function(str) {
		str = str.slice(str.indexOf('_') + 1);
		bodyPart = GetTextBetween(str, '_');
		if (bodyPart === "") {
			return str.slice(str.indexOf('_') + 1);
		}
		return bodyPart;
	},

	GetWeaponTypeFromEditorID: function(str) {
		str = str.slice(str.indexOf('_') + 1);
		armorPart = GetTextBetween(str, '_');
		if (armorPart === "") {
			return str.slice(str.indexOf('_') + 1);
		}
		return armorPart;
	},

	GetArmorPart: function(armor) {
		if (xelib.HasKeyword(armor, "ArmorBoots")) {
			return "Boots";
		}
		else if (xelib.HasKeyword(armor, "ArmorCuirass")) {
			return "Cuirass";
		}
		else if (xelib.HasKeyword(armor, "ArmorGauntlets")) {
			return "Gauntlets";
		}
		else if (xelib.HasKeyword(armor, "ArmorHelmet")) {
			return "Helmet";
		}
		else if (xelib.HasKeyword(armor, "ArmorShield")) {
			return "Shield";
		}
		else {
			return "";
		}
	},

	GetWeaponType: function(weapon) {
		if (xelib.HasKeyword(weapon, "WeapTypeBattleaxe")) {
			return "Battleaxe";
		}
		else if (xelib.HasKeyword(weapon, "WeapTypeBow")) {
			return "Bow";
		}
		else if (xelib.HasKeyword(weapon, "WeapTypeDagger")) {
			return "Dagger";
		}
		else if (xelib.HasKeyword(weapon, "WeapTypeGreatsword")) {
			return "Greatsword";
		}
		else if (xelib.HasKeyword(weapon, "WeapTypeMace")) {
			return "Mace";
		}
		else if (xelib.HasKeyword(weapon, "WeapTypeSword")) {
			return "Sword";
		}
		else if (xelib.HasKeyword(weapon, "WeapTypeWarAxe")) {
			return "WarAxe";
		}
		else if (xelib.HasKeyword(weapon, "WeapTypeWarhammer")) {
			return "Warhammer";
		}
		else {
			return "";
		}
	},

	GetCriticalDamage: function(record) {
		return xelib.GetUIntValue(record, "CRDT\\Damage");
	},

	SetCriticalDamage: function(record, value) {
		return xelib.SetUIntValue(record, "CRDT\\Damage", value);
	},

	GetWeaponSpeed: function(record) {
		return xelib.GetFloatValue(record, "DNAM\\Speed");
	},

	SetWeaponSpeed: function(record, value) {
		return xelib.SetFloatValue(record, "DNAM\\Speed", value);
	},

	GetWeaponReach: function(record) {
		return xelib.GetFloatValue(record, "DNAM\\Reach");
	},

	SetWeaponReach: function(record, value) {
		return xelib.SetFloatValue(record, "DNAM\\Reach", value);
	}
};

function GetTextBetween(str, delimiter) {
	let firstIndex = -1;
	let secondIndex = -1;
	for (let i = 0; i < str.length; i++) {
		if (str.charAt(i) === delimiter) {
			if (firstIndex === -1) {
				firstIndex = i;
			}
			else if (secondIndex === -1) {
				secondIndex = i;
			}
		}
	}
	if (firstIndex === -1 || secondIndex === -1) {
		return "";
	}
	return str.substring(firstIndex + 1, secondIndex);
}
