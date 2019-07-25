effects = xelib.GetRecords(0, 'MGEF', false);
let {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
    determinate: true,
    title: 'List Cloak Effects',
    message : '',
    canClose: true,
    current: 0,
    max: effects.length
});

for (let effect of effects) {
	effect = xelib.GetWinningOverride(effect);
	if (xelib.GetValue(effect, 'Magic Effect Data\\DATA\\Archtype') === 'Cloak') {
		logMessage(xelib.LongName(effect));
	}
	addProgress(1);
}
