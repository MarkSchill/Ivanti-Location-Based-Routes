const excel = require('exceljs');

const COMPANY = 'Test Company';
const LOCATIONS = ['Location 1', 'Location 2', 'Location 3'];
const CATEGORIZATION = {
    'Service 1': {
        'Category 1': [
            'Subcategory 1',
            'Subcategory 2',
        ],
        'Category 2': [
            'Subcategory 1',
            'Subcategory 2',
        ],
    },
    'Service 2': {
        'Category 1': [
            'Subcategory 1',
            'Subcategory 2',
        ],
        'Category 2': [
            'Subcategory 1',
            'Subcategory 2',
        ],
    },
    'Service 3': {
        'Category 1': [
            'Subcategory 1',
            'Subcategory 2',
        ],
        'Category 2': [
            'Subcategory 1',
            'Subcategory 2',
        ],
    },
};


let routes = [];

for (let location of LOCATIONS) {
    for (let service in CATEGORIZATION) {
        for (let category in CATEGORIZATION[service]) {
            for (let subcategory of CATEGORIZATION[service][category]) {
                routes.push({
                    company: COMPANY,
                    parent: 'SubCategory',
                    location: location,
                    service: service,
                    category: category,
                    subcategory: subcategory,
                    group_bh: `${COMPANY} - ${location} - Desktop Services`,
                    group_ah: `${COMPANY} - ${location} - Desktop Services`,
                });
            }
        }
    }

}

const book = new excel.Workbook();
const sheet = book.addWorksheet();

sheet.columns = [
    { header: 'MSP_Sync', key: 'company' },
    { header: 'Parent_Sync', key: 'parent' },
    { header: 'Location_Sync', key: 'location' },
    { header: 'Service_Sync', key: 'service' },
    { header: 'Category_Sync', key: 'category' },
    { header: 'Subcategory_Sync', key: 'subcategory' },
    { header: 'EscalationTeamBH_Sync', key: 'group_bh' },
    { header: 'EscalationTeamAH_Sync', key: 'group_ah' },
];

for (let route of routes) {
    sheet.addRow(route);
}

const FILENAME = `${COMPANY}_LBR.xlsx`;
try {
    book.xlsx.writeFile(FILENAME);
} catch (err) {
    console.error(`Failed to write to the file "${FILENAME}".`)
}
