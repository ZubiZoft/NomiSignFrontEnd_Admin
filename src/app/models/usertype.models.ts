export class UserType {
    public codes;

    constructor() {
        this.codes = [{system: 'HumanResources', display: 'Recursos Humanos'},
            {system: 'CompanyAdmin', display: 'Administrador de Compañía'},
            {system: 'GlobalAdmin', display: 'Adminitrador Global'}];
    }
}