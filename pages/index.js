import Head from "next/head";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/dracula.css";

export default function Home() {
  const supportedLangs = [
    "awk",
    "bash",
    "brainfuck",
    "c",
    "cpp",
    "clojure",
    "crystal",
    "csharp",
    "d",
    "dash",
    "deno",
    "elixir",
    "emacs",
    "elisp",
    "go",
    "haskell",
    "java",
    "jelly",
    "julia",
    "kotlin",
    "lisp",
    "lolcode",
    "lua",
    "nasm",
    "nasm64",
    "nim",
    "node",
    "osabie",
    "paradoc",
    "perl",
    "php",
    "python2",
    "python3",
    "ruby",
    "rust",
    "scala",
    "swift",
    "typescript",
    "zig",
  ];
  function execute(event) {
    event.preventDefault();
    const input = event.target.name.value;
    const code = event.target.code.value;
    const highlightCode = hljs.highlightAuto(code).value;
    document.getElementById("inputSection").innerHTML =
      '<pre><code class="hljs rounded">' + highlightCode + "</code></pre>";
    axios
      .post("https://emkc.org/api/v1/piston/execute", {
        language: input,
        source: code,
      })
      .then((res) => {
        document.getElementById("outputSection").innerHTML =
          '<code class="hljs language-bash rounded">' +
          res.data.output +
          "</code>";
        1;
      })
      .catch((err) => {
        console.log(err);
        alert("Please try again.");
      });
  }
  return (
    <div>
      <Head>
        <title>ExecutorX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative flex items-top justify-center min-h-screen bg-gray-900 sm:items-center sm:pt-0">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="mt-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <form
                onSubmit={execute}
                className="p-6 flex flex-col justify-center"
                id="contactForm"
              >
                <div className="flex flex-col">
                  <label className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-300">
                    Programming Language
                  </label>
                  <select
                    id="name"
                    className="form-select w-100 mt-2 py-3 px-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 font-semibold focus:border-indigo-500 focus:outline-none"
                    required
                  >
                    {supportedLangs.map(function (item) {
                      return <option key={item}>{item}</option>;
                    })}
                  </select>
                </div>

                <div className="flex flex-col mt-2">
                  <label className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-300">
                    Code
                  </label>
                  <textarea
                    name="code"
                    id="code"
                    spellCheck="false"
                    rows="10"
                    cols="40"
                    placeholder="Code"
                    className="form-textarea w-100 mt-2 py-3 px-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 font-semibold focus:border-indigo-500 focus:outline-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
                >
                  Submit
                </button>
              </form>
              <div className="p-6 mr-2 bg-gray-100 bg-gray-800 sm:rounded-lg">
                <h1 className="text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
                  Input:
                </h1>
                <div id="inputSection" className="rounded mt-2"></div>
                <h1 className="text-3xl sm:text-4xl text-white font-extrabold tracking-tight mt-8">
                  Output:
                </h1>
                <pre className="rounded mt-2" id="outputSection"></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
