import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import './App.css'

function App() {
  const [initial, setInitial] = useState(`                                    
  ##    #   ##   # #    #    #     #  ####   ####   ####    ##   # #    # 
  # #   #  #  #  # ##  ##    #     # #    # #      #       #  #  # ##   # 
  #  #  # #    # # # ## #    ####### #    #  ####   ####  #    # # # #  # 
  #   # # ###### # #    #    #     # #    #      #      # ###### # #  # # 
  #    ## #    # # #    #    #     # #    # #    # #    # #    # # #   ## 
  #     # #    # # #    #    #     #  ####   ####   ####  #    # # #    # `)
  const [input, setInput] = useState()
  const [output, setOuput] = useState([])
  const [commant, setCommant] = useState([])

  const terminalRef = useRef(null)

  const date = Date.now()
  const currentdate = `${new Date(date).getDate()} - ${new Date(date).toLocaleString('default', { month: "long" })} - ${new Date(date).getFullYear()}`
  console.log(currentdate)
  const handdleInput = (e) => {

    const aboutContent = [
      { key: "Name", value: "Md Naim Hossain" },
      { key: "Position", value: "MERN Stake developer" },
      { key: "Email", value: "naim1997dec1@gmail.com" },
      { key: "Education", value: " B.sc in Electrical & Electronics Engineering" },
      { key: "Mobile", value: "01688371189" },
    ]

    const skillContent = [
      { key: "Font-end", value: "Html , css ,scss , Javascript , TypeScript, react js , Redux, MUI" },
      { key: "Back-end", value: "Mongodb , Express Js, Node js ,Postman, git" },
    ]

    const helpContent = [
      { key: "about", value: "about of developer" },
      { key: "projects", value: "recent project list" },
      { key: "skill", value: "skill of developer" },
      { key: "date", value: "get current local date" },
      { key: "cls", value: "clear terminal" },
    ]




    if (e.key === "Enter") {
      switch (input.toLowerCase()) {
        case "help":
          setCommant([...commant, input])
          setOuput([...output, { type: 'command', content: helpContent }]);
          setInput('')
          setInitial(null)
          break;

        case "about":

          setCommant([...commant, input])
          setOuput([...output,
          { type: 'command', content: aboutContent }])
          setInput("")
          setInitial(null)
          break;

        case "skill":
          setCommant([...commant, input])
          setOuput([...output,
          { type: 'command', content: skillContent }])
          setInput("")
          setInitial(null)
          break;
        case "projects":
          setCommant([...commant, input])
          setOuput([...output,
          { type: 'text', content:'https://github.com/naimhossain0181?tab=repositories' }])
          setInput("")
          setInitial(null)
          break;

        case "date":
          setCommant([...commant, input])
          setOuput([...output,
          { type: 'text', content: currentdate }])
          setInput("")
          setInitial(null)
          break;

        case "cls":
          setCommant([])
          setOuput([])
          setInput("")
          setInitial(null)
          break;

        default:
          setCommant([...commant, input])
          setOuput([...output, { type: 'text', content: `${input} command not found` }])
          setInput("")
          setInitial(null)
          break;
      }
    }
  }

  useEffect(() => {
    const input = document.getElementById("input")
    input.focus()
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [output])

  const container = {
    hidden: {
      opacity: 0
    },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delay: 0.04 * i }
    })
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0
    },
    hidden: {
      opacity: 0,
      y: 20
    },
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  };

  return (
    <div className='main'>
      <div className='terminal' ref={terminalRef}>
        {initial ? <>
          <pre className='initial'>{initial}</pre>
          <p className='initial-help'>Awsome ! Type 'help' for all command</p>
        </> : ""}

        {
          output?.map((outputItem, index) => {

            return (
              <motion.p variants={container} initial="hidden" animate="visible" key={index}>
                {
                  commant[index] ? <p key={index} className='output'>{commant[index] ? `Commant Line : ${commant[index]}` : ""}</p> : ""
                }

                {outputItem.type === 'text' ? (
                  <motion.span variants={child} className="text">
                    {outputItem.content}
                  </motion.span>
                ) : (
                  outputItem?.content?.map((item, itemindex) => {
                    return (
                      <motion.span variants={child} className="text" key={itemindex}>
                        <span className=''>{item.key}: {item.value} </span>
                        <br />
                      </motion.span>
                    )
                  })


                )}

              </motion.p>
            )

          })
        }
        <span className='symbol'>
          <input className='input' type="text" name="" id="input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handdleInput}  />
        </span>

      </div>
    </div>

  )
}

export default App
