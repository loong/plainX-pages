define.Class('wixapps.integration.components.traits.LoadTimeMeasurementTrait', function(classDefinition) {
    /** @type bootstrap.managers.classmanager.ClassDefinition */
    var def = classDefinition;

    def.methods({

        logStepLoadTime: function(step, time) {
            window.deployStatus('wixappsLoad', { step: step, time: time || LOG.getSessionTime() });
        },

        logStepIfCondition: function(step, condition) {
            var time = LOG.getSessionTime();
            if(!!condition) {
                this.logStepLoadTime(step, time);
            }
        }

    });
});