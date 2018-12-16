let selected = zedit.GetSelectedRecords('ARMO');
for (let rec of selected) {
	let armorAddon = xelib.GetLinksTo(rec, 'Armature\\[0]');
	let editorID = xelib.EditorID(rec).replace('_', '_AA_');
	xelib.SetValue(armorAddon, 'EDID', editorID);
}
