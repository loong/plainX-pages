/**
 * @class wixapps.core.views.ViewBuilder
 */
define.Class('wixapps.core.views.ViewBuilder', function (classDefinition) {
    /**
     * @type bootstrap.managers.classmanager.ClassDefinition
     */
    var def = classDefinition;

    def.utilize([
        "wixapps.core.views.ViewsCustomizer",
        "wixapps.core.managers.TypesManager",
        "wixapps.integration.managers.AppBuilderLocalizer"
    ]);

    def.resources([
        "W.Utils",
        "W.Experiments"
    ]);

    /**
     * @lends wixapps.core.views.ViewBuilder
     */
    def.fields({
        _delimiter: "_",

        /**
         * @type TypesManager
         */
        _typesManager: null,

        _types: null,
        _views: null,
        _data: null,
        _templates: null,
        _fieldTemplates: null,
        _fieldTemplatesByType: null,

        /**
         * @type wixapps.core.utils.AppsUtils
         */
        _utils: null,

        /**
         * @type {wixapps.integration.managers.AppBuilderLocalizer}
         */
        _localizer: null,

        _typesTemplatesMap: null
    });

    /**
     * @lends wixapps.core.views.ViewBuilder
     */
    def.methods({
        initialize: function () {
            this._typesManager = new this.imports.TypesManager();
            this._localizer = new this.imports.AppBuilderLocalizer();
            this._utils = this.resources.W.Utils.AppsUtils;

            if (Constants) {
                if (Constants.AppBuilderViewTemplates) {
                    this.registerTemplates();
                }
                if (Constants.AppBuilderTemplates) {
                    this.registerBundles();
                }
                this._buildTypesTemplateMap();
            }
            else {
                throw "ViewBuilder:: where is Constants?";
            }
        },

        generatePageView: function(baseView, targetFieldBoxId, width) {
            var ret = _.clone(baseView, true);
            var fieldBoxes = this._findCompByNames(ret, "FieldBox");
            if (fieldBoxes.length === 0) {
                throw "Cannot generate page view based on view with no field boxes";
            }
            var targetBoxIndex = _.findIndex(fieldBoxes, {id:targetFieldBoxId});
            if (targetBoxIndex == -1) {
                targetBoxIndex = 0;
            }
            var targetBox = fieldBoxes[targetBoxIndex];
            if (!targetBox.comp.items) { targetBox.comp.items = []; }

            // move all items to the target field box
            for (var i = 0; i < fieldBoxes.length; i++) {
                if (i === targetBoxIndex) {
                    continue;
                }
                var currentBox = fieldBoxes[i];
                if (!currentBox.comp.items || currentBox.comp.items.length === 0) {
                    continue;
                }
                var position = i < targetBoxIndex? "before" : "after";
                if (position == "before") {
                    currentBox.comp.items.reverse();
                }
                var addMethod = (position == "before")? targetBox.comp.items.unshift : targetBox.comp.items.push;
                while (currentBox.comp.items.length > 0) {
                    var movedComp = currentBox.comp.items.shift();
                    addMethod.call(targetBox.comp.items, movedComp);
                }
            }

            // make the first media large
            if (width !== undefined) {
                var found = _.find(targetBox.comp.items, {comp:{items:[{comp:{name:"Image"}}]}});
                if (!found) {
                    found = _.find(targetBox.comp.items, {comp:{items:[{comp:{name:"Video"}}]}});
                }
                if (found && found.comp && found.comp.width > 80) {
                    var oldWidth = found.comp.width;
                    found.comp.width = width;
                    found.comp.height = found.comp.height * width / oldWidth;
                    found.comp.spacers["xax-before"] = 0;
                    found.comp.spacers["xax-after"] = 0;
                }
            }

            return ret;
        },

        /**
         * iterate Constants.AppBuilderTemplates and collect the data in them into the ViewBuilder
         */
        registerBundles: function () {
            for (var bundleName in Constants.AppBuilderTemplates) {
                if (Constants.AppBuilderTemplates.hasOwnProperty(bundleName)) {
                    var bundle = Constants.AppBuilderTemplates[bundleName];

                    this._registerTypes([ bundle.type ]);
                    this._registerData(bundle.data);
                    this._registerViews([ bundle.view ]);
                    this._registerTemplates([ bundle.template ]);
                }
            }
        },

        /**
         * register a template
         */
        registerTemplates: function () {
            var templates = Constants.AppBuilderViewTemplates;

            this._registerTypes(templates.types);
            this._registerData(templates.data);
            this._registerViews(templates.views);
            this._registerTemplates(templates.templates);
            this._registerFieldTemplates(templates.fieldTemplates);
        },

        _buildTypesTemplateMap: function () {
            this._typesTemplatesMap = {};

            for (var key in this._fieldTemplates) {
                if (this._fieldTemplates.hasOwnProperty(key)) {
                    var temp = this._fieldTemplates[key];
                    if (temp.hasOwnProperty("category")) {
                        if (this._typesTemplatesMap.hasOwnProperty(temp.category)) {
                            this._typesTemplatesMap[temp.category].push(key);
                        }
                        else {
                            this._typesTemplatesMap[temp.category] = [ key ];
                        }
                    }
                }
            }
        },

        /**
         * returns a view definition by its name and type - will not throw if view is missing
         * @returns {Object}
         */
        getViewDefinition: function (forType, viewName) {
            var key = forType + "|" + viewName;
            if (this._views.hasOwnProperty(key)) {
                var view = Object.clone(this._views[key]);
                view = this.imports.ViewsCustomizer.fillMissingIds(view);
                return view;

            }
            return null;
        },

        /**
         * generates a template definition by template id
         * @param {String} templateId
         * @return {{id: String, friendlyName: String, description: String, defaultWidth: Number, type: *, view: *, data: *}}
         */
        getViewTemplateDefinition: function (templateId) {
            /**
             * @type {{ id: String, data: String[], type: String, viewName: String, defaultWidth: Number, showOrder: Number }}
             */
            var def = this._getTemplateDef(templateId);

            var template = {
                id: def.id,
                friendlyName: this._localizer.localize("TEMPLATE_BUNDLE_NAME_" + def.id),
                description: this._localizer.localize("TEMPLATE_BUNDLE_DESC_" + def.id),
                defaultWidth: def.defaultWidth,
                type: null,
                view: null,
                data: null
            };

            // dereference type
            template.type = this._getTypeDef(def.type);
            template.type.name = template.type.name + this._delimiter + this._utils.getTimeBasedUniqueId();
            template.type.displayName = this._localizer.localize("TEMPLATE_BUNDLE_TYPE_NAME_2_" + def.id);

            // dereference view
            template.view = this.imports.ViewsCustomizer.fillMissingIds(this._getViewDef(def.type, def.viewName));
            template.view.forType = template.type.name;
            template.view.name = this._utils.getTimeBasedUniqueId(template.view.name + this._delimiter);
            template.view = this._localizer.localizeView(template.view);

            // dereference data
            var i, len, item;
            len = def.data.length;
            template.data = [];
            for (i = 0; i < len; i++) {
                item = this._getDataItem(def.data[i]);
                item._iid = this._utils.getTimeBasedUniqueId(item._iid + this._delimiter) + this._delimiter + i;
                item._type = template.type.name;
                template.data.push(item);
            }

            template = this._addPredefinedExtraFields(template, def.extraFields);

            return template;
        },

        /**
         * @param {{id: *, friendlyName: *, defaultWidth: *, type: *, view: *, data: *}} template
         * @param {{ containerId, fieldTemplateName, typeField: { name, displayName, type, defaultValue }, params: {labelPosition, alignment} }[]} extraFields
         * @returns {{id: *, friendlyName: *, defaultWidth: *, type: *, view: *, data: *}}
         * @private
         */
        _addPredefinedExtraFields: function (template, extraFields) {
            if (!extraFields || extraFields.length === 0) {
                return template;
            }

            for (var i = 0; i < extraFields.length; i++) {
                var def = extraFields[i];

                // update type
                var typeCheck = template.type.fields.some(function (f) {
                    return f.name === def.typeField.name;
                });
                if (typeCheck === true) {
                    throw "ViewBuilder:: field with name [" + def.typeField.name + "] already defined for type [" + template.type.name + "] ";
                }
                template.type.fields.push(def.typeField);

                // update view
                var params = this.getDefaultExtraFieldParams(template.view, def.containerId);
                if (def.hasOwnProperty("params")) {
                    params = Object.merge(params, def.params);
                }
                var fieldDefinition = this.createFieldDefinitionFromTemplate(def.typeField.name, def.fieldTemplateName, def.typeField.type, params);
                this.addFieldToView(template.view, def.containerId, fieldDefinition);

                if (!def.typeField.hasOwnProperty("defaultValue")) {
                    def.typeField.defaultValue = this._typesManager.getDefaultDataForType(def.typeField.type);
                }

                // update data - only if we got a default value
                if (def.typeField.hasOwnProperty("defaultValue") && def.typeField.defaultValue !== undefined) {
                    for (var j = 0; j < template.data.length; j++) {
                        var item = template.data[j];
                        item[def.typeField.name] = def.typeField.defaultValue;
                    }
                }
            }
            return template;
        },

        /**
         * returns an array of all template bundles
         * @returns {Array}
         */
        getTemplateBundles: function () {
            var templates = Object.values(this._templates);

            // sort all templates with show order
            var comparables = templates.filter(function (t) {
                return t.hasOwnProperty("showOrder");
            });
            comparables.sort(function (t1, t2) {
                return t1.showOrder - t2.showOrder;
            });

            // sort the rest of the templates
            var rest = templates.filter(function (t) {
                return !t.hasOwnProperty("showOrder");
            });
            rest.sort(function (t1, t2) {
                return t1.id > t2.id;
            });

            var ret = [].concat(comparables, rest);
            return ret;
        },

        _getPaginatedListTemplate: function () {
            return "PaginatedListTemplate";
        },

        /**
         * gets the default view definition for Lists
         * @param {String} viewName - is the expected to be inside the list
         * @return {Object}
         */
        getListViewTemplateDefinition: function (viewName, baseView) {
            var listTemplateViewDef = this._getViewDef("Array", this._getPaginatedListTemplate());
            listTemplateViewDef = this._localizer.localizeView(listTemplateViewDef);
            this.imports.ViewsCustomizer.fillMissingIds(listTemplateViewDef);
            listTemplateViewDef.name = viewName;
            this.imports.ViewsCustomizer.applyRule(listTemplateViewDef, {
                fieldId: "listItem",
                key: "comp.name",
                format: "*",
                value: viewName
            });

            if(baseView){
                this._migratePaginatedListView(baseView, listTemplateViewDef);
            }

            return listTemplateViewDef;
        },

        /**
         * gets the default view for BlankListItems (lists that lost their view)
         * @param forType
         * @param viewName
         * @returns {Object}
         */
        getBlankListItemViewTemplateDefinition: function (forType, viewName) {
            var viewDef = this._getViewDef("BlankType", "BlankList");
            viewDef = this._localizer.localizeView(viewDef);
            this.imports.ViewsCustomizer.fillMissingIds(viewDef);
            viewDef.name = viewName;
            viewDef.forType = forType;

            return viewDef;
        },

        /**
         * get all views for erronaous AppParts, by convention their names will end with ErrorView
         * @returns {Array}
         */
        getErrorViews: function () {
            var ret = [];
            _.each(this._views, function (view) {
                if (view.name.test(/ErrorView$/)) {
                    ret.push(_.clone(view));
                }
            });
            return ret;
        },

        /**
         * Searches a view JSON for certain comps and returns them as an array.
         * Used for migrating views.
         * @param view
         * @returns {*|Array}
         * @private
         */
        _getNamedCompsFromView: function(view, compName){
            return this._find(view, function (obj) {
                return this._utils.getType(obj) === "object" &&
                    obj.hasOwnProperty("comp") &&
                    obj.comp.hasOwnProperty("name") &&
                    obj.comp.name === compName;
            }.bind(this));
        },

        /**
         * Changes listTemplateViewDef (by refrences) to have the styles of the baseView
         * @param baseView
         * @param listTemplateViewDef
         * @private
         */
        _migratePaginatedListView: function(baseView, listTemplateViewDef){
            if(baseView.vars && baseView.vars.itemSpacing){
                listTemplateViewDef.vars.itemSpacing = baseView.vars.itemSpacing;
            }

            var originalViewGutterLines = this._getNamedCompsFromView(baseView, "HorizontalLine"); //get lines from orig viewDef
            var newViewGutterLines = this._getNamedCompsFromView(listTemplateViewDef, "HorizontalLine"); //get lines from new viewDef

            if(originalViewGutterLines.length){
                var origComp = originalViewGutterLines[0];
                newViewGutterLines.forEach(function(gutterLineObj){
                    if(origComp.comp.hidden){
                        gutterLineObj.comp.hidden = origComp.comp.hidden;
                    }

                    if(origComp.comp.style){
                        gutterLineObj.comp.style = origComp.comp.style;
                    }
                });
            }
        },

        _registerInner: function (array, getId, member) {
            var i, obj, len = array.length;
            for (i = 0; i < len; i++) {
                obj = array[i];
                member[getId(obj)] = obj;
            }
        },

        _registerTypes: function (types) {
            this._types = this._types || {};
            this._registerInner(types, function (obj) {
                return obj["name"];
            }, this._types);
        },

        _registerViews: function (views) {
            this._views = this._views || {};
            this._registerInner(views, function (obj) {
                return obj["forType"] + "|" + obj["name"];
            }, this._views);
        },

        _registerData: function (data) {
            this._data = this._data || {};
            this._registerInner(data, function (obj) {
                return obj["_iid"];
            }, this._data);
        },

        _registerTemplates: function (templates) {
            this._templates = this._templates || {};
            this._registerInner(templates, function (obj) {
                return obj["id"];
            }, this._templates);
        },

        _registerFieldTemplates: function (fieldTemplates) {
            this._fieldTemplates = this._fieldTemplates || {};
            this._fieldTemplatesByType = this._fieldTemplatesByType || {};

            fieldTemplates = _.filter(fieldTemplates, function(template) {
                return !template.experiment || this.resources.W.Experiments.isExperimentOpen(template.experiment);
            }, this);

            this._registerInner(fieldTemplates, function (obj) {
                var key = obj["forType"] + "|" + obj["name"];
                if(obj["showAsHint"]){
                    key += "|" + obj["showAsHint"];
                }
                return key;
            }, this._fieldTemplates);


            var i, fieldTemplate, len = fieldTemplates.length;
            for (i = 0; i < len; i++) {
                fieldTemplate = fieldTemplates[i];
                var key = fieldTemplate["forType"];
                var value = fieldTemplate["forType"] + "|" + fieldTemplate["name"];
                if(fieldTemplate["showAsHint"]){
                    value += "|" + fieldTemplate["showAsHint"];
                }
                if (!this._fieldTemplatesByType[ key ]) {
                    this._fieldTemplatesByType[ key ] = [];
                }
                this._fieldTemplatesByType[ key ].push(value);
            }
        },

        _getTypeDef: function (typeName) {
            if (this._types.hasOwnProperty(typeName)) {
                return Object.clone(this._types[typeName]);
            }
            throw "ViewBuilder:: type [" + typeName + "] doesn't exist";
        },

        _getViewDef: function (forType, name) {
            var key = forType + "|" + name;
            if (this._views.hasOwnProperty(key)) {
                return Object.clone(this._views[key]);
            }
            throw "ViewBuilder:: view for type [" + forType + "] with name [" + name + "] doesn't exist";
        },

        _getDataItem: function (id) {
            if (this._data.hasOwnProperty(id)) {
                return Object.clone(this._data[id]);
            }
            throw "ViewBuilder:: data item [" + id + "] doesn't exist";
        },

        _getTemplateDef: function (id) {
            if (this._templates.hasOwnProperty(id)) {
                return this._templates[id];
            }
            throw "ViewBuilder:: template [" + id + "] doesn't exist";
        },

        _getFieldTemplateDef: function (forType, name, showAsHint) {
            var key = [forType, name].join("|");
            var keyAndHint;
            if(showAsHint){
                keyAndHint = [key, showAsHint].join("|");
            }
            if (this._fieldTemplates.hasOwnProperty(keyAndHint)) {
                return Object.clone(this._fieldTemplates[keyAndHint]);
            }else if(this._fieldTemplates.hasOwnProperty(key)) {
                return Object.clone(this._fieldTemplates[key]);
            }
            throw "ViewBuilder:: field template [" + key + "] doesn't exist";
        },

        getTypesAndTemplatesMap: function () {
            return Object.clone(this._typesTemplatesMap);
        },


        getDefaultTemplateKey: function (typeName, showAsHint) {
            var getFieldTemplatesByType;
            if(showAsHint){
                getFieldTemplatesByType = [typeName + '|' + showAsHint];
            }else{
                getFieldTemplatesByType = this._getFieldTemplatesByType(typeName);
            }
            if (getFieldTemplatesByType.length > 0) {
                return getFieldTemplatesByType[0];
            }
        },

        _getFieldTemplatesByType: function (typeName) {
            var fieldTemplatesByType = this._fieldTemplatesByType[typeName];
            return Object.values(fieldTemplatesByType);
        },

        /****************************************************************/
        /*                      Field Templates                         */
        /****************************************************************/

        /**
         * returns a map of all containers and their fields
         * @param view
         * @returns {Object}
         */
        getExtraFieldContainers: function (view) {
            var ret = {};
            // get all containers
            var containers = this._findCompByNames(view, "FieldBox");

            var i, j, cont, item, items;
            // create an array for each container
            for (i = 0; i < containers.length; i++) {
                cont = containers[i];
                items = [];
                if (cont.comp.hasOwnProperty("items")) {
                    // fill the arrays with items
                    for (j = 0; j < cont.comp.items.length; j++) {
                        item = cont.comp.items[j];
                        items.push(item);
                    }
                }
                ret[cont.id] = items;
            }
            return ret;
        },

        /**
         * returns a mapping of all the fields in the given view
         * fields will be in an array based on the field-box they are in
         * field format: { id, data, compName, fieldType, containerName }
         * @param {Object} view
         * @param {Boolean} withHiddens
         * @return {{ containerId, containerName, containerFields, orientation, hasFields }[]}
         */
        getViewFieldsMapping: function (view) {
            var ret = [];

            var isField = function (obj) {
                return this._utils.getType(obj) === "object" &&
                    obj.hasOwnProperty("comp") &&
                    obj.comp.hasOwnProperty("name") &&
                    (obj.comp.name === "Field" || obj.comp.name === "TextField");
            }.bind(this);

            var containers = this._findCompByNames(view, "FieldBox");

            var i, j, obj, item, innerItem;
            for (i = 0; i < containers.length; i++) {
                obj = containers[i];
                var containerName = obj.id;
                if (obj.comp && obj.comp.editorData && obj.comp.editorData.displayName) {
                    var displayName = obj.comp.editorData.displayName;
                    if (this._localizer.isValidKey(displayName)) {
                        displayName = this._localizer.localize(this._localizer.getKeyValue(displayName), containerName);
                    }
                    containerName = displayName;
                }
                ret.push({
                    containerId: obj.id,
                    containerName: containerName,
                    containerFields: [],
                    hasFields: false,
                    orientation: obj.comp.orientation
                });
                if (!obj.comp.items) {
                    continue;
                }
                for (j = 0; j < obj.comp.items.length; j++) {
                    item = obj.comp.items[j];
                    if (!isField(item)) {
                        continue;
                    }
                    else if  ( this.isFieldHidden(view, item.id) ) {
                        // Migration work.
                        // Hidden fields by 'hidden' attribute (comp.hidden) are not supported anymore,
                        // instead we're removing fields from the view.
                        this.removeFieldFromView(view, item.id);
                        continue;
                    }
                    innerItem = item.comp.items[0];
                    ret[i].containerFields.push({
                        id: item.id,
                        data: item.data,
                        compName: innerItem.comp.name,
                        fieldType: item.comp.name,
                        containerId: obj.id,
                        containerName: containerName
                    });
                }
                if (ret[i].containerFields.length > 0) {
                    ret[i].hasFields = true;
                }
            }

            return ret;
        },


        /**
         * returns a set of default parameters used to build a new field from a template
         * @param view
         * @param extraFieldContainerId
         * @returns {{ labelPosition: String, alignment: String, spacers: { before: Number, after: Number } }} spacers also have xax-before and xax-after propoerties.
         */
        getDefaultExtraFieldParams: function (view, extraFieldContainerId) {
            var container = this._getExtraFieldContainerById(view, extraFieldContainerId);
            return container.comp.editorData;
        },

        /**
         * returns the basic field template definition after uniqization of fields and with the right data fields
         * @param {String} fieldTypeName
         * @param {String} fieldTemplateName
         * @param {String} dataFieldName
         * @return {Object}
         */
        getBaseFieldTemplate: function (fieldTypeName, fieldTemplateName, dataFieldName, showAsHint) {
            var fieldTemplateDef = this._getFieldTemplateDef(fieldTypeName, fieldTemplateName, showAsHint);
            this._cleanFieldTemplateDef(fieldTemplateDef);

            // fixes in place
            this._uniqify(fieldTemplateDef);
            this._fixFieldTemplateData(fieldTemplateDef, dataFieldName);

            return this._localizer.localizeView(fieldTemplateDef);
        },

        /**
         * generates a new field definition
         * @param {String} dataFieldName the name of the field in the data item
         * @param {String} fieldTemplateName the name of the template
         * @param {String} fieldTypeName the name of the type we extend
         * @param {{ labelPosition: String, alignment: String,  spacers: { before: Number, after: Number } }} extraFieldParams params used to build the extra field, spacers also have xax-before and xax-after propoerties.
         * @returns {Object}
         */
        createFieldDefinitionFromTemplate: function (dataFieldName, fieldTemplateName, fieldTypeName, extraFieldParams) {
            var ret = this.getBaseFieldTemplate(fieldTypeName, fieldTemplateName, dataFieldName);

            ret = this._applyExtraFieldParamsToFieldDefinition(ret, extraFieldParams);

            return ret;
        },

        _applyExtraFieldParamsToFieldDefinition: function (fieldDefinition, extraFieldParams) {
            // set custom fields
            /** @type {String} */
            var compName = fieldDefinition.comp.name;

            if (compName === "Field") {
                fieldDefinition.comp.labelPosition = extraFieldParams.labelPosition || "none";
                fieldDefinition.comp.spacers = Object.merge({}, fieldDefinition.comp.spacers, extraFieldParams.spacers);

                if (extraFieldParams.hasOwnProperty("alignment")) {
                    fieldDefinition.comp["box-align"] = extraFieldParams.alignment;
                }
            }

            if (compName === "TextField") {
                fieldDefinition.comp.labelPosition = extraFieldParams.labelPosition || "none";
                fieldDefinition.comp.spacers = Object.merge({}, fieldDefinition.comp.spacers, extraFieldParams.spacers);

                var inner = fieldDefinition.comp.items[0];

                if (extraFieldParams.hasOwnProperty("alignment")) {
                    inner.layout = inner.layout || {};
                    inner.layout["text-align"] = extraFieldParams.alignment;
                }

                if (inner.hasOwnProperty("comp") && extraFieldParams.hasOwnProperty("textStyle")) {
                    if (extraFieldParams.textStyle.hasOwnProperty("styleName")) {
                        inner.comp.style = extraFieldParams.textStyle.styleName;
                    }
                    if (extraFieldParams.textStyle.hasOwnProperty("bold")) {
                        inner.comp.bold = extraFieldParams.textStyle.bold;
                    }
                }
            }

            return fieldDefinition;
        },

        /**
         * adds a field definition into a specific extra field container
         * @param view
         * @param extraFieldContainerId
         * @param fieldDefinition
         * @param [atIndex]
         */
        addFieldToView: function (view, extraFieldContainerId, fieldDefinition, atIndex) {
            this._markModified(view);
            var container = this._getExtraFieldContainerById(view, extraFieldContainerId);
            var extraFieldParams = container.comp.editorData;

            // remove spacer and alignment properties, and reset them to the containers defaults
            delete fieldDefinition.comp["box-align"];
            delete fieldDefinition.comp["spacers"];
            delete fieldDefinition.comp["labelPosition"];

            fieldDefinition.comp.labelPosition = extraFieldParams.labelPosition || "none";
            fieldDefinition.comp.spacers = Object.merge({}, fieldDefinition.comp.spacers, extraFieldParams.spacers);

            var compName = fieldDefinition.comp.name;
            if (compName === "Field") {
                if (extraFieldParams.hasOwnProperty("alignment")) {
                    fieldDefinition.comp["box-align"] = extraFieldParams.alignment;
                }
            }
            if (compName === "TextField") {
                var inner = fieldDefinition.comp.items[0];
                if (extraFieldParams.hasOwnProperty("alignment")) {
                    inner.layout = inner.layout || {};
                    inner.layout["text-align"] = extraFieldParams.alignment;
                }
            }

            fieldDefinition.comp.hidden = false;
            container.comp.items = container.comp.items || [];

            // fix index
            atIndex = (atIndex !== undefined && atIndex >= 0) ? atIndex : container.comp.items.length;

            container.comp.items.splice(atIndex, 0, fieldDefinition);
        },

        /**
         * removes an extra field from a view
         * @param view
         * @param extraFieldId
         */
        removeFieldFromView: function (view, extraFieldId) {
            this._markModified(view);
            var containers = this._findCompByNames(view, "FieldBox");
            var removedFieldDefinition;
            for (var i = 0; i < containers.length; i++) {
                var container = containers[i];
                if (container.comp.items) {
                    container.comp.items = container.comp.items.filter(function (item) {
                        if (item.id === extraFieldId) {
                            removedFieldDefinition = item;
                        }

                        return item.id !== extraFieldId;
                    });
                }
            }

            return removedFieldDefinition;
        },

        _findCompByNames: function (view, compNames) {
            if (this._utils.getType(compNames) === "string") {
                compNames = [ compNames ];
            }
            if (this._utils.getType(compNames) !== "array") {
                throw "ViewBuilder::_findCompByNames - argument compNames should be string of an array of strings but got '" + compNames + "'.";
            }
            return this._find(view, function (obj) {
                return this._utils.getType(obj) === "object" &&
                    obj.hasOwnProperty("comp") &&
                    obj.comp.hasOwnProperty("name") &&
                    compNames.contains(obj.comp.name);
            }.bind(this));
        },

        moveField: function (view, fieldId, extraFieldContainerId, atIndex) {
            var removedFieldDefinition = this.removeFieldFromView(view, fieldId);
            if (removedFieldDefinition) {
                this.addFieldToView(view, extraFieldContainerId, removedFieldDefinition, atIndex);
            }
        },

        /**
         * replaces an extra field with a new one, the replacement is based on the extra fields id
         * @param view
         * @param extraFieldContainerId
         * @param newFieldDefinition
         */
        replaceFieldInView: function (view, extraFieldContainerId, newFieldDefinition) {
            this._markModified(view);
            var container = this._getExtraFieldContainerById(view, extraFieldContainerId);

            for (var i = 0; i < container.comp.items.length; i++) {
                var item = container.comp.items[i];
                if (item.id === newFieldDefinition.id) {
                    // replaces the item in index "i" with the new item
                    container.comp.items.splice(i, 1, newFieldDefinition);
                }
            }
        },

        /**
         * swap two extra field items
         * @param view
         * @param extraFieldContainerId
         * @param fromIndex
         * @param toIndex
         */
        reorderExtraFields: function (view, extraFieldContainerId, fromIndex, toIndex) {
            var container = this._getExtraFieldContainerById(view, extraFieldContainerId);
            var tmp = container.comp.items[fromIndex];
            container.comp.items[fromIndex] = container.comp.items[toIndex];
            container.comp.items[toIndex] = tmp;
        },

        getPageLinkFields: function ( viewDef ) {
            return this._find(viewDef, function (obj) {
                return this._utils.getType(obj) === "object" &&
                    obj.hasOwnProperty("comp") &&
                    obj.comp.hasOwnProperty("name") &&
                    (obj.comp.name === "Field" || obj.comp.name === "TextField") &&
                    obj.comp.hasOwnProperty("pageLink");
            }.bind(this));
        },

        /**
         *
         * @param view
         * @param appPageId
         * @returns {*}
         */
        removePageLinks: function (view, appPageId) {
            var pageLinks = this.getPageLinkFields(view);
            for (var i = 0; i < pageLinks.length; i++) {
                var comp = pageLinks[i].comp;
                if (comp.pageLink === appPageId) {
                    delete comp.pageLink;
                }
            }

            return view;
        },

        getViewFieldByTypeField: function ( viewDef, typeFieldName ) {
            var results = this.findByData(viewDef, typeFieldName);
            if (results.length > 0) {
                return results[0];
            }
        },

        isTypeFieldInView: function (viewDef, typeFieldName) {
            var viewField = this.getViewFieldByTypeField(viewDef, typeFieldName);
            return (viewField !== undefined);
        },

        _getDisplayedFields: function (viewDef) {
            return this._find(viewDef, function (obj) {
                return this._utils.getType(obj) === "object" &&
                    obj.hasOwnProperty("comp") &&
                    obj.comp.hasOwnProperty("name") && obj.comp.hasOwnProperty("name") != "links" &&
                    (obj.comp.name === "Field" || obj.comp.name === "TextField") &&
                    (obj.comp.hasOwnProperty("hidden") === false || ( obj.comp.hasOwnProperty("hidden") && (obj.comp.hidden === false || obj.comp.hidden === 'false')));
            }.bind(this));
        },


        /**
         * Deprecated.
         * hidden fields in AppBuilder are not components with comp.hidden anymore
         * hidden fields are now fields that exist in type and not in view.
         * @param viewDef
         * @returns {*}
         */
        _getHiddenFields: function (viewDef) {
            return this._find(viewDef, function (obj) {
                return this._utils.getType(obj) === "object" &&
                    obj.hasOwnProperty("comp") &&
                    obj.comp.hasOwnProperty("name") &&
                    (obj.comp.name === "Field" || obj.comp.name === "TextField") &&
                    obj.comp.hasOwnProperty("hidden") &&
                    (obj.comp.hidden === true || obj.comp.hidden === 'true');
            }.bind(this));
        },


        /**
         * Depercated.
         * uses _getHiddenFields.
         * use isTypeFieldInView instead
         * @param viewDef
         * @param fieldId
         * @returns {*|Boolean|Boolean}
         */
        isFieldHidden: function (viewDef, fieldId) {
            var hiddenFields = this._getHiddenFields(viewDef);
            return hiddenFields.some(function (hiddenField) {
                return (hiddenField.id === fieldId);
            });
        },


        _getExtraFieldContainerById: function (view, extraFieldContainerId) {
            var container = this._find(view, function (obj) {
                return this._utils.getType(obj) === "object" &&
                    obj.hasOwnProperty("comp") &&
                    obj.comp.hasOwnProperty("name") &&
                    obj.comp.name === "FieldBox" &&
                    obj.hasOwnProperty("id") &&
                    obj.id === extraFieldContainerId;
            }.bind(this));

            if (container.length === 0) {
                throw "view [" + view.forType + "|" + view.name + "] has no extra field container with id [" + extraFieldContainerId + "]";
            }
            return container[0];
        },

        _cleanFieldTemplateDef: function (fieldTemplateDef) {
            delete fieldTemplateDef.customizations;
            delete fieldTemplateDef.name;
            delete fieldTemplateDef.forType;
            delete fieldTemplateDef.category;
        },

        /**
         * @private
         * iterate the field template definition and look for the pattern { id:"[.+?]" } and uniqify all these ids in-place
         * @param {Object} fieldTemplateDefinition
         * @returns {Object}
         */
        _uniqify: function (fieldTemplateDefinition) {
            var uniquifiables = this._find(fieldTemplateDefinition, function (obj) {
                return (this._utils.getType(obj) === "string") && obj.test(/\[[a-zA-z0-9_-]*?\]/ig);
            }.bind(this));

            var newIds = {}, tmp;
            for (var i = 0; i < uniquifiables.length; i++) {
                tmp = uniquifiables[i].match(/\[[a-zA-z0-9_-]*?\]/ig);
                for (var k = 0; k < tmp.length; k++) {
                    newIds[tmp[k]] = tmp[k].replace(/[\[\]]/gi, "") + this._delimiter + this._utils.getTimeBasedUniqueId();
                }
            }

            var fields = this._find(fieldTemplateDefinition, function (obj) {
                if (this._utils.getType(obj) === "object" && (obj.hasOwnProperty("id") || obj.hasOwnProperty("fieldId"))) {
                    var id = obj.id || obj.fieldId;
                    return (this._utils.getType(id) === "string") && id.test(/\[[a-zA-z0-9_-]*?\]/ig);
                }
                return false;
            }.bind(this));

            for (var j = 0; j < fields.length; j++) {
                var obj = fields[j];
                var field;
                if (obj.hasOwnProperty("id")) {
                    field = "id";
                } // field
                if (obj.hasOwnProperty("fieldId")) {
                    field = "fieldId";
                } // customization

                var match;
                while ((match = (/\[[a-zA-z0-9_-]*?\]/ig).exec(obj[field])) !== null) {
                    match = match[0];
                    obj[field] = obj[field].replace(match, newIds[match]);
                }
            }

            return fieldTemplateDefinition;
        },

        _find: function (view, predicate, canEnterSubtreePredicate) {
            canEnterSubtreePredicate = canEnterSubtreePredicate || function () {
                return true;
            };
            var ret = [];
            var find = function (obj) {
                if (obj === undefined || obj === null) {
                    return;
                }

                if (predicate(obj)) {
                    ret.push(obj);
                }

                if (!canEnterSubtreePredicate(obj)) {
                    return;
                }

                switch (this._utils.getType(obj)) {
                    case "object":
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                find(obj[key]);
                            }
                        }
                        break;
                    case "array":
                        for (var i = 0; i < obj.length; i++) {
                            find(obj[i]);
                        }
                        break;
                }
            }.bind(this);

            find(view);
            return ret;
        },

        _findCompNames: function (view, compNames) {
            if (this._utils.getType(compNames) === "string") {
                compNames = [ compNames ];
            }
            if (this._utils.getType(compNames) !== "array") {
                throw "ViewBuilder::_findCompNames - argument compNames should be string of an array of strings but got '" + compNames + "'.";
            }
            return this._find(view, function (obj) {
                return this._utils.getType(obj) === "object" &&
                    obj.hasOwnProperty("comp") &&
                    obj.comp.hasOwnProperty("name") &&
                    compNames.contains(obj.comp.name);
            }.bind(this));
        },

        _fixFieldTemplateData: function (fieldTemplateDef, dataFieldName) {
            var bound = this._find(fieldTemplateDef, function (obj) {
                return this._utils.getType(obj) === "object";
            }.bind(this));

            _.each(bound, function (obj) {
                _.forOwn(obj, function (value, key, thisArg) {
                    if (key === 'data') {
                        var data = value.split(".").filter(function (s) {
                            return s.length;
                        });
                        if (data.length === 0) {
                            thisArg.data = dataFieldName;
                        }
                        else if (data[0] === "this") {
                            data[0] = dataFieldName;
                            thisArg.data = data.join(".");
                        }
                        else {
                            data = [ dataFieldName ].concat(data);
                            thisArg.data = data.join(".");
                        }
                    } else {
                        if (typeof value === 'string') {
                            thisArg[key] = value.replace('this', dataFieldName);
                        }
                    }
                });
            });

            return fieldTemplateDef;
        },

        findById: function (view, id) {
            return this._find(view, function (obj) {
                return this._utils.getType(obj) === "object" &&
                    obj.hasOwnProperty("id") &&
                    obj.id === id;
            }.bind(this));
        },

        findByData: function (view, typeFieldName) {
            return this._find(view, function (obj) {
                return this._utils.getType(obj) === "object" &&
                    obj.hasOwnProperty("comp") &&
                    obj.comp.hasOwnProperty("name") &&
                    (obj.comp.name === "Field" || obj.comp.name === "TextField") &&
                    (obj.data === typeFieldName);
            }.bind(this));
        },

        _markModified: function (view) {
            view.editorData = view.editorData || {};
            view.editorData.wasChanged = true;
        }
    });
});

