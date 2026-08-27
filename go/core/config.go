package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "NpmRegistry",
			"slug": "npm-registry",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://registry.npmjs.org",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"get_package": map[string]any{},
				"search": map[string]any{},
			},
		},
		"entity": map[string]any{
			"get_package": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"short": "Maintainer email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Maintainer username",
						"type": "`$STRING`",
					},
				},
				"name": "get_package",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "express",
											"kind": "param",
											"name": "id",
											"orig": "package",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{package}",
								"parts": []any{
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"package": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "package",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "score",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "searchScore",
						"short": "Overall search score",
						"type": "`$NUMBER`",
					},
				},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "from",
											"orig": "from",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0.5,
											"kind": "query",
											"name": "maintenance",
											"orig": "maintenance",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 0.98,
											"kind": "query",
											"name": "popularity",
											"orig": "popularity",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 0.65,
											"kind": "query",
											"name": "quality",
											"orig": "quality",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "size",
											"orig": "size",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "react",
											"kind": "query",
											"name": "text",
											"orig": "text",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/-/v1/search",
								"parts": []any{
									"-",
									"v1",
									"search",
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"maintenance",
										"popularity",
										"quality",
										"size",
										"text",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.objects`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
