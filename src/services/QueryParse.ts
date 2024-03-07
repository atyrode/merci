import getFinanceData from './ApiQuery';

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

export function parseFinanceData(financeData: any) {
    const parsedData = financeData.map((hotel: any) => {
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
        }
    })
    return parsedData;
}