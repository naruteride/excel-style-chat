export default class ExcelTable extends HTMLTableElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.style.cssText = "white-space: nowrap; width: 100%; font-size: 13px; border-collapse: separate; border-spacing: 0;";
    }
}

customElements.define("excel-table", ExcelTable, { extends: "table" });

export class ExcelThead extends HTMLTableSectionElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.style.cssText = "position: sticky; top: 0; text-align: center; font-weight: 400; background-color: #fff;";
    }
}

customElements.define("excel-thead", ExcelThead, { extends: "thead" });

export class ExcelCrossedTh extends HTMLTableCellElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.style.cssText = "min-width: 2.5em; background-color: #F8F9FA; border-right: 0.25rem solid #C7C7C7;";
    }
}

customElements.define("excel-crossed-th", ExcelCrossedTh, { extends: "th" });