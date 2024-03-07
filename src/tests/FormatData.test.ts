import { expect, test } from 'vitest';
import formatFinanceData from '../services/FormatData';
import parseFinanceData from '../services/QueryParse';

test('formatFinanceData', async () => {
    const data = await formatFinanceData()
    expect(data).not.toBe(null)
})

test('formatFinanceData error', async () => {
    try {
        await formatFinanceData()
    } catch (error) {
        expect(error).not.toBe(null)
    }
})

test('formatFinanceData to have a matching column field per data field', async () => {
    const parsedFinanceData = await parseFinanceData();
    const parsedFinanceKeys = Object.keys(parsedFinanceData[0]);

    const formattedFinanceData = await formatFinanceData();
    const formattedFinanceKeys = formattedFinanceData.columns.map((column: any) => column.field);

    expect(parsedFinanceKeys).toHaveLength(formattedFinanceKeys.length);
    expect(parsedFinanceKeys).toStrictEqual(formattedFinanceKeys);
})

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

test('formatFinanceData has expected column type per data type', async () => {
    const formattedFinanceData = await formatFinanceData();
    const columns = formattedFinanceData.columns;

    const shouldBePercentage = ['occ', 'gopMargin', 'ebitdaMargin', 'noiMargin']
    const shouldBeNumber = ['rooms', 'adr', 'revPar', 'totalRev', 'gop', 'ebitda', 'noi']
    const shouldBeString = ['hotelName']

    shouldBePercentage.forEach((key) => {
        const column = columns.find((column: any) => column.field === key)
        // Expect not to be undefined
        if (!column) {
            throw new Error(`Column ${key} not found`)
        }
        expect(column.type).toBe('percentage')
    })

    shouldBeNumber.forEach((key) => {
        const column = columns.find((column: any) => column.field === key)
        // Expect not to be undefined
        if (!column) {
            throw new Error(`Column ${key} not found`)
        }
        expect(column.type).toBe('number')
    })

    shouldBeString.forEach((key) => {
        const column = columns.find((column: any) => column.field === key)
        // Expect not to be undefined
        if (!column) {
            throw new Error(`Column ${key} not found`)
        }
        expect(column.type).toBe('string')
    })
})

function isPercentage(num: number) {
    return num >= -1 && num <= 1
}

test('formatFinanceData data row fits in the columns', async () => {
    const formattedFinanceData = await formatFinanceData();
    const columns = formattedFinanceData.columns;
    const rows = formattedFinanceData.rows;

    rows.forEach((row: any) => {
        Object.keys(row).forEach((key) => {
            const column = columns.find((column: any) => column.field === key)
            // Expect not to be undefined and we skip column "id"
            if (key === 'id') {
                return
            }
            if (!column) {
                throw new Error(`Column ${key} not found`)
            }
            if (column.type === 'percentage') {
                expect(isPercentage(row[key])).toBeTruthy();
            }
            if (column.type === 'number') {
                expect(row[key]).toBeTypeOf('number')
            }
            if (column.type === 'string') {
                expect(row[key]).toBeTypeOf('string')
            }
        })
    })
})