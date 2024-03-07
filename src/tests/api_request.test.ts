import { expect, test } from 'vitest'
import { getFinanceData } from '../components/api_request'

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