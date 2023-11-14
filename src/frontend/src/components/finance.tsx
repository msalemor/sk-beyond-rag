import { For } from "solid-js"

interface IPosition {
    ticker: string,
    name: string,
    quantity: number,
    lastPrice: number,
    costBasis: number,
    marketValue: number,
    gain: number,
}

const profile = {
    name: "Jane Doe",
    account: "X948519",
    tolerance: "Moderate"
}

const positions: IPosition[] = [
    {
        ticker: "Cash",
        name: "Money Market",
        quantity: 15000,
        lastPrice: 1,
        costBasis: 1,
        marketValue: 15000,
        gain: 0,
    },
    {
        ticker: "AAPL",
        name: "Apple Inc",
        quantity: 10,
        lastPrice: 180,
        costBasis: 120,
        marketValue: 1800,
        gain: 600,
    },
    {
        ticker: "MSFT",
        name: "Microsoft Corp",
        quantity: 50,
        lastPrice: 100,
        costBasis: 100,
        marketValue: 100,
        gain: 0,
    },
    {
        ticker: "AMZN",
        name: "Amazon.com Inc",
        quantity: 75,
        lastPrice: 100,
        costBasis: 100,
        marketValue: 100,
        gain: 0,
    },
    {
        ticker: "FTEC",
        name: "Fidelity MSCI Information Technology Index ETF",
        quantity: 200,
        lastPrice: 100,
        costBasis: 100,
        marketValue: 100,
        gain: 0,
    },
    {
        ticker: "09345",
        name: "US Treasury Bill",
        quantity: 9500,
        lastPrice: 1,
        costBasis: 1,
        marketValue: 10000,
        gain: 0,
    }
]

const Finance = () => {
    const setColor = (gain: number): string => {
        if (gain === 0) return "text-black"
        if (gain > 0) return "text-green-700"
        return "text-red-500"
    }
    return (
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
                    <label class=" text-yellow-700">{profile.tolerance}</label>
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
                                <td class="text-right">{position.lastPrice.toFixed(2)}</td>
                                <td class="text-right">{position.quantity.toFixed(2)}</td>
                                <td class="text-right">{position.costBasis.toFixed(2)}</td>
                                <td class="text-right">{position.marketValue.toFixed(2)}</td>
                                <td class={"text-right " + setColor(position.gain)}>{position.gain.toFixed(2)}</td>
                            </tr>}
                        </For>
                    </tbody>
                </table>
            </div>
            <div class="basis-1/4 bg-purple-100">
                Advisor
            </div>

        </div>
    )
}



export default Finance