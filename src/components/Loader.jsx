import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0f1c26] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="flex flex-col items-center gap-4"
      >
        <img 
          src="/shivgroup/images/Logo.png" 
          alt="Shiv Group" 
          className="h-16 md:h-20 object-contain invert brightness-0" 
        />
        <div className="flex gap-2">
          <motion.div 
            className="w-3 h-3 bg-primary rounded-full" 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} 
          />
          <motion.div 
            className="w-3 h-3 bg-primary rounded-full" 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} 
          />
          <motion.div 
            className="w-3 h-3 bg-primary rounded-full" 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} 
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
