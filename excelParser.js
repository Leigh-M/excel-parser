const ExcelJS = require('exceljs');

const workbook = new ExcelJS.Workbook();

let data = [];
let jobTitles = /Python|python|node|nodejs|node|developer|software\.js/i;

workbook.xlsx.readFile("testData/Excel251.xlsx")
   .then(() => {
        const worksheet = workbook.getWorksheet(1);
        
        worksheet.eachRow (row => {
            const { values } = row; 

            if (jobTitles.test(values[3])) {
                data.push(row.values);
            }
        })
	})
	.then(() => {
        const matches_book = new ExcelJS.Workbook();
        const sheet1 = matches_book.addWorksheet();
        sheet1.addRows(data);

        matches_book.xlsx.writeFile('output/OUT.xlsx')
            .then(() => console.log ('Done!'));
    });
