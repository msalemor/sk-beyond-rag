import axios from "axios";
import { For, createSignal } from "solid-js";

export interface ITravel {
    city: string;
    airport: string;
    entry: string;
    currency: string;
    transportation: string;
    history: string;
    walking: string;
    attractions: string[];
    restaurants: string[];
    food: string[];
    bars: string[];
    pubs: string[];
    drinks: string[];
    parks: string[];
    beaches: string[];
    activities: string,
    trips: string;
    safety: string;
    hospitals: string[];
}

const prompt = `For {{$input}}:

Airport: Write a paragraph about closest major international airport and its code to downtown.
Entry: Write a paragraph about the visa entry requirements for visitors.
Currency: Write a paragraph the local currency.
Transportation: Write a long paragraph about what is the best way to get from the airport to downtown.
History: Write a detailed paragraph about the city's history.
Attractions: List the major attractions.
Walking: Write a very long paragraph about a four hour walking tour.
Restaurants: List some top restaurants and some dives?
Food: List some famous dishes and desserts?
Bars: List some famous bars.
Pubs: List some famous pubs.
Drinks: List some famous drinks.
Parks: List some parks in the city.
Beaches: List some beaches in the city.
Activities: Write about some fun activities.
Trips: Write a long paragraph about some day trips.
Safety: Write a long about safety concerns.
Hospitals: List some hospitals.

Output format: 
{
"city":"London, England",
"airport":"",
"entry":"",
"currency":"",
"transportation":"",
"history":"",
"walking":"",
"attractions":[""],
"restaurants":[""],
"food":[""],
"bars":[""],
"pubs":[""],
"drinks":[""],
"parks":[""],
"beaches":[""],
"activities":"",
"trips":"",
"safety":"",
"hospitals":[""]
}

Output in JSON format.`

const config = {
    headers: {
        'api-key': import.meta.env.VITE_API_KEY,
        'Content-Type': 'application/json'
    }
}

const Travel = () => {
    let [input, setInput] = createSignal("London, UK");
    let [completion, setCompletion] = createSignal<ITravel>();

    const process = async () => {
        const payload = {
            messages: [{
                role: "user",
                content: prompt.replace("{{$input}}", input())
            }],
            max_tokens: 1000,
            temperature: 0.3
        }
        try {
            console.info(import.meta.env.VITE_URI)
            const resp = await axios.post(import.meta.env.VITE_URI, payload, config)
            const json: ITravel = JSON.parse(resp.data.choices[0].message.content)
            if (json) {
                setCompletion(json)
                console.info(json)
            }
        } finally {
        }
    }

    return (
        <div class=''>
            <div class="flex flex-row space-x-2 items-center bg-purple-900 p-3 text-white">
                <label class="uppercase font-semibold">City, Country:</label>
                <input class="w-100 border rounded outline-none text-purple-950 p-1"
                    placeholder="London, England"
                    onInput={(e) => setInput(e.currentTarget.value)}
                    value={input()}
                ></input>
                <button
                    onclick={process}
                    class="p-2 bg-blue-700 hover:bg-blue-600 font-bold rounded">OK</button>
            </div>

            {completion() && <div class="container mx-auto">
                <div class='text-center py-5 px-10 font-bold text-xl'>{completion()?.city}</div>
                <hr />
                <div class='flex flex-col space-y-4'>
                    <label class='font-bold text-lg'>Airport</label>
                    <div>
                        <p>{completion()?.airport}</p>
                    </div>
                    <label class='font-bold text-lg'>Visitor Entry</label>
                    <div>
                        <p>{completion()?.entry}</p>
                    </div>
                    <label class='font-bold text-lg'>Currency</label>
                    <div>
                        <p>{completion()?.currency}</p>
                    </div>
                    <label class='font-bold text-lg'>Transportation</label>
                    <div>
                        <p>{completion()?.transportation}</p>
                    </div>
                    <label class='font-bold text-lg'>History</label>
                    <div>
                        <p>{completion()?.history}</p>
                    </div>
                    <div class='flex flex-row bg-purple-100'>
                        <div class="basis-1/4 p-2">
                            <label class='font-bold text-lg'>Attractions</label>
                            <div>
                                <For each={completion()?.attractions}>
                                    {(attraction) => <p>- {attraction}</p>}
                                </For>
                            </div>
                        </div>
                        <div class="basis-1/4 p-2">
                            <label class='font-bold text-lg'>Parks</label>
                            <div>
                                <For each={completion()?.parks}>
                                    {(park) => <p>- {park}</p>}
                                </For>
                            </div>
                        </div>
                        <div class="basis-1/4 p-2">
                            {completion()?.beaches.length && <>
                                <label class='font-bold text-lg'>Beaches</label>
                                <div>
                                    <For each={completion()?.beaches}>
                                        {(beach) => <p>- {beach}</p>}
                                    </For>
                                </div>
                            </>}
                        </div>
                    </div>
                    <div class='flex flex-row bg-purple-200'>
                        <div class="basis-1/4 p-2">
                            <label class='font-bold text-lg'>Restaurants</label>
                            <div>
                                <For each={completion()?.restaurants}>
                                    {(rest) => <p>- {rest}</p>}
                                </For>
                            </div>
                        </div>
                        <div class="basis-1/4 p-2">
                            <label class='font-bold text-lg'>Local Food</label>
                            <div>
                                <For each={completion()?.food}>
                                    {(item) => <p>- {item}</p>}
                                </For>
                            </div>
                        </div>
                        <div class="basis-1/4 p-2">
                            <label class='font-bold text-lg'>Bars</label>
                            <div>
                                <For each={completion()?.bars}>
                                    {(bar) => <p>- {bar}</p>}
                                </For>
                            </div>
                        </div>
                        <div class="basis-1/4 p-2">
                            <label class='font-bold text-lg'>Local Drinks</label>
                            <div>
                                <For each={completion()?.drinks}>
                                    {(drink) => <p>- {drink}</p>}
                                </For>
                            </div>
                        </div>
                    </div>

                    <label class='font-bold text-lg'>Walking Tour</label>
                    <div>
                        <p>{completion()?.walking}</p>
                    </div>
                    <label class='font-bold text-lg'>Activities</label>
                    <div>
                        <p>{completion()?.activities}</p>
                    </div>
                    <label class='font-bold text-lg'>Day Trips</label>
                    <div>
                        <p>{completion()?.trips}</p>
                    </div>
                    <label class='font-bold text-lg'>Safety</label>
                    <div>
                        <p>{completion()?.safety}</p>
                    </div>
                </div>
            </div>}

        </div>
    )
}



export default Travel