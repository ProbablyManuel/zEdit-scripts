const prefix = 'CCA';

let selected = zedit.GetSelectedRecords('COBJ');
for (let rec of selected) {
	let workbench = xelib.EditorID(xelib.GetLinksTo(rec, 'BNAM'));
	let createdItem = xelib.GetLinksTo(rec, 'CNAM');
	if (GetWorkbench(workbench) === 'Smelting') {
		createdItem = xelib.GetLinksTo(rec, 'Items\\Item\\CNTO - Item\\Item');
	}
	if (xelib.EditorID(createdItem).search('_NULL_') === prefix.length) {
		// If the created item is nullified, the recipe should be nullified too
		var editorID = `${prefix}_NULL_${xelib.EditorID(rec)}`;
	}
	else
	{
		// Remove prefix from created item if present
		createdItemEditorID = xelib.EditorID(createdItem);
		if (createdItemEditorID.startsWith(prefix)) {
			createdItemEditorID = createdItemEditorID.slice(prefix.length + 1);
		}
		var editorID = `${prefix}_${GetWorkbench(workbench)}_${createdItemEditorID}`;
	}
	xelib.SetValue(rec, 'EDID', editorID);
}

function GetWorkbench(workbench) {
	switch (workbench) {
		case 'CraftingCookpot':
			return 'Cooking';
		case 'CraftingSmelter':
			return 'Smelting';
		case 'CraftingSmithingArmorTable':
			return 'Tempering';
		case 'CraftingSmithingForge':
			return 'Crafting';
		case 'CraftingSmithingSharpeningWheel':
			return 'Tempering';
		case 'CraftingSmithingSkyforge':
			return 'Crafting';
		case 'CraftingTanningRack':
			return 'Rack';
		default:
			return '';
	}
}
