let quests = xelib.GetRecords(0, "QUST", true);

let {showProgress, logMessage, progressTitle, addProgress, progressMessage} = zedit.progressService;
showProgress({
    determinate: true,
    title: "List Quests Without Markers",
    message : "",
    canClose: true,
    current: 0,
    max: quests.length
});

questsWithoutMarkers = new Set()
for (let quest of quests) {
	quest = xelib.GetWinningOverride(quest);
	if (xelib.HasElement(quest, "Objectives")) {
		objectives = xelib.GetElements(quest, "Objectives");
		for (let objective of objectives) {
			if (!xelib.HasElement(objective, "Targets")) {
				questsWithoutMarkers.add(xelib.LongName(quest));
				break;
			}
		}
	}
	addProgress(1);
}
alphabeticalSearch = (function(a, b) {
	a = a.toLowerCase();
	b = b.toLowerCase();
	if (a < b)
	{
		return -1;
	}
	if (a > b) {
		return 1;
	}
	return 0;
});
questsWithoutMarkers = Array.from(questsWithoutMarkers).sort(alphabeticalSearch);
for (let quest of questsWithoutMarkers) {
	logMessage(quest);
}
