let selected = zedit.GetSelectedRecords('ARMO');
for (let rec of selected) {
	let editorID = xelib.EditorID(rec);
	let prefix = 'CCA_Clothing_';
	if (editorID.startsWith(prefix)) {
		let name = editorID.replace(prefix, '');
		name = name.replace(/([A-Z][a-z]+)/g, '$1 ').trim();
		name = name.replace('_Scarf', ' with Scarf');
		xelib.SetValue(rec, 'FULL', name);
	}
}