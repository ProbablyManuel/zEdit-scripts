let signatures = ['ARMO', 'WEAP'];
records = [];
for (let signature of signatures) {
	records = records.concat(xelib.GetRecords(0, signature, false));
}
let {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
    determinate: true,
    title: 'List name changes',
    message : '',
    canClose: true,
    current: 0,
    max: records.length
});

for (let rec of records) {
	master = xelib.GetMasterRecord(rec);
	override = xelib.GetWinningOverride(rec);
	oldName = xelib.FullName(master, 'DATA\\Value');
	newName = xelib.FullName(override, 'DATA\\Value');
	if (oldName !== newName) {
		formId = xelib.GetHexFormID(rec);
		editorId = xelib.EditorID(master);
		logMessage(`${formId} <${editorId}> ${oldName} -> ${newName}`);
	}
	addProgress(1);
}
