const XLSX = require('xlsx');

const getDirFiles = require('./getDirFiles');

const files = getDirFiles('./testData');

const excelData = [];
const jobTitlesRegex = /python|node|nodejs|node\.js|javascript|react|mern stack/ig;
// eslint-disable-next-line max-len
const sectorRegex = /health|healthcare|medical|bioengineer|bio engineer|bioscience|bio science|genetic|genomics|biotech|bio tech|bio/ig;

files.forEach(file => {
    const workbook = XLSX.readFile(`testData/${ file }`);
    const worksheet = workbook.Sheets.Sheet1;
    const gridSize = worksheet['!ref'];
    const [range] = gridSize.match(/[A-Z]\d+$/g);

    const colsRegex = /[A-Z]/g;
    const rowsRegex = /\d+/g;

    const [highestColChar] = range.match(colsRegex);
    const [rowsLength] = range.match(rowsRegex);

    const colsMap = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'
    ];

    const highestColIndex = colsMap.indexOf(highestColChar);


    for (let row = 2; row <= rowsLength; row++) {
        const rowData = [];

        if (jobTitlesRegex.test(worksheet[`C${ row }`].v)
            && (sectorRegex.test(worksheet[`B${ row }`].v) || sectorRegex.test(worksheet[`C${ row }`].v))
        ) {
            for (let col = 0; col < highestColIndex; col++) {
                if (worksheet[`B${ row }`] !== undefined
                    && worksheet[`C${ row }`].v !== undefined
                ) {
                    if (worksheet[`${ colsMap[col] }${ row }`] !== undefined
                    && worksheet[`${ colsMap[col] }${ row }`].v !== undefined
                    ) {
                        const cellValue = worksheet[`${ colsMap[col] }${ row }`].v;
                        rowData.push(cellValue);
                    } else {
                        rowData.push('');
                    }
                }
            }
        }

        excelData.push(rowData);
    }
});

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(excelData);
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

XLSX.writeFile(wb, 'out.xlsx');
