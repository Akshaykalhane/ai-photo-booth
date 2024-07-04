import { motion } from "framer-motion";

const animation={
    initial:{opacity:0,x:100},
  animate:{opacity:1,x:0},
  exit:{opacity:0,x:-100}
}

function Transition({children,...props}) {
    console.log(props)
    return (
      <motion.div
        variants={animation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{duration:1}}
      >
        {children}
      </motion.div>
    )
  }
  
export default Transition