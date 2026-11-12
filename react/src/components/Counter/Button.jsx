import { COLOR_MAP } from "../../constants/colors";

export default function Button({ text, func, color }) {
  return (
      <>
          <button className={`font-mono border py-2 px-4 m-3 rounded transition-colors ${COLOR_MAP[color] || COLOR_MAP.labmem}`} onClick={() => func()} >
              {text}
          </button>
      </>
  );
};
