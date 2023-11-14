import { A, Route, Routes } from '@solidjs/router'
//import { createSignal } from 'solid-js'
import Travel from './components/travel'
import Finance from './components/finance'
import Wizard from './components/wizard'

const Home = () => <>Home</>

function App() {
  //const [count, setCount] = createSignal(0)

  return (
    <>
      <section class='bg-purple-950 text-white text-lg font-bold p-3 h-[50px]'>
        GPT Demos
      </section>
      <nav class='flex flex-row space-x-2 bg-purple-900 text-white font-semibold p-3 h-[65px]'>
        <A href="/" class='p-2 bg-purple-950 rounded hover:bg-purple-800 hover:underline'>Home</A>
        <A href="/travel" class='p-2 bg-purple-950 rounded hover:bg-purple-800 hover:underline'>Travel Guides</A>
        <A href="/finance" class='p-2 bg-purple-950 rounded hover:bg-purple-800 hover:underline'>Financial Advisor</A>
        <A href="/wizard" class='p-2 bg-purple-950 rounded hover:bg-purple-800 hover:underline'>Compute Wizard</A>
      </nav>
      <main class='w-full h-[calc(100vh-165px)] overflow-auto'>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/travel" component={Travel} />
          <Route path="/finance" component={Finance} />
          <Route path="/wizard" component={Wizard} />
        </Routes>
      </main>
      <footer class='h-[50px] bg-purple-950 text-white'>

      </footer>
    </>
  )
}

export default App
