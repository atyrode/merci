import getFinanceData from '@/services/ApiQuery'
import { expect, test } from 'vitest'

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

test('getFinanceData must be awaited', async () => {
    const data = getFinanceData()
    expect(data).toBeInstanceOf(Promise)
})

test('getFinanceData returns an array', async () => {
    const data = await getFinanceData()
    expect(Array.isArray(data)).toBeTruthy()
})