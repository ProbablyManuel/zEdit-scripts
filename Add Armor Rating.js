const summand = -150.0;
const multiplier = 1.0;

const selected = zedit.GetSelectedRecords('ARMO');
for (const rec of selected) {
	const oldAR = xelib.GetFloatValue(rec, 'DNAM') / 100;
	const newAR = String(oldAR * multiplier + summand);
	xelib.SetValue(rec, 'DNAM', newAR);
}
