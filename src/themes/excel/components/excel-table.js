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