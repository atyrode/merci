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
    const columns = [
        { label: 'Hotel name', field: 'hotelName', type: 'string' },
        { label: 'Rooms', field: 'rooms', type: 'number' },
        { label: 'Occ', field: 'occ', type: 'percentage' },
        { label: 'ADR', field: 'adr', type: 'number' },
        { label: 'RevPar', field: 'revPar', type: 'number' },
        { label: 'Total Rev', field: 'totalRev', type: 'number' },
        { label: 'GOP', field: 'gop', type: 'number' },
        { label: 'GOP Margin', field: 'gopMargin', type: 'percentage' },
        { label: 'EBITDA', field: 'ebitda', type: 'number' },
        { label: 'EBITDA Margin', field: 'ebitdaMargin', type: 'percentage' },
        { label: 'NOI', field: 'noi', type: 'number' },
        { label: 'NOI Margin', field: 'noiMargin', type: 'percentage' },
    ];

    // This is an idiomatic way of saying each row is a an object of the data
    // and we simply add it an id for the table to use
    const rows = data.map((row, index) => ({ id: index, ...row }));

    return { columns, rows };
}

export default formatFinanceData;