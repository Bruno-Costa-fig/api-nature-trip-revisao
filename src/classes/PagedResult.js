class PagedRedult {
    constructor(data, page, pageSize, total) {
        this.data = data;
        this.page = page;
        this.pageSize = pageSize;
        this.total = total;
    }
}

module.exports = PagedRedult;