package core

type NpmRegistryError struct {
	IsNpmRegistryError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewNpmRegistryError(code string, msg string, ctx *Context) *NpmRegistryError {
	return &NpmRegistryError{
		IsNpmRegistryError: true,
		Sdk:              "NpmRegistry",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *NpmRegistryError) Error() string {
	return e.Msg
}
