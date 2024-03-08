import getFinanceData from '../services/ApiQuery';

// We extract only the needed data from the finance data:
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

const parseFinanceData = async () => {
    const data = await getFinanceData(); // Wait for the API call to finish
    const processedData = processData(data);
    return processedData;
};

function processData(data: any) {
    data = data.map((hotel: any) => {
        return {
            hotelName: hotel.hotel_reference.display_name,
            rooms: hotel.hotel_reference.rooms,
            occ: hotel.occ,
            adr: hotel.adr,
            revPar: hotel.revpar,
            totalRev: hotel.total_revenue,
            gop: hotel.total_hotel_gop,
            gopMargin: hotel.gop_margin,
            ebitda: hotel.total_ebitda,
            ebitdaMargin: hotel.ebitda_margin,
            noi: hotel.noi,
            noiMargin: hotel.noi_margin
        };
    });
    return data;
}

export default parseFinanceData;