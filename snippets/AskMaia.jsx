export const AskMaia = ({ questions = [], answer }) => (
  <div
    className="
      relative
      rounded-lg
      !p-5
      !my-5
      bg-[#f7f7f9]
      dark:bg-[#1a1b26]
      border-l-4
      border-[color:var(--yuno-blue)]
    "
  >
    <div className="flex items-center gap-2 mb-3 text-[color:var(--yuno-blue)] font-semibold text-xs tracking-wide uppercase">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-4 h-4 shrink-0">
        <path d="M216,48H40A16,16,0,0,0,24,64V224a15.87,15.87,0,0,0,8.20,13.87A16,16,0,0,0,40,240a15.86,15.86,0,0,0,10.20-3.73l.15-.13L83.9,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48Zm0,144H83.9a16,16,0,0,0-10.20,3.73l-.15.13L40,224V64H216Z" />
      </svg>
      <span>Ask Maia</span>
    </div>

    <div className="flex flex-col gap-2 italic text-[0.95rem]">
      {questions.map((q, i) => (
        <p key={i} className="m-0">
          &ldquo;{q}&rdquo;
        </p>
      ))}
    </div>

    <hr className="my-4 border-t border-dotted border-[color:var(--yuno-blue)] opacity-30" />

    <p className="m-0 text-[0.95rem]">
      <span className="font-semibold text-[color:var(--yuno-blue)]">Maia: </span>
      {answer}
    </p>
  </div>
);
