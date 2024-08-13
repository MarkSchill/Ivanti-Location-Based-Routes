const fs = require('node:fs');
const excel = require('exceljs');

let config;
let map;

let routes = [];

try {
    let data = fs.readFileSync('./config.json', { encoding: 'utf-8' })
    config = JSON.parse(data);
    
    map = config.maps.find((obj) => obj.company == config.company);
    if (map === undefined) {
        throw new Error(`Cannot locate the map for company ${config.company}`);
    }
} catch (error) {
    console.error(error);
    process.exit();
}

for (let location of map.map) {
    for (let service in config.categorization) {
        for (let category in config.categorization[service]) {
            for (let subcategory of config.categorization[service][category]) {
                routes.push({
                    company: config.company,
                    parent: 'SubCategory',
                    location: location.name,
                    service: service,
                    category: category,
                    subcategory: subcategory,
                    group_bh: location.group,
                    group_ah: location.group,
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

const date = new Date();
const FILENAME = `./output/${config.company}_${date.toDateString()}_LBR.xlsx`;
try {
    book.xlsx.writeFile(FILENAME);
} catch (err) {
    console.error(`Failed to write to the file "${FILENAME}".`)
}
