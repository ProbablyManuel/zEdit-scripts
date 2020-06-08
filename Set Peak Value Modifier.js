const selected = zedit.GetSelectedRecords("MGEF");

const {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
	determinate: true,
	title: "Set Peak Value Modifier",
	message : "",
	canClose: true,
	current: 0,
	max: selected.length
});


for (const effect of selected) {
	const archtype = xelib.GetValue(effect, "Magic Effect Data\\DATA\\Archtype");
	if (archtype === "Peak Value Modifier") {
		const dispelWithKeyword = xelib.GetFlag(effect, "Magic Effect Data\\DATA\\Flags", "Dispel with Keywords");
		const exclusiveKeyword = xelib.GetLinksTo(effect, "Magic Effect Data\\DATA\\Assoc. Item");
		if (!dispelWithKeyword && !exclusiveKeyword) {
			const actorValue = xelib.GetValue(effect, "Magic Effect Data\\DATA\\Actor Value");
			xelib.SetValue(effect, "Magic Effect Data\\DATA\\Archtype", "Value Modifier");
			xelib.SetValue(effect, "Magic Effect Data\\DATA\\Actor Value", actorValue);
		}
	}
	addProgress(1);
}
