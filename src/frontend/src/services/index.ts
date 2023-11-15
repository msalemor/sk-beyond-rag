import axios from 'axios'


const config3 = {
    headers: {
        'Content-Type': 'application/json',
        'api-key': import.meta.env.VITE_API_KEY,
    },
}

const config4 = {
    headers: {
        'Content-Type': 'application/json',
        'api-key': import.meta.env.VITE_API_KEY_4,
    },
}

export async function AzureGpt(
    payload: any
): Promise<any> {
    const req = await axios.post(import.meta.env.VITE_URI, payload, config3)
    return req.data
}

export async function AzureGpt4(
    payload: any
): Promise<any> {
    const req = await axios.post(import.meta.env.VITE_URI_4, payload, config4)
    return req.data
}

export function Sine(min: number, max: number, angle: number): number {
    const offset = (max - min) / 2.0 + min
    const amplitude = (max - min) / 2.0
    return offset + amplitude * Math.sin((angle * Math.PI) / 180.0)
}

export function UniqueList(min: number, max: number, count: number): number[] {
    let numbers: number[] = []
    while (numbers.length < count) {
        let number = Math.floor(Math.random() * (max - min + 1)) + min
        if (!numbers.includes(number)) {
            numbers.push(number)
        }
    }
    return numbers
}

export function Between(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + Math.floor(min)
}