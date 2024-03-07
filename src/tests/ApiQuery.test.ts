import { expect, test } from 'vitest'
import { getFinanceData } from '../services/ApiQuery'

test('getFinanceData', async () => {
    const data = await getFinanceData()
    expect(data).not.toBe(null)
})

test('getFinanceData error', async () => {
    try {
        await getFinanceData()
    } catch (error) {
        expect(error).not.toBe(null)
    }
})

test('getFinanceData not null', async () => {
    const data = await getFinanceData()
    expect(data).not.toBe(null)
})