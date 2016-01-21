W.Apps.registerAppDescriptor({
    id: "491f9ddf-cbfd-402b-9991-0ff6e336470d",
    "packageName": "news",
    "name": "@NEWS_APP_NAME@",
    "version": 1,
    "appIcon": "images/news-app-icon.png",
    "helpId":'/node/10694',
    "pictures": [
        "images/news-screen-01.png",
        "images/news-screen-02.png",
        "images/news-screen-03.png"
    ],
    "experiments": {
    },
    "description": "News App",
    "parts": [
        {
            "id": "045dd836-ef5d-11e1-ace3-c0dd6188709b",
            "name": "@NEWS_APP_parts_NAME@",
            "widgetIcon": "images/news-icon.png",
            "defaultWidth":460,
            "defaultHeight":500,
            "description": "@NEWS_APP_parts_Description@",
            "pictures": [
//                "http://joebess.com/Feb12/AnimationBlogIndex.gif",
//                "http://themes.zenverse.net/themedata/monoshade/screenshots/indexstyle1.gif"
            ],
            "logic": {
                display: { type: "wixapps.core.logics.CategoryLogic", options: { collectionId: "Lists", itemId: "SampleFeed1" } },
                seo: { type: "SingleItem", options: { collectionId: "Lists", itemId: 'SampleFeed1' } }
            },
	        allowRtl: false,
            allowZoomCustomization: true,
            "views": ["SimpleVList", "ImageVList", "DateVList"],
            "customizationsViewMapping": {
//                "SimpleVList": "MobileVList",
//                "ImageVList": "MobileVList",
//                "DateVList": "MobileVList"
            },
            zoomPartName: ["63631b64-a981-40c3-8772-40238db5aff6"]
        },
        {
            "id": "63631b64-a981-40c3-8772-40238db5aff6",
            "name": "@NEWS_APP_Customize_Expand_NAME@",
            "description": "@NEWS_APP_Customize_Expand_Description@",
            "listedInStore": false,
            "widgetIcon": "images/news-icon.png",
            "defaultWidth":500,
            "defaultHeight":500,
            "pictures": [
//                "http://joebess.com/Feb12/AnimationBlogIndex.gif",
//                "http://themes.zenverse.net/themedata/monoshade/screenshots/indexstyle1.gif"
            ],
            "logic": {
                "display": { "type": "wixapps.core.logics.SingleItemLogic", "options": { "collectionId": "Items", "itemId": "0537E434-5F86-4392-BEF5-7DC62B8412B3" } },
                "seo": { "type": "SingleItem", "options": { "collectionId": "Items", itemId: '0537E434-5F86-4392-BEF5-7DC62B8412B3' } }
            },
            "zoomParams": {urlIdPrefix: 'nws',"urlTitle": "news","width":820, "minHeight": 600, "itemIdParamName": 'itemId'},
            "mobileZoomExtraParams": { 'enableSwipe': true, 'enableScroll': true, 'disableRerender': true },
            "views": [ "ZoomView"],
            zoomCustomizations: {
                types:['Item'],
                styleEditLabel: " ",
                typeSelectionLabel: " ",
                itemNavigationLabel: "@Customize_Expand_itemNavigationLabel@",
                prevBtnLabel: "@Customize_Expand_prevBtnLabel@",
                nextBtnLabel: "@Customize_Expand_nextBtnLabel@"
            }
        }

    ],
    "viewDescriptions": [
        {
            "id": "SimpleVList",
            "name": "@NEWS_VIEW_NAME_SIMPLE@",
            "description": "Shows news items in a vertical list.",
            "icon": "images/simple-list.png"
        },
        {
            "id": "ImageVList",
            "name": "@NEWS_VIEW_NAME_IMAGE@",
            "description": "Shows news items with images in a vertical list.",
            "icon": "images/image-list.png"
        },
        {
            "id": "DateVList",
            "name": "@NEWS_VIEW_NAME_DATE@",
            "description": "Shows news items and dates in a vertical list.",
            "icon": "images/date-list.png"
        }
    ],
    "links": [],
    "collections": [
        { "id": "Lists", "allowedTypes": [ "ItemList"], "name": "Lists"},
        { "id": "Items", "allowedTypes": [ "Item" ], "name": "Items" }
    ],
    "types": [
        {
            "_iid": "ItemList",
            "_type": "wix:Type",
            "fields": [
                {"name": "title", "_type": "wix:Field", "type": "String", "defaultValue": "",validations: [{func:'minLength', params:[2]}]},
                {"name":"items", "_type": "wix:Field", type: "Array<wix:Ref<Item>>"}
            ],
            permissions: {
                '*': { Read: 'Anonymous', Update: 'SiteOwner', Create: 'SiteOwner', Delete: 'SiteOwner' }
            }

        },
        {
            "_iid": "Item",
            "_type": "wix:Type",
            "fields": [
                { "_type": "wix:Field", "name": "title", "type": "String", "defaultValue": "",validations: [{func:'minLength', params:[2]}] },
                { "_type": "wix:Field", "name": "date", type: "wix:Date", defaultValue: {_type:'wix:Date', iso: '1970-01-01T00:00:00.000Z' } },
                { "_type": "wix:Field", "name": "image", "type": "wix:Image", "defaultValue": { "_type": "wix:Image", "title": "Default image", "src": "2f7b76_f3e0b18a805017bb5c34c633f3fd93bc.png", "width": 1280, "height": 960 } },
                { "_type": "wix:Field", "name": "content", "type": "wix:RichText", "defaultValue": {_type:'wix:RichText'}},
                { "_type": "wix:Field", "name": "newsSource", "type": "String", "defaultValue": ""},
                { "_type": "wix:Field", "name": "newsSourceLink", "type": "wix:LinkBase", "defaultValue": {_type:'wix:LinkBase'}},
                { "_type": "wix:Field", "name": "parentRefs", "type": "Array<wix:Ref<ItemList>>", "defaultValue": []}
            ],
            permissions: {
                '*': { Read: 'Anonymous', Update: 'SiteOwner', Create: 'SiteOwner', Delete: 'SiteOwner' }
            }
        }
    ],

    "preLoadedData":{
        "Lists": [
            {
                "_iid": "576807B9-0771-44C5-A399-F0073BCACD48",
                "_type": "ItemList",
                "title": "I'm a news section 2",
                "items": [
                    {
                        "_type": "wix:Ref<Item>",
                        "collectionId": "Items",
                        "itemId": "CDEFC28C-D17F-45F6-A321-7AC96ED093DB"
                    },
                    {
                        "_type": "wix:Ref<Item>",
                        "collectionId": "Items",
                        "itemId": "0537E434-5F86-4392-BEF5-7DC62B8412B3"
                    },
                    {
                        "_type": "wix:Ref<Item>",
                        "collectionId": "Items",
                        "itemId": "20A12C07-475F-4DF6-B375-66B23BE25459"
                    }
                ]
            },
            {
                "_iid": "SampleFeed1",
                "_type": "ItemList",
                "title": "I'm a news section 1",
                "items": [
                    {
                        "_type": "wix:Ref<Item>",
                        "collectionId": "Items",
                        "itemId": "42c94a2d-9356-43f8-83d8-34bab795e0d9"
                    },
                    {
                        "_type": "wix:Ref<Item>",
                        "collectionId": "Items",
                        "itemId": "29a0cc5b-010c-40cc-9585-18fbbdf36168"
                    },
                    {
                        "_type": "wix:Ref<Item>",
                        "collectionId": "Items",
                        "itemId": "A824C130-CF1A-47CE-A8A1-49A6269F869B"
                    }
                ]
            }
        ],
        "Items": [
            {
                "_type": "Item",
                "title": "I'm a news headline. Use me to give your news story a title.",
                "date": {
                    "_type": "wix:Date",
                    "iso": "2017-12-23T00:00:00.000Z"
                },
                "content": {
                    "_type": "wix:RichText",
                    "text": "<p><span>I'm a news story. Click here to open up the News Editor and change my text. I'm a great place for you to let your users know what's new with your company.</span></p>",
                    "links": []
                },
                "newsSource": "Team Wix",
                "_iid": "0537E434-5F86-4392-BEF5-7DC62B8412B3",
                "image": {
                    "_type": "wix:Image",
                    "title": "Default image",
                    "src": "images/news-app-news-paper-image.jpg",
                    "width": 1280,
                    "height": 960
                },
                "newsSourceLink": {
                    "_type": "wix:ExternalLink",
                    "linkId": "news_7E0F737A",
                    "target": "_blank", "protocol": "http",
                    "address": "www.wix.com"
                },
                "parentRefs": [
                    {
                        "_type": "wix:Ref<ItemList>",
                        "collectionId": "Lists",
                        "itemId": "576807B9-0771-44C5-A399-F0073BCACD48"
                    }
                ]
            },
            {
                "_type": "Item",
                "title": "I'm a news headline. Use me to give your news story a title. Click here to open up the News Editor and change my text.",
                "date": {
                    "_type": "wix:Date",
                    "iso": "2017-12-23T00:00:00.000Z"
                },
                "content": {
                    "_type": "wix:RichText",
                    "text": "<p><span>I'm a news story. Click here to open up the News Editor and change my text. Simply click me, Edit News and start editing your news. I'm a great place for you to let your users know what's new with your company. You can use this area to write your own news or include articles where you've been mentioned in the press.</span><br><span>In your News Editor you can store all your news and choose which stories are displayed and which you'd prefer to keep hidden. You can click on any of the Sections, Headlines and Stories already in the News Editor and replace with your own content. Clicking Add lets you create news headlines and stories which you can attach to any News Section. To add your own News Section, click Add Section. And when you're done, click Save and your work will be saved in your News editor. You can choose what news stories appear on your page. You can even choose to only display stories by the News Section or News Headline.</span></p>",
                    "links": []
                },
                "newsSource": "Team Wix",
                "_iid": "20A12C07-475F-4DF6-B375-66B23BE25459",
                "image": {
                    "_type": "wix:Image",
                    "title": "Default image",
                    "src": "images/news-app-news-paper-image.jpg",
                    "width": 1280,
                    "height": 960
                },
                "newsSourceLink": {
                    "_type": "wix:ExternalLink",
                    "linkId": "news_7E0F737B",
                    "target": "_blank", "protocol": "http",
                    "address": "www.wix.com"
                },
                "parentRefs": [
                    {
                        "_type": "wix:Ref<ItemList>",
                        "collectionId": "Lists",
                        "itemId": "576807B9-0771-44C5-A399-F0073BCACD48"
                    }
                ]
            },
            {
                "_iid": "29a0cc5b-010c-40cc-9585-18fbbdf36168",
                "_type": "Item",
                "title": "I'm a news headline. Use me to give your news story a title.",
                "date": {
                    "_type": "wix:Date",
                    "iso": "2017-12-23T00:00:00.000Z"
                },
                "content": {
                    "_type": "wix:RichText",
                    "text": "<p><span>I'm a news story. Click here to open up the News Editor and change my text. I'm a great place for you to let your users know what's new with your company.</span></p>",
                    "links": []
                },
                "newsSource": "Team Wix",
                "newsSourceLink": {
                    "_type": "wix:ExternalLink",
                    "linkId": "news_7E0F737C",
                    "target": "_blank", "protocol": "http",
                    "address": "www.wix.com"
                },
                "image": {
                    "_type": "wix:Image",
                    "title": "",
                    "src": "images/news-app-news-paper-image.jpg",
                    "width": 1280,
                    "height": 853
                },
                "parentRefs": [
                    {
                        "_type": "wix:Ref<ItemList>",
                        "collectionId": "Lists",
                        "itemId": "SampleFeed1"
                    }
                ]
            },
            {
                "_iid": "42c94a2d-9356-43f8-83d8-34bab795e0d9",
                "_type": "Item",
                "title": "I'm a news headline.",
                "date": {
                    "_type": "wix:Date",
                    "iso": "2017-12-23T00:00:00.000Z"
                },
                "content": {
                    "_type": "wix:RichText",
                    "text": "<p><span>I'm a news story. Click here to open up the News Editor and change my text.</span></p>",
                    "links": []
                },
                "newsSource": "Team Wix",
                "newsSourceLink": {
                    "_type": "wix:ExternalLink",
                    "linkId": "news_7E0F737D",
                    "target": "_blank", "protocol": "http",
                    "address": "www.wix.com"
                },
                "image": {
                    "_type": "wix:Image",
                    "title": "",
                    "src": "images/news-app-news-paper-image.jpg",
                    "width": 1280,
                    "height": 853
                },
                "parentRefs": [
                    {
                        "_type": "wix:Ref<ItemList>",
                        "collectionId": "Lists",
                        "itemId": "SampleFeed1"
                    }
                ]
            },
            {
                "_type": "Item",
                "title": "I'm a news headline. Use me to give your news story a title. Click here to open up the News Editor and change my text.",
                "date": {
                    "_type": "wix:Date",
                    "iso": "2017-12-23T00:00:00.000Z"
                },
                "content": {
                    "_type": "wix:RichText",
                    "text": "<p><span>I'm a news story. Click here to open up the News Editor and change my text. Simply click me, Edit News and start editing your news. I'm a great place for you to let your users know what's new with your company. You can use this area to write your own news or include articles where you've been mentioned in the press.</span></p><p><span>In your News Editor you can store all your news and choose which stories are displayed and which you'd prefer to keep hidden. You can click on any of the Sections, Headlines and Stories already in the News Editor and replace with your own content. Clicking Add lets you create news headlines and stories which you can attach to any News Section. To add your own News Section, click Add Section. And when you're done, click Save and your work will be saved in your News editor. You can choose what news stories appear on your page. You can even choose to only display stories by the News Section or News Headline.</span></p>",
                    "links": []
                },
                "newsSource": "Team Wix",
                "_iid": "A824C130-CF1A-47CE-A8A1-49A6269F869B",
                "image": {
                    "_type": "wix:Image",
                    "title": "",
                    "src": "images/news-app-news-paper-image.jpg",
                    "width": 1280,
                    "height": 853
                },
                "newsSourceLink": {
                    "_type": "wix:ExternalLink",
                    "linkId": "news_7E0F737E",
                    "target": "_blank", "protocol": "http",
                    "address": "www.wix.com"
                },
                "parentRefs": [
                    {
                        "_type": "wix:Ref<ItemList>",
                        "collectionId": "Lists",
                        "itemId": "SampleFeed1"
                    }
                ]
            },
            {
                "_type": "Item",
                "title": "I'm a news headline.",
                "date": {
                    "_type": "wix:Date",
                    "iso": "2017-12-23T00:00:00.000Z"
                },
                "content": {
                    "_type": "wix:RichText",
                    "text": "<p><span>I'm a news story. Click here to open up the News Editor and change my text.</span></p>",
                    "links": []
                },
                "newsSource": "Team Wix",
                "_iid": "CDEFC28C-D17F-45F6-A321-7AC96ED093DB",
                "image": {
                    "_type": "wix:Image",
                    "title": "Default image",
                    "src": "images/news-app-news-paper-image.jpg",
                    "width": 1280,
                    "height": 960
                },
                "newsSourceLink": {
                    "_type": "wix:ExternalLink",
                    "linkId": "news_7E0F737F",
                    "target": "_blank", "protocol": "http",
                    "address": "www.wix.com"
                },
                "parentRefs": [
                    {
                        "_type": "wix:Ref<ItemList>",
                        "collectionId": "Lists",
                        "itemId": "576807B9-0771-44C5-A399-F0073BCACD48"
                    }
                ]
            }
        ]
    } ,
    "views": [].concat(
// Start generated views
[
	{
		"name":"NewsDate1","forType":"wix:Date","id":"date","data":"this","comp":
		{
			"name":"Date","format":"d mmm yyyy"
		},
		"customizations":
		[
			{
				"priority":99,"fieldId":"date","key":"comp.format","format":"*","input":
				{
					"name":"combobox","label":"@Customize_News_DATE_FORMAT@","options":
					[
						{
							"label":"23 Jan 2017","value":"d mmm yyyy"
						},
						{
							"label":"23-Jan-2017","value":"d-mmm-yyyy"
						},
						{
							"label":"January 23, 2017","value":"longDate"
						},
						{
							"label":"Sunday, January 23, 2017","value":"fullDate"
						},
						{
							"label":"23 January 2017","value":"d mmmm yyyy"
						},
						{
							"label":"23-January-2017","value":"d-mmmm-yyyy"
						},
						{
							"label":"1/23/2017","value":"m/d/yyyy"
						},
						{
							"label":"01/23/2017","value":"mm/dd/yyyy"
						}
					]
				}
			}
		]
	},
	{
		"name":"NewsDate2","forType":"wix:Date","id":"date","data":"this","comp":
		{
			"name":"Date","format":"d mmm yyyy"
		},
		"customizations":
		[
			{
				"priority":99,"fieldId":"date","key":"comp.format","format":"*","input":
				{
					"name":"combobox","label":"@Customize_News_DATE_FORMAT@","options":
					[
						{
							"label":"23 Jan 2017","value":"d mmm yyyy"
						},
						{
							"label":"23-Jan-2017","value":"d-mmm-yyyy"
						},
						{
							"label":"January 23, 2017","value":"longDate"
						},
						{
							"label":"Sunday, January 23, 2017","value":"fullDate"
						},
						{
							"label":"23 January 2017","value":"d mmmm yyyy"
						},
						{
							"label":"23-January-2017","value":"d-mmmm-yyyy"
						},
						{
							"label":"1/23/2017","value":"m/d/yyyy"
						},
						{
							"label":"01/23/2017","value":"mm/dd/yyyy"
						}
					]
				}
			}
		]
	},
	{
		"name":"NewsDate3","forType":"wix:Date","id":"date","data":"this","comp":
		{
			"name":"Date","format":"d mmm yyyy"
		},
		"customizations":
		[
			{
				"priority":99,"fieldId":"date","key":"comp.format","format":"*","input":
				{
					"name":"combobox","label":"@Customize_News_DATE_FORMAT@","options":
					[
						{
							"label":"23 Jan 2017","value":"d mmm yyyy"
						},
						{
							"label":"23-Jan-2017","value":"d-mmm-yyyy"
						},
						{
							"label":"January 23, 2017","value":"longDate"
						},
						{
							"label":"Sunday, January 23, 2017","value":"fullDate"
						},
						{
							"label":"23 January 2017","value":"d mmmm yyyy"
						},
						{
							"label":"23-January-2017","value":"d-mmmm-yyyy"
						},
						{
							"label":"1/23/2017","value":"m/d/yyyy"
						},
						{
							"label":"01/23/2017","value":"mm/dd/yyyy"
						}
					]
				}
			}
		]
	},
	{
		"name":
		[
			"NewsDate1","NewsDate2","NewsDate3"
		],
		"forType":"wix:Date","format":"Mobile","id":"date","data":"this","comp":
		{
			"name":"Date","format":"d mmm yyyy"
		}
	},
	{
		"name":"NewsDate5","forType":"wix:Date","format":"Mobile","id":"date","data":"this","comp":
		{
			"name":"Date","color":"#ffffff","fontSize":"14","format":"d mmm yyyy"
		},
		"customizations":
		[
			{
				"priority":99,"fieldId":"date","key":"comp.format","input":
				{
					"name":"combobox","label":"Date format","options":
					[
						{
							"label":"23 Jan 2017","value":"d mmm yyyy"
						},
						{
							"label":"23-Jan-2017","value":"d-mmm-yyyy"
						},
						{
							"label":"January 23, 2017","value":"longDate"
						},
						{
							"label":"Sunday, January 23, 2017","value":"fullDate"
						},
						{
							"label":"23 January 2017","value":"d mmmm yyyy"
						},
						{
							"label":"23-January-2017","value":"d-mmmm-yyyy"
						},
						{
							"label":"1/23/2017","value":"m/d/yyyy"
						},
						{
							"label":"01/23/2017","value":"mm/dd/yyyy"
						}
					]
				}
			}
		]
	},
	{
		"name":"NewsSourceView1","forType":"Item","data":"newsSourceLink._type","comp":
		{
			"name":"SwitchBox","cases":
			{
				"default":
				[
					{
						"data":"newsSourceLink","comp":
						{
							"name":"Link","items":
							[
								{
									"data":"newsSource","comp":
									{
										"name":"Label","singleLine":"true","noWrap":"true","showTooltip":"true"
									}
								}
							]
						}
					}
				],
				"wix:LinkBase":
				[
					{
						"data":"newsSource","comp":
						{
							"name":"Label","singleLine":"true","noWrap":"true","showTooltip":"true"
						}
					}
				]
			},
			"css":
			{
				"box-flex":1
			}
		}
	},
	{
		"name":"NewsSourceView2","forType":"Item","data":"newsSourceLink._type","comp":
		{
			"name":"SwitchBox","cases":
			{
				"default":
				[
					{
						"data":"newsSourceLink","comp":
						{
							"name":"Link","items":
							[
								{
									"data":"newsSource","comp":
									{
										"name":"Label","singleLine":"true","showTooltip":"true"
									}
								}
							]
						}
					}
				],
				"wix:LinkBase":
				[
					{
						"data":"newsSource","comp":
						{
							"name":"Label","singleLine":"true","showTooltip":"true"
						}
					}
				]
			},
			"css":
			{
				"box-flex":1
			}
		}
	},
	{
		"name":"NewsSourceView3","forType":"Item","data":"newsSourceLink._type","comp":
		{
			"name":"SwitchBox","cases":
			{
				"default":
				[
					{
						"data":"newsSourceLink","comp":
						{
							"name":"Link","items":
							[
								{
									"data":"newsSource","comp":
									{
										"name":"Label","singleLine":"true","showTooltip":"true"
									}
								}
							]
						}
					}
				],
				"wix:LinkBase":
				[
					{
						"data":"newsSource","comp":
						{
							"name":"Label","singleLine":"true","showTooltip":"true"
						}
					}
				]
			},
			"css":
			{
				"box-flex":1
			}
		}
	},
	{
		"name":
		[
			"NewsSourceView1","NewsSourceView2","NewsSourceView3"
		],
		"forType":"Item","format":"Mobile","data":"newsSourceLink._type","comp":
		{
			"name":"SwitchBox","cases":
			{
				"default":
				[
					{
						"data":"newsSourceLink","comp":
						{
							"name":"Link","items":
							[
								{
									"data":"newsSource","comp":
									{
										"name":"Label","singleLine":"true","showTooltip":"true"
									}
								}
							]
						}
					}
				],
				"wix:LinkBase":
				[
					{
						"data":"newsSource","comp":
						{
							"name":"Label","singleLine":"true","showTooltip":"true"
						}
					}
				]
			},
			"css":
			{
				"box-flex":1
			}
		}
	},
	{
		"name":"NewsSourceView5","forType":"Item","data":"newsSourceLink._type","comp":
		{
			"name":"SwitchBox","cases":
			{
				"default":
				[
					{
						"data":"newsSourceLink","comp":
						{
							"name":"Link","items":
							[
								{
									"data":"newsSource","comp":
									{
										"name":"Label","singleLine":"true","color":"#ffffff","fontSize":"14","showTooltip":"true"
									}
								}
							]
						}
					}
				],
				"wix:LinkBase":
				[
					{
						"data":"newsSource","comp":
						{
							"name":"Label","singleLine":"true","color":"#ffffff","fontSize":"14","showTooltip":"true"
						}
					}
				]
			},
			"css":
			{
				"box-flex":1
			}
		}
	},
	{
		"name":"DateAndSource1","forType":"Item","comp":
		{
			"name":"VBox","items":
			[
				{
					"id":"dateNameSwitch","value":"showDate","comp":
					{
						"name":"SwitchBox","cases":
						{
							"default":
							[
								{
									"comp":
									{
										"name":"VBox","items":
										[
											{
												"id":"contentBox","comp":
												{
													"name":"HBox","items":
													[
														{
															"id":"source","comp":
															{
																"name":"HBox","items":
																[
																	{
																		"comp":
																		{
																			"name":"NewsSourceView1"
																		}
																	}
																]
															},
															"layout":
															{
																"box-flex":1
															}
														}
													]
												},
												"layout":
												{
													"spacerAfter":8
												}
											}
										]
									}
								}
							],
							"showDate":
							[
								{
									"comp":
									{
										"name":"VBox","items":
										[
											{
												"id":"contentBox","comp":
												{
													"name":"HBox","items":
													[
														{
															"data":"date","comp":
															{
																"name":"NewsDate1"
															}
														},
														{
															"id":"newsSourceSwitch","data":"newsSource","comp":
															{
																"name":"SwitchBox","cases":
																{
																	"default":
																	[
																		{
																			"id":"source","comp":
																			{
																				"name":"HBox","items":
																				[
																					{
																						"value":",","comp":
																						{
																							"name":"Label"
																						},
																						"layout":
																						{
																							"spacerAfter":5
																						}
																					},
																					{
																						"comp":
																						{
																							"name":"NewsSourceView1"
																						},
																						"layout":
																						{
																							"box-flex":1
																						}
																					}
																				],
																				"css":
																				{
																					"width":"100%"
																				}
																			}
																		}
																	],
																	"":
																	[
																	]
																}
															},
															"layout":
															{
																"box-flex":1
															}
														}
													]
												},
												"layout":
												{
													"spacerAfter":8
												}
											}
										]
									}
								}
							]
						}
					},
					"layout":
					{
						"spacerBefore":0
					}
				}
			]
		},
		"customizations":
		[
			{
				"priority":89,"fieldId":"dateNameSwitch","key":"layout.spacerBefore","input":
				{
					"name":"slider","maxVal":"100","minVal":"0","label":"@Customize_Title_Source_spacing@"
				}
			},
			{
				"priority":85,"fieldId":"contentBox","key":"layout.spacerAfter","input":
				{
					"name":"slider","maxVal":"100","minVal":"0","label":"@Customize_Story_Source_spacing@"
				}
			},
			{
				"priority":88,"fieldId":"source","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_source@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":87,"fieldId":"dateNameSwitch","key":"value","input":
				{
					"name":"checkbox","falseVal":"hideDate","label":"@Customize_Show_date@","defaultVal":"showDate","trueVal":"showDate"
				}
			}
		]
	},
	{
		"name":"DateAndSource2","forType":"Item","comp":
		{
			"name":"VBox","items":
			[
				{
					"id":"dateNameSwitch","value":"showDate","comp":
					{
						"name":"SwitchBox","cases":
						{
							"default":
							[
								{
									"comp":
									{
										"name":"VBox","items":
										[
											{
												"id":"contentBox","comp":
												{
													"name":"HBox","items":
													[
														{
															"id":"source","comp":
															{
																"name":"HBox","items":
																[
																	{
																		"comp":
																		{
																			"name":"NewsSourceView2"
																		}
																	}
																]
															},
															"layout":
															{
																"box-flex":1
															}
														}
													]
												},
												"layout":
												{
													"spacerAfter":8
												}
											}
										]
									}
								}
							],
							"showDate":
							[
								{
									"comp":
									{
										"name":"VBox","items":
										[
											{
												"id":"contentBox","comp":
												{
													"name":"HBox","items":
													[
														{
															"data":"date","comp":
															{
																"name":"NewsDate2"
															}
														},
														{
															"id":"newsSourceSwitch","data":"newsSource","comp":
															{
																"name":"SwitchBox","cases":
																{
																	"default":
																	[
																		{
																			"id":"source","comp":
																			{
																				"name":"HBox","items":
																				[
																					{
																						"value":",","comp":
																						{
																							"name":"Label"
																						},
																						"layout":
																						{
																							"spacerAfter":5
																						}
																					},
																					{
																						"comp":
																						{
																							"name":"NewsSourceView2"
																						}
																					}
																				]
																			}
																		}
																	],
																	"":
																	[
																	]
																}
															},
															"layout":
															{
																"box-flex":1
															}
														}
													]
												},
												"layout":
												{
													"spacerAfter":8
												}
											}
										]
									}
								}
							]
						}
					},
					"layout":
					{
						"spacerBefore":0
					}
				}
			]
		},
		"customizations":
		[
			{
				"priority":89,"fieldId":"dateNameSwitch","key":"layout.spacerBefore","input":
				{
					"name":"slider","maxVal":"100","minVal":"0","label":"@Customize_Title_Source_spacing@"
				}
			},
			{
				"priority":85,"fieldId":"contentBox","key":"layout.spacerAfter","input":
				{
					"name":"slider","maxVal":"100","minVal":"0","label":"@Customize_Story_Source_spacing@"
				}
			},
			{
				"priority":88,"fieldId":"source","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_source@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":87,"fieldId":"dateNameSwitch","key":"value","input":
				{
					"name":"checkbox","falseVal":"hideDate","label":"@Customize_Show_date@","defaultVal":"showDate","trueVal":"showDate"
				}
			}
		]
	},
	{
		"name":"DateAndSource3","forType":"Item","comp":
		{
			"name":"VBox","items":
			[
				{
					"id":"dateNameSwitch","value":"showDate","comp":
					{
						"name":"SwitchBox","cases":
						{
							"default":
							[
								{
									"comp":
									{
										"name":"VBox","items":
										[
											{
												"id":"contentBox","comp":
												{
													"name":"HBox","items":
													[
														{
															"id":"source","comp":
															{
																"name":"HBox","items":
																[
																	{
																		"comp":
																		{
																			"name":"NewsSourceView3"
																		}
																	}
																]
															},
															"layout":
															{
																"box-flex":1
															}
														}
													]
												},
												"layout":
												{
													"spacerAfter":8
												}
											}
										]
									}
								}
							],
							"showDate":
							[
								{
									"comp":
									{
										"name":"VBox","items":
										[
											{
												"id":"contentBox","comp":
												{
													"name":"HBox","items":
													[
														{
															"data":"date","comp":
															{
																"name":"NewsDate3"
															}
														},
														{
															"id":"newsSourceSwitch","data":"newsSource","comp":
															{
																"name":"SwitchBox","cases":
																{
																	"default":
																	[
																		{
																			"id":"source","comp":
																			{
																				"name":"HBox","items":
																				[
																					{
																						"value":",","comp":
																						{
																							"name":"Label"
																						},
																						"layout":
																						{
																							"spacerAfter":5
																						}
																					},
																					{
																						"comp":
																						{
																							"name":"NewsSourceView3"
																						}
																					}
																				]
																			}
																		}
																	],
																	"":
																	[
																	]
																}
															},
															"layout":
															{
																"box-flex":1
															}
														}
													]
												},
												"layout":
												{
													"spacerAfter":8
												}
											}
										]
									}
								}
							]
						}
					},
					"layout":
					{
						"spacerBefore":0
					}
				}
			]
		},
		"customizations":
		[
			{
				"priority":89,"fieldId":"dateNameSwitch","key":"layout.spacerBefore","input":
				{
					"name":"slider","maxVal":"100","minVal":"0","label":"@Customize_Title_Source_spacing@"
				}
			},
			{
				"priority":85,"fieldId":"contentBox","key":"layout.spacerAfter","input":
				{
					"name":"slider","maxVal":"100","minVal":"0","label":"@Customize_Story_Source_spacing@"
				}
			},
			{
				"priority":88,"fieldId":"source","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_source@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":87,"fieldId":"dateNameSwitch","key":"value","input":
				{
					"name":"checkbox","falseVal":"hideDate","label":"@Customize_Show_date@","defaultVal":"showDate","trueVal":"showDate"
				}
			}
		]
	},
	{
		"name":
		[
			"DateAndSource1","DateAndSource2","DateAndSource3"
		],
		"forType":"Item","format":"Mobile","comp":
		{
			"name":"VBox","items":
			[
				{
					"id":"dateNameSwitch","value":"showDate","comp":
					{
						"name":"SwitchBox","cases":
						{
							"default":
							[
								{
									"comp":
									{
										"name":"VBox","items":
										[
											{
												"id":"contentBox","comp":
												{
													"name":"HBox","items":
													[
														{
															"id":"source","comp":
															{
																"name":"HBox","items":
																[
																	{
																		"comp":
																		{
																			"name":
																			{
																				"$expr":"String.concat('NewsSourceView', $viewIndex)"
																			}
																		}
																	}
																]
															},
															"layout":
															{
																"box-flex":1
															}
														}
													]
												},
												"layout":
												{
													"spacerAfter":8
												}
											}
										]
									}
								}
							],
							"showDate":
							[
								{
									"comp":
									{
										"name":"VBox","items":
										[
											{
												"id":"contentBox","comp":
												{
													"name":"HBox","items":
													[
														{
															"data":"date","comp":
															{
																"name":
																{
																	"$expr":"String.concat('NewsDate', $viewIndex)"
																}
															}
														},
														{
															"id":"newsSourceSwitch","data":"newsSource","comp":
															{
																"name":"SwitchBox","cases":
																{
																	"default":
																	[
																		{
																			"id":"source","comp":
																			{
																				"name":"HBox","items":
																				[
																					{
																						"value":",","comp":
																						{
																							"name":"Label"
																						},
																						"layout":
																						{
																							"spacerAfter":5
																						}
																					},
																					{
																						"comp":
																						{
																							"name":
																							{
																								"$expr":"String.concat('NewsSourceView', $viewIndex)"
																							}
																						}
																					}
																				]
																			}
																		}
																	],
																	"":
																	[
																	]
																}
															},
															"layout":
															{
																"box-flex":1
															}
														}
													]
												},
												"layout":
												{
													"spacerAfter":8
												}
											}
										]
									}
								}
							]
						}
					},
					"layout":
					{
						"spacerBefore":0
					}
				}
			]
		},
		"customizations":
		[
			{
				"priority":89,"fieldId":"dateNameSwitch","key":"layout.spacerBefore","input":
				{
					"name":"slider","maxVal":"100","minVal":"0","label":"@Customize_Title_Source_spacing@"
				}
			},
			{
				"priority":88,"fieldId":"source","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_source@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":87,"fieldId":"dateNameSwitch","key":"value","input":
				{
					"name":"checkbox","falseVal":"hideDate","label":"@Customize_Show_date@","defaultVal":"showDate","trueVal":"showDate"
				}
			}
		]
	},
	{
		"name":"DateAndSource5","forType":"Item","format":"Mobile","comp":
		{
			"name":"HBox","items":
			[
				{
					"id":"dateNameSwitch","value":"showDate","comp":
					{
						"name":"SwitchBox","cases":
						{
							"default":
							[
								{
									"comp":
									{
										"name":"VBox","items":
										[
											{
												"id":"contentBox","comp":
												{
													"name":"HBox","items":
													[
														{
															"id":"source","comp":
															{
																"name":"HBox","items":
																[
																	{
																		"comp":
																		{
																			"name":"NewsSourceView5"
																		}
																	}
																]
															},
															"layout":
															{
																"box-flex":1
															}
														}
													]
												},
												"layout":
												{
													"spacerAfter":8
												}
											}
										]
									}
								}
							],
							"showDate":
							[
								{
									"comp":
									{
										"name":"VBox","items":
										[
											{
												"id":"contentBox","comp":
												{
													"name":"HBox","items":
													[
														{
															"data":"date","comp":
															{
																"name":"NewsDate5"
															}
														},
														{
															"id":"newsSourceSwitch","data":"newsSource","comp":
															{
																"name":"SwitchBox","cases":
																{
																	"default":
																	[
																		{
																			"id":"source","comp":
																			{
																				"name":"HBox","items":
																				[
																					{
																						"value":",","comp":
																						{
																							"name":"Label","color":"#ffffff","fontSize":"14"
																						},
																						"layout":
																						{
																							"spacerAfter":5
																						}
																					},
																					{
																						"comp":
																						{
																							"name":"NewsSourceView5"
																						}
																					}
																				]
																			}
																		}
																	],
																	"":
																	[
																	]
																}
															},
															"layout":
															{
																"box-flex":1
															}
														}
													]
												},
												"layout":
												{
													"spacerAfter":8
												}
											}
										]
									}
								}
							]
						}
					},
					"layout":
					{
						"width":"100%"
					}
				}
			],
			"css":
			{
				"width":"100%"
			}
		},
		"customizations":
		[
			{
				"priority":89,"fieldId":"dateNameSwitch","key":"layout.spacerBefore","input":
				{
					"name":"slider","maxVal":"100","minVal":"0","label":"@Customize_Title_Source_spacing@"
				}
			},
			{
				"priority":88,"fieldId":"source","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_source@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":87,"fieldId":"dateNameSwitch","key":"value","input":
				{
					"name":"checkbox","falseVal":"hideDate","label":"@Customize_Show_date@","defaultVal":"showDate","trueVal":"showDate"
				}
			}
		]
	},
	{
		"name":"SimpleVList","forType":"ItemList","comp":
		{
			"name":"VBox","items":
			[
				{
					"data":"title","comp":
					{
						"name":"Label"
					},
					"layout":
					{
						"spacerAfter":22
					}
				},
				{
					"data":"items","comp":
					{
						"name":"VerticalList","isStyleEditable":"false","templates":
						{
							"item":
							{
								"comp":
								{
									"name":"VBox","items":
									[
										{
											"comp":
											{
												"name":"SimpleVList"
											}
										},
										{
											"id":"inline-news-spacer","comp":
											{
												"name":"VSpacer","size":"30"
											}
										}
									]
								}
							},
							"last":
							{
								"comp":
								{
									"name":"SimpleVList"
								}
							}
						}
					}
				}
			]
		},
		"customizations":
		[
			{
				"priority":109,"fieldId":"title","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_section_title@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":111,"fieldId":"title","key":"layout.spacerAfter","input":
				{
					"name":"slider","maxVal":"300","minVal":"0","label":"@Customize_Section_title_spacing@"
				}
			},
			{
				"priority":90,"fieldId":"inline-news-spacer","key":"comp.size","input":
				{
					"name":"slider","maxVal":"300","minVal":"0","label":"@Customize_Item_spacing@"
				}
			}
		]
	},
	{
		"name":"SimpleVList","forType":"Item","comp":
		{
			"name":"ZoomLink","listExpression":"parent.parent.items","items":
			[
				{
					"data":"title","comp":
					{
						"name":"Label"
					}
				},
				{
					"comp":
					{
						"name":"DateAndSource1"
					}
				},
				{
					"data":"content","comp":
					{
						"name":"ClippedParagraph","maxLines":"3"
					},
					"layout":
					{
						"width":"100%"
					}
				}
			]
		},
		"customizations":
		[
			{
				"priority":50,"fieldId":"content","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_story@","defaultVal":"false","trueVal":"false"
				}
			}
		]
	},
	{
		"name":"ImageVList","forType":"ItemList","comp":
		{
			"name":"VBox","items":
			[
				{
					"data":"title","comp":
					{
						"name":"Label"
					},
					"layout":
					{
						"spacerAfter":22
					}
				},
				{
					"data":"items","comp":
					{
						"name":"VerticalList","isStyleEditable":"false","templates":
						{
							"item":
							{
								"comp":
								{
									"name":"VBox","items":
									[
										{
											"comp":
											{
												"name":"ImageVList"
											}
										},
										{
											"id":"inline-news-spacer","comp":
											{
												"name":"VSpacer","size":"30"
											}
										}
									]
								}
							},
							"last":
							{
								"comp":
								{
									"name":"VBox","items":
									[
										{
											"comp":
											{
												"name":"ImageVList"
											}
										}
									]
								}
							}
						}
					}
				}
			]
		},
		"customizations":
		[
			{
				"priority":109,"fieldId":"title","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_section_title@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":111,"fieldId":"title","key":"layout.spacerAfter","input":
				{
					"name":"slider","maxVal":"300","minVal":"0","label":"@Customize_Section_title_spacing@"
				}
			},
			{
				"priority":95,"fieldId":"inline-news-spacer","key":"comp.size","input":
				{
					"name":"slider","maxVal":"300","minVal":"0","label":"@Customize_Item_spacing@"
				}
			}
		]
	},
	{
		"name":"ImageVList","forType":"Item","comp":
		{
			"name":"ZoomLink","orientation":"horizontal","box-align":"left","listExpression":"parent.parent.items","items":
			[
				{
					"id":"imageBox","comp":
					{
						"name":"VBox","items":
						[
							{
								"data":"image","comp":
								{
									"name":"Image","style":"wp2"
								},
								"layout":
								{
									"box-flex":1
								}
							}
						]
					},
					"layout":
					{
						"width":100,"height":100,"spacerAfter":17
					}
				},
				{
					"comp":
					{
						"name":"VBox","items":
						[
							{
								"data":"title","comp":
								{
									"name":"ClippedParagraph","maxLines":"2"
								},
								"layout":
								{
									"spacerAfter":2
								}
							},
							{
								"comp":
								{
									"name":"DateAndSource2"
								}
							},
							{
								"data":"content","comp":
								{
									"name":"ClippedParagraph","maxLines":"1"
								}
							}
						]
					},
					"layout":
					{
						"box-flex":1
					}
				}
			]
		},
		"customizations":
		[
			{
				"priority":80,"fieldId":"imageBox","key":"layout.height","input":
				{
					"name":"slider","maxVal":"300","minVal":"1","label":"@Customize_Image_height@"
				}
			},
			{
				"priority":81,"fieldId":"imageBox","key":"layout.width","input":
				{
					"name":"slider","maxVal":"300","minVal":"1","label":"@Customize_Image_width@"
				}
			},
			{
				"priority":82,"fieldId":"imageBox","key":"layout.spacerAfter","input":
				{
					"name":"slider","maxVal":"300","minVal":"0","label":"@Customize_Item_image_spacing@"
				}
			},
			{
				"priority":86,"fieldId":"content","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_story@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":83,"fieldId":"content","key":"comp.maxLines","input":
				{
					"name":"slider","maxVal":"5","minVal":"1","label":"@Customize_Maximum_story_lines@"
				}
			}
		]
	},
	{
		"name":"DateVList","forType":"ItemList","comp":
		{
			"name":"VBox","items":
			[
				{
					"data":"title","comp":
					{
						"name":"Label"
					},
					"layout":
					{
						"spacerAfter":22
					}
				},
				{
					"data":"items","comp":
					{
						"name":"VerticalList","isStyleEditable":"false","templates":
						{
							"item":
							{
								"comp":
								{
									"name":"VBox","items":
									[
										{
											"comp":
											{
												"name":"DateVList"
											}
										},
										{
											"id":"inline-news-spacer","comp":
											{
												"name":"VSpacer","size":"30"
											}
										}
									]
								}
							},
							"last":
							{
								"comp":
								{
									"name":"DateVList"
								}
							}
						}
					}
				}
			]
		},
		"customizations":
		[
			{
				"priority":109,"fieldId":"title","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_section_title@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":110,"fieldId":"title","key":"layout.spacerAfter","input":
				{
					"name":"slider","maxVal":"300","minVal":"0","label":"@Customize_Section_title_spacing@"
				}
			},
			{
				"priority":90,"fieldId":"inline-news-spacer","key":"comp.size","input":
				{
					"name":"slider","maxVal":"300","minVal":"0","label":"@Customize_Item_spacing@"
				}
			}
		]
	},
	{
		"name":"DateVList","forType":"Item","comp":
		{
			"name":"ZoomLink","listExpression":"parent.parent.items","items":
			[
				{
					"comp":
					{
						"name":"VBox","items":
						[
							{
								"comp":
								{
									"name":"HBox","items":
									[
										{
											"comp":
											{
												"name":"VBox","items":
												[
													{
														"id":"dateBox","comp":
														{
															"name":"HBox","items":
															[
																{
																	"data":"date","comp":
																	{
																		"name":"NewsDate3"
																	}
																}
															]
														},
														"layout":
														{
															"min-width":80
														}
													}
												]
											}
										},
										{
											"comp":
											{
												"name":"VBox","items":
												[
													{
														"data":"title","comp":
														{
															"name":"Label"
														}
													}
												]
											},
											"layout":
											{
												"box-flex":1
											}
										}
									]
								}
							}
						]
					}
				}
			]
		},
		"customizations":
		[
			{
				"priority":98,"fieldId":"dateBox","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_date@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":90,"fieldId":"dateBox","key":"layout.min-width","input":
				{
					"name":"slider","maxVal":"300","minVal":"50","label":"@Customize_Date_item_spacing@"
				}
			}
		]
	},
	{
		"name":
		[
			"SimpleVList","ImageVList","DateVList"
		],
		"forType":"ItemList","format":"Mobile","comp":
		{
			"name":"VBox","items":
			[
				{
					"data":"title","comp":
					{
						"name":"Label"
					},
					"layout":
					{
						"spacerAfter":22
					}
				},
				{
					"data":"items","comp":
					{
						"name":"VerticalList","isStyleEditable":"false","templates":
						{
							"item":
							{
								"comp":
								{
									"name":"VBox","items":
									[
										{
											"comp":
											{
												"name":
												{
													"$expr":"$viewName"
												}
											}
										},
										{
											"id":"inline-news-spacer","comp":
											{
												"name":"VSpacer","size":"30"
											}
										}
									]
								}
							},
							"last":
							{
								"comp":
								{
									"name":"VBox","items":
									[
										{
											"comp":
											{
												"name":
												{
													"$expr":"$viewName"
												}
											}
										}
									]
								}
							}
						}
					}
				}
			]
		},
		"customizations":
		[
			{
				"priority":109,"fieldId":"title","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_section_title@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":111,"fieldId":"title","key":"layout.spacerAfter","input":
				{
					"name":"slider","maxVal":"300","minVal":"0","label":"@Customize_Section_title_spacing@"
				}
			},
			{
				"priority":95,"fieldId":"inline-news-spacer","key":"comp.size","input":
				{
					"name":"slider","maxVal":"300","minVal":"0","label":"@Customize_Item_spacing@"
				}
			}
		]
	},
	{
		"name":
		[
			"SimpleVList","ImageVList","DateVList"
		],
		"forType":"Item","format":"Mobile","comp":
		{
			"name":"ZoomLink","orientation":"horizontal","box-align":"left","listExpression":"parent.parent.items","items":
			[
				{
					"comp":
					{
						"name":"VBox","items":
						[
							{
								"data":"title","comp":
								{
									"name":"ClippedParagraph","maxLines":"2"
								},
								"layout":
								{
									"spacerAfter":2
								}
							},
							{
								"data":"$viewName","comp":
								{
									"name":"SwitchBox","cases":
									{
										"SimpleVList":
										[
											{
												"comp":
												{
													"name":"DateAndSource1","vars":
													{
														"viewIndex":1
													}
												}
											}
										],
										"ImageVList":
										[
											{
												"comp":
												{
													"name":"DateAndSource2","vars":
													{
														"viewIndex":2
													}
												}
											}
										],
										"DateVList":
										[
											{
												"comp":
												{
													"name":"DateAndSource3","vars":
													{
														"viewIndex":3
													}
												}
											}
										]
									}
								}
							},
							{
								"id":"date-image-spacer","comp":
								{
									"name":"VSpacer","size":"10"
								}
							},
							{
								"data":"image","comp":
								{
									"name":"Image","style":"wp2","imageMode":"fill"
								},
								"layout":
								{
									"height":240,"width":"100%"
								}
							},
							{
								"id":"image-content-spacer","comp":
								{
									"name":"VSpacer","size":"10"
								}
							},
							{
								"data":"content","comp":
								{
									"name":"ClippedParagraph","maxLines":"4"
								}
							}
						]
					},
					"layout":
					{
						"box-flex":1
					}
				}
			]
		},
		"customizations":
		[
			{
				"priority":86,"fieldId":"image","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_image@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":84,"fieldId":"image","key":"layout.height","input":
				{
					"name":"slider","maxVal":"300","minVal":"1","label":"@Customize_Image_height@"
				}
			},
			{
				"priority":82,"fieldId":"date-image-spacer","key":"comp.size","input":
				{
					"name":"slider","maxVal":"300","minVal":"0","label":"@Customize_image_before_spacing@"
				}
			},
			{
				"priority":81,"fieldId":"image-content-spacer","key":"comp.size","input":
				{
					"name":"slider","maxVal":"300","minVal":"0","label":"@Customize_image_after_spacing@"
				}
			},
			{
				"priority":85,"fieldId":"content","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_story@","defaultVal":"false","trueVal":"false"
				}
			},
			{
				"priority":80,"fieldId":"content","key":"comp.maxLines","input":
				{
					"name":"slider","maxVal":"5","minVal":"1","label":"@Customize_Maximum_story_lines@"
				}
			}
		]
	},
	{
		"name":"ZoomView","forType":"Item","comp":
		{
			"name":"ZoomLayout","items":
			[
				{
					"comp":
					{
						"name":"VBox","items":
						[
							{
								"data":"title","comp":
								{
									"name":"Label"
								}
							},
							{
								"comp":
								{
									"name":"DateAndSource1"
								}
							},
							{
								"data":"image.src","comp":
								{
									"name":"SwitchBox","cases":
									{
										"default":
										[
											{
												"comp":
												{
													"name":"VBox","items":
													[
														{
															"data":"image","comp":
															{
																"name":"Image","imageMode":"fitWidth"
															},
															"layout":
															{
																"spacerBefore":25
															}
														}
													]
												}
											}
										],
										"2f7b76_f3e0b18a805017bb5c34c633f3fd93bc.png":
										[
										]
									}
								},
								"layout":
								{
									"min-width":300
								}
							},
							{
								"data":"content","comp":
								{
									"name":"Label"
								},
								"layout":
								{
									"spacerBefore":20,"spacerAfter":25
								}
							}
						],
						"css":
						{
							"height":"100%","padding":10,"min-width":320
						}
					}
				}
			],
			"css":
			{
				"text-align":"left"
			}
		}
	},
	{
		"name":"ZoomView","forType":"Item","format":"Mobile","comp":
		{
			"name":"MobileZoomView"
		}
	},
	{
		"name":"MobileZoomView","forType":"Item","format":"Mobile","comp":
		{
			"name":"ZoomLayout","items":
			[
				{
					"comp":
					{
						"name":"HBox","items":
						[
							{
								"comp":
								{
									"name":"VBox","items":
									[
										{
											"comp":
											{
												"name":"VSpacer","size":"20"
											}
										},
										{
											"comp":
											{
												"name":"HBox","items":
												[
													{
														"data":"title","comp":
														{
															"name":"Label","color":"#ffffff","bold":"true","fontSize":"24"
														},
														"layout":
														{
															"spacerBefore":10,"spacerAfter":10
														}
													}
												]
											}
										},
										{
											"comp":
											{
												"name":"VSpacer","size":"5"
											}
										},
										{
											"comp":
											{
												"name":"HBox","items":
												[
													{
														"comp":
														{
															"name":"DateAndSource5"
														},
														"layout":
														{
															"spacerBefore":10,"spacerAfter":10
														}
													}
												]
											}
										},
										{
											"data":"image.src","comp":
											{
												"name":"SwitchBox","orientation":"horizontal","cases":
												{
													"default":
													[
														{
															"comp":
															{
																"name":"VBox","items":
																[
																	{
																		"data":"image","comp":
																		{
																			"name":"Image","imageMode":"fitWidth"
																		},
																		"layout":
																		{
																			"spacerBefore":20
																		}
																	}
																]
															},
															"layout":
															{
																"spacer":10,"width":300
															}
														}
													],
													"2f7b76_f3e0b18a805017bb5c34c633f3fd93bc.png":
													[
													]
												}
											}
										},
										{
											"comp":
											{
												"name":"VSpacer","size":"20"
											}
										},
										{
											"comp":
											{
												"name":"HBox","items":
												[
													{
														"data":"content","comp":
														{
															"name":"Label","color":"#ffffff","fontSize":"16"
														},
														"layout":
														{
															"spacerBefore":10,"spacerAfter":10
														}
													}
												]
											}
										},
										{
											"comp":
											{
												"name":"VSpacer","size":"20"
											}
										}
									]
								},
								"layout":
								{
									"box-flex":1,"text-align":"left"
								}
							}
						]
					}
				}
			],
			"css":
			{
				"text-align":"left"
			}
		},
		"customizations":
		[
			{
				"priority":86,"fieldId":"image","key":"comp.hidden","input":
				{
					"name":"checkbox","falseVal":"true","label":"@Customize_Show_image@","defaultVal":"false","trueVal":"false"
				}
			}
		]
	},
	{
		"name":"editorSummary","forType":"ItemList","comp":
		{
			"name":"VBox","items":
			[
				{
					"id":"summaryTitle","data":"title","comp":
					{
						"name":"Label","postfix":"<span class='typeName'> | @EditorSummary_News_Section@<\/span>","singleLine":"true"
					},
					"layout":
					{
						"spacerBefore":18,"spacerAfter":19
					}
				}
			],
			"css":
			{
				"height":54
			}
		}
	},
	{
		"name":"editorSummary","forType":"Item","comp":
		{
			"name":"HBox","items":
			[
				{
					"comp":
					{
						"name":"HBox","items":
						[
							{
								"comp":
								{
									"name":"VBox","items":
									[
										{
											"data":"image","comp":
											{
												"name":"Image"
											},
											"layout":
											{
												"spacer":"*","width":50,"height":50
											}
										}
									]
								},
								"layout":
								{
									"spacer":10
								}
							},
							{
								"comp":
								{
									"name":"VBox","items":
									[
										{
											"id":"summaryTitle","data":"title","comp":
											{
												"name":"UnstyledLabel","postfix":"<span class='typeName'> | @EditorSummary_News_item@<\/span>","singleLine":"true"
											},
											"layout":
											{
												"spacerBefore":3,"spacerAfter":3
											}
										},
										{
											"id":"summaryDescription","data":"content","comp":
											{
												"name":"UnstyledLabel","singleLine":"true"
											},
											"layout":
											{
												"spacerAfter":9
											}
										}
									]
								},
								"layout":
								{
									"box-flex":1
								}
							}
						]
					},
					"layout":
					{
						"box-flex":1,"spacerAfter":200
					}
				}
			],
			"css":
			{
				"height":54
			}
		}
	},
	{
		"name":"editorForm","forType":"ItemList","comp":
		{
			"name":"VBox","items":
			[
				{
					"id":"label","value":"@EditorForm_News_Title@","comp":
					{
						"name":"Label"
					}
				},
				{
					"data":"title","comp":
					{
						"name":"TextInput","placeholder":"@EditorForm_News_Title_Placeholder@"
					},
					"layout":
					{
						"spacerAfter":150
					}
				}
			],
			"css":
			{
				"width":"100%"
			}
		}
	},
	{
		"name":"editorForm","forType":"Item","comp":
		{
			"name":"VBox","items":
			[
				{
					"id":"label","value":"@EditorForm_News_Item_Title@","comp":
					{
						"name":"Label"
					}
				},
				{
					"data":"title","comp":
					{
						"name":"TextInput","placeholder":"@EditorForm_News_Item_Title_Placeholder@"
					},
					"layout":
					{
						"spacerAfter":5
					}
				},
				{
					"comp":
					{
						"name":"HBox","items":
						[
							{
								"comp":
								{
									"name":"VBox","items":
									[
										{
											"id":"label","value":"@EditorForm_News_Item_Image@","comp":
											{
												"name":"Label"
											}
										},
										{
											"data":"image","comp":
											{
												"name":"ImageSelector","defaultImage":
												{
													"_type":"wix:Image","title":"Default image","src":"2f7b76_f3e0b18a805017bb5c34c633f3fd93bc.png","width":1280,"height":960
												}
											},
											"layout":
											{
												"width":200,"height":120
											}
										}
									]
								}
							},
							{
								"comp":
								{
									"name":"VBox","items":
									[
										{
											"id":"label","value":"@EditorForm_News_Item_Date_Created@","comp":
											{
												"name":"Label"
											}
										},
										{
											"data":"date","comp":
											{
												"name":"DateEdit","allowEmpty":"false"
											},
											"layout":
											{
												"spacerAfter":"*","spacerBefore":6
											}
										},
										{
											"id":"label","value":"@EditorForm_News_Item_Source@","comp":
											{
												"name":"Label"
											}
										},
										{
											"comp":
											{
												"name":"HBox","items":
												[
													{
														"data":"newsSource","comp":
														{
															"name":"TextInput","placeholder":"@EditorForm_News_Item_Source_Description@"
														},
														"layout":
														{
															"box-flex":1,"spacerAfter":5
														}
													},
													{
														"comp":
														{
															"name":"VBox","items":
															[
																{
																	"data":"newsSourceLink","comp":
																	{
																		"name":"LinkSelector"
																	},
																	"layout":
																	{
																		"spacer":"*"
																	}
																}
															]
														}
													}
												]
											}
										}
									]
								},
								"layout":
								{
									"spacerBefore":30,"box-flex":1
								}
							}
						]
					},
					"layout":
					{
						"spacerAfter":5
					}
				},
				{
					"id":"label","value":"@EditorForm_News_Item_Description@","comp":
					{
						"name":"Label"
					}
				},
				{
					"data":"content","comp":
					{
						"name":"RichTextEditorInline","height":"240","css":
						{
							"width":512
						}
					}
				}
			],
			"css":
			{
				"width":518
			}
		}
	},
	{
		"name":"ErrorInEditor","forType":"Error","data":"code","comp":
		{
			"name":"SwitchBox","cases":
			{
				"default":
				[
					{
						"value":"@ERROR_MESSAGE_IN_EDITOR@","comp":
						{
							"name":"Label","isStyleEditable":"false"
						}
					}
				],
				"-1021":
				[
					{
						"comp":
						{
							"name":"VBox","box-align":"center","items":
							[
								{
									"value":
									{
										"_type":"wix:Image","src":"images/warning-icon.png","width":256,"height":256
									},
									"comp":
									{
										"name":"Image","isStyleEditable":"false"
									},
									"layout":
									{
										"spacerBefore":30,"spacerAfter":10,"width":64,"height":64
									}
								},
								{
									"value":"@ERROR_ITEM_NOT_FOUND_TITLE@","comp":
									{
										"name":"Label","style":"Heading M","isStyleEditable":"false","color":"#FFFFFF"
									},
									"layout":
									{
										"spacerAfter":10
									}
								},
								{
									"value":"@ERROR_ITEM_NOT_FOUND_DESCRIPTION@","comp":
									{
										"name":"Label","style":"Body M","isStyleEditable":"false","color":"#FFFFFF"
									},
									"layout":
									{
										"spacerAfter":10
									}
								},
								{
									"value":"@ERROR_ITEM_NOT_FOUND_DISCLAIMER@","comp":
									{
										"name":"Label","style":"Body XS","isStyleEditable":"false","color":"#FFFFFF","italic":"true"
									},
									"layout":
									{
										"spacerAfter":30
									}
								}
							],
							"css":
							{
								"background-color":"red"
							}
						}
					}
				]
			}
		}
	},
	{
		"name":"ErrorInPublished","forType":"Error","data":"code","comp":
		{
			"name":"SwitchBox","cases":
			{
				"default":
				[
					{
						"value":"@ERROR_MESSAGE_IN_PUBLISHED@","comp":
						{
							"name":"Label","isStyleEditable":"false"
						}
					}
				],
				"-1021":
				[
				]
			}
		}
	}
]

// End generated views
    ),
    "customizations": [
        { "forType": "Item", "view": "ZoomView",        "fieldId": "title", "key": "comp.style",   "value": "Heading S" },
        { "forType": "Item", "view": "ZoomView",        "fieldId": "date", "key": "comp.style",     "value": "Body S" },
        { "forType": "Item", "view": "ZoomView",        "fieldId": "content", "key": "comp.style",  "value": "Body M" },
//        { "forType": "Item", "view": "MobileZoomView",        "fieldId": "title", "key": "comp.style",   "value": "Heading S" },
//        { "forType": "Item", "view": "MobileZoomView",        "fieldId": "date", "key": "comp.style",     "value": "Body S" },
//        { "forType": "Item", "view": "MobileZoomView",        "fieldId": "content", "key": "comp.style",  "value": "Body M" },
        { "forType": "Item", "view": "SimpleVList",        "fieldId": "title", "key": "comp.style",   "value": "Heading S" },
        { "forType": "Item", "view": "SimpleVList",        "fieldId": "date", "key": "comp.style",     "value": "Body S" },
        { "forType": "Item", "view": "SimpleVList",        "fieldId": "content", "key": "comp.style",  "value": "Body M" },
        { "forType": "ItemList", "view": "SimpleVList",   "fieldId": "title", "key": "comp.style",  "value": "Heading M" },

        { "forType": "Item", "view": "ImageVList",        "fieldId": "title", "key": "comp.style",   "value": "Heading S" },
        { "forType": "Item", "view": "ImageVList",        "fieldId": "date", "key": "comp.style",     "value": "Body S" },
        { "forType": "Item", "view": "ImageVList",        "fieldId": "content", "key": "comp.style",  "value": "Body M" },
        { "forType": "ItemList", "view": "ImageVList",   "fieldId": "title", "key": "comp.style",  "value": "Heading M" },

        { "forType": "Item", "view": "DateVList",        "fieldId": "title", "key": "comp.style",   "value": "Heading S" },
        { "forType": "Item", "view": "DateVList",        "fieldId": "date", "key": "comp.style",     "value": "Body S" },
        { "forType": "Item", "view": "DateVList",        "fieldId": "content", "key": "comp.style",  "value": "Body M" },
        { "forType": "ItemList", "view": "DateVList",   "fieldId": "title", "key": "comp.style",  "value": "Heading M" },

        //editing customizations
        { "forType": "*", "view": "editorSummary", "fieldId": "summaryTitle", "key": "comp.cssClass", "value": "headingGrey16" },
        { "forType": "*", "view": "editorSummary", "fieldId": "summaryDescription", "key": "comp.cssClass", "value": "textItalic14" },
        { "forType": "ItemList", "view": "editorSummary", "fieldId": "summaryTitle", "key": "comp.cssClass", "value": "headingGrey18" },
        { "forType": "*", "view": "editorForm", "fieldId": "label", "key": "comp.cssClass", "value": "labelStyle" },

// =============================================================
// Customizations for [news] component [ppPrt0] view [SimpleVList]
// =============================================================
        { "forType": "wix:Date", "view": "NewsDate1", "fieldId": "date", "key": "comp.format", "value": "longDate" },
        { "forType": "ItemList", "view": "SimpleVList", "fieldId": "title", "key": "layout.spacerAfter", "value": "10" },
        { "forType": "Item", "view": "DateAndSource1", "fieldId": "dateNameSwitch", "key": "layout.spacerBefore", "value": "0" },
        { "forType": "Item", "view": "DateAndSource1", "fieldId": "def_10", "key": "layout.spacerAfter", "value": "8" },
        { "forType": "ItemList", "view": "SimpleVList", "fieldId": "inline-news-spacer", "key": "comp.size", "value": "25" },
        { "forType": "Item", "view": "DateAndSource1", "fieldId": "contentBox", "key": "layout.spacerAfter", "value": "12" },
        { "forType": "ItemList", "view": "SimpleVList", "fieldId": "title", "key": "comp.style", "value": "Heading M" },
        { "forType": "Item", "view": "SimpleVList", "fieldId": "title", "key": "comp.style", "value": "Heading S" },
        { "forType": "wix:Date", "view": "NewsDate1", "fieldId": "date", "key": "comp.style", "value": "Body S" },
        { "forType": "Item", "view": "NewsSourceView1", "fieldId": "newsSource", "key": "comp.style", "value": "Body S" },
        { "forType": "Item", "view": "SimpleVList", "fieldId": "content", "key": "comp.style", "value": "Body M" },
        { "forType": "ItemList", "view": "SimpleVList", "fieldId": "items", "key": "comp.style", "value": "vr1" },
// =============================================================
// Customizations for [news] component [ppPrt1] view [ImageVList]
// =============================================================
        { "forType": "ItemList", "view": "ImageVList", "fieldId": "title", "key": "layout.spacerAfter", "value": "10" },
        { "forType": "Item", "view": "ImageVList", "fieldId": "title", "key": "layout.spacerAfter", "value": "2" },
        { "forType": "Item", "view": "DateAndSource2", "fieldId": "def_10", "key": "layout.spacerAfter", "value": "6" },
        { "forType": "ItemList", "view": "ImageVList", "fieldId": "inline-news-spacer", "key": "comp.size", "value": "29" },
        { "forType": "ItemList", "view": "ImageVList", "fieldId": "title", "key": "comp.style", "value": "Heading M" },
        { "forType": "Item", "view": "ImageVList", "fieldId": "image", "key": "comp.style", "value": "wp2" },
        { "forType": "Item", "view": "ImageVList", "fieldId": "title", "key": "comp.style", "value": "Heading S" },
        { "forType": "wix:Date", "view": "NewsDate2", "fieldId": "date", "key": "comp.style", "value": "Body S" },
        { "forType": "Item", "view": "NewsSourceView2", "fieldId": "newsSource", "key": "comp.style", "value": "Body S" },
        { "forType": "Item", "view": "ImageVList", "fieldId": "content", "key": "comp.style", "value": "Body M" },
        { "forType": "wix:Date", "view": "NewsDate2", "fieldId": "date", "key": "comp.format", "value": "longDate" },
        { "forType": "ItemList", "view": "ImageVList", "fieldId": "items", "key": "comp.style", "value": "vr1" },
// =============================================================
// Customizations for [news] component [ppPrt2] view [DateVList]
// =============================================================
        { "forType": "ItemList", "view": "DateVList", "fieldId": "title", "key": "comp.style", "value": "Heading S" },
        { "forType": "wix:Date", "view": "NewsDate3", "fieldId": "date", "key": "comp.style", "value": "Body M" },
        { "forType": "Item", "view": "DateVList", "fieldId": "title", "key": "comp.style", "value": "Body M" },
        { "forType": "wix:Date", "view": "NewsDate3", "fieldId": "date", "key": "comp.format", "value": "mm/dd/yyyy" },
        { "forType": "ItemList", "view": "DateVList", "fieldId": "items", "key": "comp.style", "value": "vr1" },
        { "forType": "ItemList", "view": "DateVList", "fieldId": "inline-news-spacer", "key": "comp.size", "value": "30" },
        { "forType": "Item", "view": "DateVList", "fieldId": "dateBox", "key": "layout.width", "value": "80" },
 // =============================================================
// Customizations for [news] component [ppPrt1] view [MobileVList]
// =============================================================
        { "forType": "ItemList", "view": "MobileVList", "fieldId": "title", "mode": "view", "key": "layout.spacerAfter", "value": "30" },
        { "forType": "Item", "view": "MobileVList", "fieldId": "title", "mode": "view", "key": "layout.spacerAfter", "value": "2" },
        { "forType": "Item", "view": "DateAndSource4", "fieldId": "def_10", "mode": "view", "key": "layout.spacerAfter", "value": "6" },
        { "forType": "ItemList", "view": "MobileVList", "fieldId": "inline-news-spacer", "mode": "view", "key": "comp.size", "value": "20" },
        { "forType": "ItemList", "view": "MobileVList", "fieldId": "title", "mode": "view", "key": "comp.style", "value": "Heading M" },
        { "forType": "Item", "view": "MobileVList", "fieldId": "image", "mode": "view", "key": "comp.style", "value": "wp2" },
        { "forType": "Item", "view": "MobileVList", "fieldId": "title", "mode": "view", "key": "comp.style", "value": "Heading S" },
        { "forType": "wix:Date", "view": "NewsDate4", "fieldId": "date", "mode": "view", "key": "comp.style", "value": "Body S" },
        { "forType": "Item", "view": "NewsSourceView4", "fieldId": "newsSource", "mode": "view", "key": "comp.style", "value": "Body S" },
        { "forType": "Item", "view": "MobileVList", "fieldId": "content", "mode": "view", "key": "comp.style", "value": "Body M" },
        { "forType": "wix:Date", "view": "NewsDate4", "fieldId": "date", "mode": "*", "key": "comp.format", "value": "longDate" },
        { "forType": "ItemList", "view": "MobileVList", "fieldId": "items", "mode": "view", "key": "comp.style", "value": "vr1" },

// =============================================================
// Customizations for [news] component [ppPrt1] view [ZoomView]
// =============================================================
        { "forType": "Item", "view": "DateAndSource1", "fieldId": "contentBox", "key": "layout.spacerAfter", "value": "0" }


    ],
    "dataEditing": {
        logicParams: {
            dataSelection: {
                categoriesSelectionSort: {title:1},
                noCategoriesLabel: "@News_noCategoriesLabel@",
                addFirstCategoryLabel: "@News_addFirstCategoryLabel@",
                anotherCategoryLabel: "@News_anotherCategoryLabel@",
                inlineHelp: "@News_editing_inlineHelp@",
                newItemType: "ItemList",
                newItemOverrides: {title:"@News_Title_newItemOverrides@"},
                newItemCollection: "Lists",
                newItemErrorTitle: "@News_newItemErrorTitle@",
                newItemErrorDescription: "@News_newItemErrorDescription@"
            }
        },
        dataSelectionLabel:"@News_dataSelectionLabel@",
        dataEditingLabel:"@News_dataEditingLabel@",
        helpId: '/node/10695',
        itemEditingHelpId: '/node/10695',
        "categories": [
            {
                "name": "@News_Categories_itemEditing@",
                "newTypes": ["ItemList"],
                "height" : [300],
                "items": [
                    {"type": "tree",
                        "name": "Sections tree",
                        "treeId": "newsTree"}
                ]
            },
            {
                "name": "@News_News_Items_itemEditing@",
                "newTypes": [],
                "items": [
                    {   "type": "query",
                        "name": "@News_All_Items_itemEditing@",
                        "collectionId": "Items",
                        "filter": {},
                        "sort": {"title":1},
                        "skip": 0,
                        "limit": -1,
                        "isDefault":true,
                        defaultChildType: 'Item',
                        noResultsMessage: "@News_Items_noResultsMessage@"
                    } ,
                    { "type": "query",
                      "name": "@News_Items_Hidden_items@",
                      "collectionId": "Items",
                      "filter": {"parentRefs":{"$size":0}},
                      "sort": {"title":1},
                      "skip": 0, "limit": -1 ,
                      defaultChildType: 'Item'}
                ]
            }
        ],
        "trees": {
            "newsTree": {
                "collectionId": "Lists",
                "includedTypes": ["ItemList", "Item"],
                "topLevelSorting": {"title": 1}
            }
        },

        "typeMetaData": {
            "ItemList": {
                "friendlyName": "@News_Item_list_typeMetaData@",
                "validationMessages": {
                    "title": "@News_Item_list_validationMessages@"
                },
                "newItemTemplate": {
                    "_type": "ItemList",
                    "title": "",
                    "items": []
                },
                childrenField: 'items',
                "parentsTreeId": "newsTree",
                "collectionId": "Lists",
                "noChildrenMessage": '@News_Item_list_noChildrenMessage@'
            },

            "Item": {
                "friendlyName": "@News_Item_typeMetaData@",
                "validationMessages": {
                    "title": "@News_Item_validationMessages@",
                    "content": "@News_Item_content_validationMessages@"
                },
                "newItemTemplate": {
                    "_type": "Item",
                    "title": "",
                    "date": {_type:'wix:Date', iso: "1970-01-01T00:00:00.000Z" },
                    "content": {_type:'wix:RichText'},
                    "newsSource": ""
                },
                parentField: "parentRefs",
                "parentsTreeId": "newsTree",
                "collectionId": "Items",
                noChildrenMessage: " "
            }

        }
    }
});
