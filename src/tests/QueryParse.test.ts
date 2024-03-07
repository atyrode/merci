import { expect, test } from 'vitest'
import { parseFinanceData } from '../services/QueryParse'
import { getFinanceData } from '../services/ApiQuery'

test('parseFinanceData', async () => {
    const financeData = await getFinanceData()
    const parsedData = parseFinanceData(financeData)
    expect(parsedData).not.toBe(null)
})

test('parseFinanceData error', async () => {
    try {
        await parseFinanceData()
    } catch (error) {
        expect(error).not.toBe(null)
    }
})

// Expected data:
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

test('parseFinanceData has expected keys', async () => {
    const financeData = await getFinanceData()
    const parsedData = parseFinanceData(financeData)
    const parsedDataKeys = Object.keys(parsedData[0])
    expect(parsedDataKeys).toHaveLength(12)
    expect(parsedDataKeys).toStrictEqual([
        'hotelName',
        'rooms',
        'occ',
        'adr',
        'revPar',
        'totalRev',
        'gop',
        'gopMargin',
        'ebitda',
        'ebitdaMargin',
        'noi',
        'noiMargin'
    
    ])
})

test('parseFinanceData has expected types', async () => {
    const financeData = await getFinanceData()
    const parsedData = parseFinanceData(financeData)
    const expectedTypes = {
        hotelName: 'string',
        rooms: 'number',
        occ: 'number',
        adr: 'number',
        revPar: 'number',
        totalRev: 'number',
        gop: 'number',
        gopMargin: 'number',
        ebitda: 'number',
        ebitdaMargin: 'number',
        noi: 'number',
        noiMargin: 'number'
    }

    const parsedDataKeys = Object.keys(expectedTypes)
    expect(parsedDataKeys).toHaveLength(12)
    
    parsedDataKeys.forEach(key => {
        expect(typeof parsedData[0][key]).toBe(expectedTypes[key])
    })
})

function isPercentage(num: number) {
    return num >= 0 && num <= 1
}

test('parseFinanceData has expected values', async () => {
    const financeData = await getFinanceData()
    const parsedData = parseFinanceData(financeData)

    // Check that len of hotel name string is greater than 0
    expect(parsedData[0].hotelName.length).toBeGreaterThan(0)
    // There shouldn't be negative rooms
    expect(parsedData[0].rooms).toBeGreaterThanOrEqual(0)
    // Check that occ is a percentage
    expect(isPercentage(parsedData[0].occ)).toBeTruthy()
    // There shouldn't be negative adr
    expect(parsedData[0].adr).toBeGreaterThanOrEqual(0)
    // There shouldn't be negative revPar
    expect(parsedData[0].revPar).toBeGreaterThanOrEqual(0)
    // There shouldn't be negative totalRev
    expect(parsedData[0].totalRev).toBeGreaterThanOrEqual(0)
    // There can be a negative gop so we dont have any tests to run
    // Check that gopMargin is a percentage
    expect(isPercentage(parsedData[0].gopMargin)).toBeTruthy()
    // There can be a negative ebitda so we dont have any tests to run
    // Check that ebitdaMargin is a percentage
    expect(isPercentage(parsedData[0].ebitdaMargin)).toBeTruthy()
    // There can be a negative noi so we dont have any tests to run
    // Check that noiMargin is a percentage
    expect(isPercentage(parsedData[0].noiMargin)).toBeTruthy()
})