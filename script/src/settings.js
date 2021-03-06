var Settings = (function(){
	var me = {};

	me.readSettings = function(){

		setDefaults();

		var settings = Storage.get("bassoonTrackerSettings");

		if (!settings) return;

		try {
			settings = JSON.parse(settings);
		} catch (e) {
			return false;
		}

		for (var key in settings){
			if (SETTINGS.hasOwnProperty(key) && settings.hasOwnProperty(key)){
				SETTINGS[key] = settings[key];
			}
		}

		if (SETTINGS.stereoSeparation){
			Audio.setStereoSeparation(SETTINGS.stereoSeparation);
		}

	};

	me.saveSettings = function(){
		var settings = {
			vubars: SETTINGS.vubars,
			keyboardTable: SETTINGS.keyboardTable,
			stereoSeparation: SETTINGS.stereoSeparation
		};
		Storage.set("bassoonTrackerSettings",JSON.stringify(settings));
	};

	me.reset = function(){
		// reset default Settings;
		setDefaults();
		me.saveSettings();
	};

	function setDefaults(){
		SETTINGS.keyboardTable = "qwerty";
		SETTINGS.vubars = "colour";
		SETTINGS.stereoSeparation =  STEREOSEPARATION.BALANCED;
	}

	return me;
})();