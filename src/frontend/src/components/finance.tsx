import { For, createSignal } from "solid-js"
import { AzureGpt4, Between } from "../services"

interface IPosition {
    ticker: string,
    name: string,
    shares: number,
    price: number,
    cost: number,
    value: number,
    gl: number,
}

const profile = {
    name: "Jane Doe",
    account: "X948519",
    tolerance: "Low"
}

const prompt = `You are an agent that can provide financial information. 

My investment portfolio is:
<PORTFOLIO>

Possible Investment not in my portfolio:
Ticker: SPAXX, Name: Money market, return: 5%, risk: low
Ticker: CD, Name:, Certificate of Deposit, return 6%, risk: low
Ticker: GOLD, Name: Barrick Gold, risk: high

If user asks for a recommendation, do not include high risk investments. 

<INPUT>

Do not provide commentaries. Use only the provided information.`

const positions: IPosition[] = [
    {
        ticker: "Cash",
        name: "Money Market",
        shares: 15000,
        price: 1,
        cost: 1,
        value: 15000,
        gl: 0,
    },
    {
        ticker: "AAPL",
        name: "Apple Inc",
        shares: Between(10, 15),
        price: Between(140, 180),
        cost: Between(110, 130),
        value: 0,
        gl: 0,
    },
    {
        ticker: "MSFT",
        name: "Microsoft Corp",
        shares: Between(100, 150),
        price: Between(340, 370),
        cost: Between(250, 300),
        value: 0,
        gl: 0,
    },
    {
        ticker: "AMZN",
        name: "Amazon.com Inc",
        shares: Between(10, 15),
        price: Between(140, 160),
        cost: Between(200, 210),
        value: 0,
        gl: 0,
    },
    {
        ticker: "FTEC",
        name: "Fidelity MSCI Information Technology Index ETF",
        shares: Between(500, 700),
        price: Between(112, 120),
        cost: Between(80, 90),
        value: 0,
        gl: 0,
    },
    {
        ticker: "T09345",
        name: "US Treasury Bill",
        shares: 9500,
        price: 1,
        cost: 1,
        value: 10000,
        gl: 0,
    }
]

const getPositionsCSV = (): string => {
    let csv = ""
    positions.forEach((position) => {
        if (position.ticker === "AAPL" || position.ticker === "MSFT" || position.ticker === "AMZN" || position.ticker === "FTEC") {
            position.value = position.price * position.shares
            position.gl = position.value - position.cost * position.shares
        }
        csv += `Ticker: ${position.ticker}, Shares: ${position.shares}, Price: ${position.price}, Cost: ${position.cost}, Value: ${position.value}, Gain/Loss: ${position.gl}\n`
    })
    return csv
}
getPositionsCSV()

interface IMessage {
    prompt: string
    result: string
}

const Finance = () => {
    let [input, setInput] = createSignal("");
    let [messages, setMessages] = createSignal<IMessage[]>([]);
    let [processing, setProcessing] = createSignal(false);

    const setColor = (gain: number): string => {
        if (gain === 0) return "text-black"
        if (gain > 0) return "text-green-700"
        return "text-red-500"
    }
    const getPositionsCSV = (): string => {
        let csv = ""
        positions.forEach((position) => {
            if (position.ticker === "AAPL" || position.ticker === "MSFT" || position.ticker === "AMZN" || position.ticker === "FTEC") {
                position.value = position.price * position.shares
                position.gl = position.value - position.cost * position.shares
            }
            csv += `Ticker: ${position.ticker}, Name: ${position.name}, Qty: ${position.shares}, Price: ${position.price}, Cost: ${position.cost}, Value: ${position.value}, GL: ${position.gl}\n`
        })
        return csv
    }
    let csv = getPositionsCSV()

    const process = async () => {
        if (processing()) return
        setProcessing(true)
        let content = prompt.replace("<INPUT>", input())
        content = content.replace("<PORTFOLIO>", csv)
        const oQuestion = input()
        const payload = {
            messages: [{
                role: "user",
                content
            }],
            max_tokens: 200,
            temperature: 0.3
        }
        setInput("Processing ...")
        try {

            const resp = await AzureGpt4(payload)
            const rawData = resp.choices[0].message.content
            if (rawData)
                setMessages([...messages(), { prompt: oQuestion, result: rawData }])

        } finally {
            setInput("")
            setProcessing(false)
        }
    }


    return (
        <div class="container mx-auto flex flex-col space-y-4">
            <div>
                <label class="font-bold text-2xl">Financial Advisor</label>
            </div>
            <div class='flex flex-row'>
                <div class="basis-3/4 div flex-col p-6 w-full space-y-2">
                    <label class="text-2xl font-bold">All Accounts</label>
                    <div class="space-x-2">
                        <label class="uppercase font-semibold">Name:</label>
                        <label>{profile.name}</label>
                    </div>
                    <div class="space-x-2">
                        <label class="uppercase font-semibold">Account:</label>
                        <label>{profile.account}</label>
                        <label class="uppercase font-semibold">Tolerance:</label>
                        <label class=" text-green-700">{profile.tolerance}</label>
                    </div>
                    <table class="w-full border-4 border-black bg-slate-50">
                        <thead>
                            <tr class=" text-sm">
                                <th></th>
                                <th>Last Price</th>
                                <th>Quantity</th>
                                <th>Cost Basis</th>
                                <th>Current Value</th>
                                <th>Gain/Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            <For each={positions}>
                                {(position) => <tr class={"border"}>
                                    <td class="w-40 text-ellipsis"><span class="font-bold">{position.ticker}</span><br />{position.name}</td>
                                    <td class="text-right">{position.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                    <td class="text-right">{position.shares.toFixed(2)}</td>
                                    <td class="text-right">{position.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                    <td class="text-right">{position.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                    <td class={"text-right " + setColor(position.gl)}>{position.gl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                </tr>}
                            </For>
                        </tbody>
                    </table>
                </div>
                <div class="basis-1/4 p-2">
                    <label class="font-bold">Financial Advisor Bot</label>
                    <textarea class="w-full bg-purple-100 rounded p-1 outline-none"
                        oninput={(e) => setInput(e.currentTarget.value)}
                        value={input()}
                        placeholder="Type your question here"
                        rows={3}></textarea>
                    <button
                        onclick={process}
                        class="w-12 p-1 bg-orange-700 rounder text-white font-semibold rounded"
                    >OK</button>
                    <div class="flex flex-col space-y-2 mt-2">
                        <For each={messages()}>
                            {(message) => <div class="flex flex-col space-y-2">
                                <div class="rounded-lg p-[5px] w-3/4 bg-purple-300 font-semibold">{message.prompt}</div>
                                <div class="rounded-lg p-[5px] w-3/4 bg-purple-400 ml-auto">{message.result}</div>
                            </div>}
                        </For>
                    </div>
                </div>

            </div>
        </div>
    )
}



export default Finance