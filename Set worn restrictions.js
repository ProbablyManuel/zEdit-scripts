const add = false;

let selected = zedit.GetSelectedRecords('ENCH');
let {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
    determinate: true,
    title: 'Setting worn restrictions',
    message : '',
    canClose: true,
    current: 0,
    max: selected.length
});

for (let rec of selected) {
	let base = xelib.GetLinksTo(rec, 'ENIT\\Base Enchantment');
	if (base) {
		base = xelib.GetWinningOverride(base);
		if (add) {
			let restrictions = xelib.GetValue(base, 'ENIT\\Worn Restrictions');
			if (xelib.GetValue(rec, 'ENIT\\Worn Restrictions') !== restrictions) {
				xelib.SetValue(rec, 'ENIT\\Worn Restrictions', restrictions);
			}
		}
		else {
			if (xelib.GetUIntValue(rec, 'ENIT\\Worn Restrictions') !== 0) {
				xelib.SetUIntValue(rec, 'ENIT\\Worn Restrictions', 0);
			}
		}
	}
	addProgress(1);
}
