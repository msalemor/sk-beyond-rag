import { createSignal } from "solid-js"
import { AzureGpt4 } from "../services"

const Wizard = () => {
    const obj = {
        shiftLift: true,
        type: "Code",
        containers: true,
        osControl: false,
        springBoot: false,
        eventDriven: false,
        shortLived: false,
        orchestration: false,
        redHat: false,
        kubernetes: false,
        context: "",
        role: "",
    }
    let [input, setInput] = createSignal("")
    let [state, setState] = createSignal<any>(obj)
    let [recommendation, setRecommendation] = createSignal("")
    let [processing, setProcessing] = createSignal(false)

    const getContext = (): string => {
        let context = `You are a bot that can help recommend a compute option.
        
Azure services include Azure Virtual Machines, Azure Kubernetes Service, Azure Container Instances, Azure App Service, Azure Functions, Azure Batch, Azure Service Fabric, Azure Spring Cloud, Azure Red Hat OpenShift, Azure VMware Solution, Azure Stack, Azure Stack HCI, and Azure Stack Edge. Azure Virtual Machines is a good option for you if you need full IOS control or deploying a commercial application. Azure Kubernetes Service is a good option for you if you need full-fledge container orchestration. Azure Container Instances if you do not need full-fledge orchestration and need per second billing. Azure App Service is a good option for you if you have access to and are deploying code. Azure Functions is a good option for you if you are building an short-lived event-driven application. Azure Batch is a good option for you if you are running large-scale parallel and high-performance computing (HPC) applications efficiently in the cloud.`

        context += "\n\nCan you recommend the best compute option for my application?"
        if (state().shiftLift) {
            context += "I am shifting and lifting an application. "
        } else {
            context += "I am building a new application. "
        }
        if (state().type === "COTS") {
            context += "I am deploying a commercial application. "
        } else if (state().type === "Code") {
            context += "I am deploying code. "
        } else {
            context += "I am deploying containers. "
        }
        if (state().osControl) {
            context += "I need to control the OS ."
        } else {
            context += "I do not need to control the OS. "
        }
        if (state().springBoot) {
            context += "I am using Spring Boot. "
        }
        if (state().type === "Code" && state().eventDriven) {
            if (state().eventDriven) {
                context += "I am building an event-driven application or short-live application. "
            }
        }
        if (state().type === "Containers" && state().orchestration) {
            if (state().orchestration) {
                context += "I need full-fledge container orchestration. "
            } else {
                context += "I am new to containers. "
            }
        }
        return context
    }

    const process = async () => {
        if (processing()) return
        setProcessing(true)
        const content = getContext()
        const payload = {
            messages: [{
                role: "user",
                content
            }],
            max_tokens: 200,
            temperature: 0.3
        }
        setInput("...")
        try {
            const resp = await AzureGpt4(payload)
            const rawData = resp.choices[0].message.content
            if (rawData)
                setRecommendation(rawData)

        } finally {
            setInput("")
            setProcessing(false)
        }
    }

    return (<>
        <div class='container mx-auto flex flex-col space-y-4'>
            <div>
                <label class="font-bold text-2xl">Compute Wizard</label>
            </div>
            {recommendation() && <>
                <div><label class="text-xl font-bold">Recommendation</label></div>
                <div>
                    <textarea readOnly class="w-full p-2 bg-slate-300 rounded-lg" rows={5}>{recommendation()}</textarea>
                </div>
            </>}
            <div class="flex flex-row">
                <div class="basis-1/2">
                    <div class="bg-slate-300 flex flex-col basis-1/2 mt-3 p-4 text-lg rounded-xl">
                        <label mb-2>Are you shifting or lifting or building a new application?</label>
                        <div class="mb-2 flex flex-row">
                            <div class="flex flex-row place-items-center">
                                <input class="mr-2" type="radio" id="sl1" name="sl" value={"1"} onInput={(e) => setState({ ...state, shiftLift: (e.target.value == "1") })} checked={state().shiftLift} /> <label for="sl1">Shift and Lift</label>
                                <input class="ml-4 mr-2" type="radio" id="sl2" name="sl" value={"0"} onInput={(e) => setState({ ...state, shiftLift: (e.target.value == "1") })} checked={!state().shiftLift} /> <label for="sl2">New</label>
                            </div>
                        </div>
                        <label mb-2>Are you deploying a commercial application, code or containers?</label>
                        <div class="mb-2 flex flex-row">
                            <div class="flex flex-row place-items-center">
                                <input class="mr-2" type="radio" id="type1" name="type" value={"COTS"} onInput={(e) => setState({ ...state, type: e.target.value })} checked={state().type === "COTS"} /> <label for="type1">COTS</label>
                                <input class="ml-4 mr-2" type="radio" id="type2" name="type" value={"Code"} onInput={(e) => setState({ ...state, type: e.target.value })} checked={state().type === "Code"} /> <label for="type2">Code</label>
                                <input class="ml-4 mr-2" type="radio" id="type3" name="type" value={"Containers"} onInput={(e) => setState({ ...state, type: e.target.value })} checked={state().type === "Containers"} /> <label for="type3">Containers</label>
                            </div>
                        </div>
                        <div class="">
                            <label mb-2>Do you require full OS Control</label>
                            <div class="mb-2 flex flex-row place-items-center">
                                <input class="mr-2" type="radio" id="os1" name="os" value={"1"} onInput={(e) => setState({ ...state, osControl: (e.target.value == "1") })} checked={state().osControl} /> <label for="os1">Yes</label>
                                <input class="ml-4 mr-2" type="radio" id="os2" name="os" value={"0"} onInput={(e) => setState({ ...state, osControl: (e.target.value == "1") })} checked={!state().osControl} /> <label for="os2">No</label>
                            </div>
                        </div>
                        <div class="">
                            <label mb-2>Are you using Spring Boot apps?</label>
                            <div class="mb-2 flex flex-row place-items-center">
                                <input class="mr-2" type="radio" id="sp1" name="sp" value={"1"} onInput={(e) => setState({ ...state, springBoot: (e.target.value == "1") })} checked={state().springBoot} /> <label for="sp1">Yes</label>
                                <input class="ml-4 mr-2" type="radio" id="sp2" name="sp" value={"0"} onInput={(e) => setState({ ...state, springBoot: (e.target.value == "1") })} checked={!state().springBoot} /> <label for="sp2">No</label>
                            </div>
                        </div>
                        <div class={state().type === "Code" ? "visible" : "hidden"}>
                            <label mb-2>Is it an event-driven workload or short-lived process?</label>
                            <div class="mb-2 flex flex-row place-items-center">
                                <input class="mr-2" type="radio" id="evd1" name="evd" value={"1"} onInput={(e) => setState({ ...state, eventDriven: (e.target.value == "1") })} checked={state().eventDriven} /> <label for="evd1">Yes</label>
                                <input class="ml-4 mr-2" type="radio" id="evd2" name="evd" value={"0"} onInput={(e) => setState({ ...state, eventDriven: (e.target.value == "1") })} checked={!state().eventDriven} /> <label for="evd2">No</label>
                            </div>
                        </div>
                        <div class={state().type === "Containers" ? "visible" : "hidden"}>
                            <label mb-2>Need full fledge container orchestration?</label>
                            <div class="mb-2 flex flex-row place-items-center">
                                <input class="mr-2" type="radio" id="orch1" name="orch" value={"1"} onInput={(e) => setState({ ...state, orchestration: (e.target.value == "1") })} checked={state().orchestration} /> <label for="orch1">Yes</label>
                                <input class="ml-4 mr-2" type="radio" id="orch2" name="orch" value={"0"} onInput={(e) => setState({ ...state, orchestration: (e.target.value == "1") })} checked={!state().orchestration} /> <label for="orch2">No</label>
                            </div>
                        </div>
                        <div class={state().type === "Containers" ? "visible" : "hidden"}>
                            <label mb-2>Using Red Hat Openshift?</label>
                            <div class="mb-2 flex flex-row place-items-center">
                                <input class="mr-2" type="radio" id="rh1" name="rh" value={"1"} onInput={(e) => setState({ ...state, redHat: (e.target.value == "1") })} checked={state().redHat} /> <label for="rh1">Yes</label>
                                <input class="ml-4 mr-2" type="radio" id="rh2" name="rh" value={"0"} onInput={(e) => setState({ ...state, redHat: (e.target.value == "1") })} checked={!state().redHat} /> <label for="rh2">No</label>
                            </div>
                        </div>
                        <div class={state().type === "Containers" ? "visible" : "hidden"}>
                            <label mb-2>Familiar or expert using the Kubernetes API?</label>
                            <div class="mb-2 flex flex-row place-items-center">
                                <input class="mr-2" type="radio" id="kub1" name="kub" value={"1"} onInput={(e) => setState({ ...state, kubernetes: (e.target.value == "1") })} checked={state().kubernetes} /> <label for="kub1">Yes</label>
                                <input class="ml-4 mr-2" type="radio" id="kub2" name="kub" value={"0"} onInput={(e) => setState({ ...state, kubernetes: (e.target.value == "1") })} checked={!state().kubernetes} /> <label for="kub2">No</label>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={process}
                        class="bg-blue-700 p-2 rounded mt-2 text-white font-semibold hover:bg-blue-600">Process {input()}</button>

                </div>
                <div class="basis-1/2 p-2">
                    <img class="w-100" src="https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/images/compute-choices.png" />
                </div>
            </div>
        </div>
    </>)
}


export default Wizard