import parseFinanceData from "./QueryParse";

// This format the finance data to the vue-good-table-next format
const formatFinanceData = async () => {
    const data = await parseFinanceData();
    const formattedData = formatAsTable(data);
    return formattedData;
};

// The table should have the following columns:
// - Hotel name (string)
// - Rooms (number)
// - Occ (percentage)
// - ADR (dollars)
// - RevPar (dollars)
// - Total Rev (dollars)
// - GOP (dollars)
// - GOP Margin (percentage)
// - EBITDA (dollars)
// - EBITDA Margin (percentage)
// - NOI (dollars)
// - NOI Margin (percentage)

function formatAsTable(data: any[]) {

    
    // This is a function that takes a number and returns a string
    const formatFn = (value: number) => {
        const fmtValue = value.toFixed(2);
        
        // We transform number like: 10582 to 10 582 with a regex
        return fmtValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const dollarFormatFn = (value: number) => {
        const formatted = formatFn(value);
        return `$${formatted}`;
    }
    
    // We do not have to format the percentage to two decimal places
    // because the vue-good-table-next library does it for us
    const columns = [
        { label: 'ID', field: 'id', type: 'number'},
        { label: 'Hotel name', field: 'hotelName', type: 'string' },
        { label: 'Rooms', field: 'rooms', type: 'number' },
        { label: 'Occ', field: 'occ', type: 'percentage' },
        { label: 'ADR', field: 'adr', type: 'number', formatFn: dollarFormatFn},
        { label: 'RevPar', field: 'revPar', type: 'number', formatFn: dollarFormatFn},
        { label: 'Total Rev', field: 'totalRev', type: 'number', formatFn: dollarFormatFn},
        { label: 'GOP', field: 'gop', type: 'number', formatFn: dollarFormatFn},
        { label: 'GOP Margin', field: 'gopMargin', type: 'percentage' },
        { label: 'EBITDA', field: 'ebitda', type: 'number', formatFn: dollarFormatFn},
        { label: 'EBITDA Margin', field: 'ebitdaMargin', type: 'percentage' },
        { label: 'NOI', field: 'noi', type: 'number', formatFn: dollarFormatFn},
        { label: 'NOI Margin', field: 'noiMargin', type: 'percentage' },
    ];

    // This is an idiomatic way of saying each row is a an object of the data
    // and we simply add it an id for the table to use
    const stats_rows = data.map((row, index) => ({ id: index + 1, ...row }));

    // This groups the original data together to allow us to add the average row
    // At the bottom of the table
    const rows = [
        {
          children: stats_rows
        },
      ];
    return { columns, rows };
}

export default formatFinanceData;