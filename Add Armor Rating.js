const summand = -2.0;

let selected = zedit.GetSelectedRecords('ARMO');
for (let rec of selected) {
	let oldAR = xelib.GetFloatValue(rec, 'DNAM') / 100;
	let newAR = String(oldAR + summand)
	xelib.SetValue(rec, 'DNAM', newAR);
}
