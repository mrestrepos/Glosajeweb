import views from "./views.js";
import {
  currentFileName
} from "../../helpers/navigation.js";
import useSignalJs from "../../helpers/useSignalJs.js";

const currentFile = views[currentFileName()]
export const importedData = useSignalJs({})

if (currentFile) {
  import(`./${currentFile}/index.js`).then(data => {
    importedData.current = data?.default()
  })
}

export default function reducer({
  type,
  ...props
}) {

  const exec = importedData.current[type];

  if (!exec || typeof exec !== "function") return

  exec(props)

};