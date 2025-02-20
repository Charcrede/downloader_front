// pages/index.js
"use client"
import { useState, useEffect } from "react";
import Image from "next/image";


export default function Home() {
  const [itag, setItag] = useState<{ resolution: "", itag: "" }>({ resolution: "", itag: "" });
  const [link, setLink] = useState("");
  const [showLoad, setShowLoad] = useState(false)
  const [streams, setStreams] = useState<{formats : [{resolution : "", format_id : ""}], title : "", thumbnail : ""}>()
  const [showList, setShowList] = useState(false)
  const [loading, setLoading] = useState(false)
  // Fonction pour coller le contenu du presse-papiers

  // Fonction pour valider une URL
  const isValidURL = (url: string): boolean => {

    const urlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}([&?][^\s]*)?$/;

    return urlRegex.test(url);
  };

  // Vérification du lien à chaque changement
  useEffect(() => {
    if (isValidURL(link)) {
      setShowLoad(true)

      // Envoyer une requête au backend
      const sendLinkToBackend = async () => {
        try {
          const response = await fetch("https://youthful-kizzie-gool-b1c1af74.koyeb.app/api/streams/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: link }),
          });

          const data = await response.json();
          setStreams(data)
          if (data.formats.length - 2) {
            setItag({ resolution: data.formats[data.formats.length - 2].resolution, itag: data.formats[data.formats.length - 2].format_id })
          } else {
            setItag({ resolution: data.formats[data.formats.length - 1].resolution, itag: data.formats[data.formats.length - 1].format_id })
          }
          setShowLoad(false)

        } catch (error) {
          console.error("Erreur lors de l'envoi au backend :", error);
          setShowLoad(false)
        }
      };

      sendLinkToBackend();
    } else {
    }
  }, [link]);


  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://youthful-kizzie-gool-b1c1af74.koyeb.app/api/download/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: link, format_id: itag.itag, title: streams?.title + '.mp4' }),
      });

      // const data = await response.json();
      // const ws = new WebSocket("ws://localhost:8000/ws/download_progress/");

      // ws.onmessage = (event) => {
      //   const data = JSON.parse(event.data);
      //   console.log("Progress:", data.progress); // Affiche la progression
      // };

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.startsWith('video')) {
        // Si la réponse est une vidéo, traiter différemment
        const blob = await response.blob();
        const videoUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = videoUrl;
        a.download = streams?.title + '.mp4';
        a.click();
        setLoading(false)
      }

      // setStreams(data)
      // if (data.streams.length -2 ) {
      //   setItag({resolution : data.streams[data.streams.length-2].resolution, itag : data.streams[data.streams.length-2].itag})
      // }else{
      //   setItag({resolution : data.streams[data.streams.length-1].resolution, itag : data.streams[data.streams.length-1].itag})
      // }
      // setShowLoad(false)
    } catch (error) {
      console.error("Erreur lors de l'envoi au backend :", error);
      setShowLoad(false)
      setLoading(false)
    }
  };
  return (
    <>
      <div className=" font-clash lg:px-56 xs:px-8 relative">
        {/* <CustomCursor></CustomCursor> */}
        {/* <HamburgerToggle></HamburgerToggle> */}
        <Image src="/assets/Star-1.svg" alt="" className="absolute -top-0 left-0 -z-10 lg:w-48 lg:h-48 xs:w-24 xs:h-24 rotate" />
        <Image src="../assets/One-Forth-Ellipse.svg" alt="" className="absolute -top-0 left-3/4 -z-10  lg:w-24 lg:h-24 xs:w-16 xs:h-16 scale" />
        <Image src="../assets/Waves_2.svg" alt="" className="absolute top-1/2 right-0 -z-10 lg:w-48 lg:h-48 xs:w-24 xs:h-24" />
        <Image src="../assets/Eye2.svg" alt="" className="absolute -bottom-3/4 left-1/2 -z-10  lg:w-24 lg:h-24 xs:w-16 xs:h-16 bounce" />
        <h1 className="mb-4 font-clash lg:text-[5rem] xs:text-[2rem] font-semibold mt-8"><span
          className="font-normal block lg:text-[3rem] xs:text-[1.5rem]">Bienvenu sur </span><span className="text-red-600">YT</span> Downloader</h1>
        <form className="lg:text-3xl xs:text-xl italic float-right lg:mt-4 xs:-mt-4 w-full">
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "auto", padding: "20px" }}>
            <label htmlFor="link" style={{ fontSize: "16px", fontWeight: "bold" }}>
              Entrez un lien :
            </label>
            <div className="relative">

              <input
                id="link"
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Collez votre lien ici..."
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                className="w-full"
              />
              {showLoad && (

                <div className="load absolute top-2  bottom-0 right-1 h-1 w-1    ">
                </div>
              )}
            </div>
          </div>

        </form>
        {streams && (
          <div className="bg-white p-8 rounded-2xl flex gap-8">
            <div className="w-1/2">
              <Image src={streams.thumbnail} alt="image de la musique" className="w-full rounded-2xl" />
            </div>
            <div>
              <div className="flex gap-4 items-center">
                <span className="px-4 py-2 text-red-600 border border-red-600 rounded-full">video</span>
                <div className="relative">
                  <button onClick={() => { setShowList(!showList) }} className="px-4 py-2 text-red-600 border border-red-600 rounded-full">MP4 ( {itag.resolution} )</button>
                  <ul className={`${!showList ? "h-0" : "h-auto p-2"} absolute bg-[#f0f0f0] z-20 top-12 -left-4 -right-4 overflow-hidden duration-300 rounded-xl`}>
                    {streams.formats.map((el: {resolution : "", format_id : ""}, i: number) => (
                      <li key={i} className="p-1 hover:bg-[#e0e0e0]"><button className="hover:bg-[#e0e0e0]" onClick={() => { setItag({ resolution: el.resolution, itag: el.format_id }); setShowList(false) }}>MP4 ( {el.resolution} )</button></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="font-semibold font-clash text-3xl my-4">{streams.title}</div>
              <div className=""><span className="text-red-600">URL :</span> {link}</div>
              <button onClick={() => { handleSubmit() }}
                className="bg-red-600 text-center px-1 w-full rounded-2xl h-14 relative text-black text-xl group mt-8"
                type="button"
              >
                <div
                  className="bg-white rounded-xl h-12 w-1/4 flex items-center justify-center absolute top-[4px] group-hover:w-[98%] z-10 duration-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={25} height={25} fill="#dc2626"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg>
                </div>
                <p className="translate-x-2 text-white ml-8">Télécharger</p>
              </button>

            </div>
          </div>
        )}
      </div>
      <div className="lg:mt-64 xs:mt-32 lg:px-56 xs:px-8 relative">
        <Image src="../assets/Star-1.svg" alt="" className="absolute lg:-bottom-0 xs:-bottom-1/4 left-1/4 -z-10  lg:w-24 lg:h-24 xs:w-16 xs:h-16 scale" />
        <Image src="../assets/Half-Shape_2_inverted.svg" alt="" className="absolute lg:-top-0 xs:top-1/2 right-1/4 -z-10  lg:w-24 lg:h-24 xs:w-16 xs:h-16 scale" />
      </div>
      {loading && (

        <div className="loader absolute items-center justify-center top-0 bottom-0 left-0 right-0 backdrop-blur-sm z-20">
          <div className="load1"></div>
          <div className="load2"></div>
          <div className="load3"></div>
          <div className="load4"></div>
          <div className="load5"></div>
          <div className="load6"></div>
          <div className="load7"></div>
          <div className="load8"></div>
          <div className="load9"></div>
          <p className=" bg-white p-4 rounded-2xl bg-opacity-50 backdrup-blur-sm mt-64 font-bol font-clash text-2xl text-[#0f0f0f] text-3xl font-bold">Téléchargement en cours, veuillez patienter (gardez la fenêtre ouverte)</p>
        </div>

      )}
    </>
  );
}

// pages/api/download.js

// import ytdl from "ytdl-core";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { url } = req.body;

//     if (!ytdl.validateURL(url)) {
//       return res.status(400).json({ error: "Invalid YouTube URL" });
//     }

//     try {
//       const info = await ytdl.getInfo(url);
//       const format = ytdl.chooseFormat(info.formats, {
//         quality: "highest",
//       });

//       return res.status(200).json({ downloadUrl: format.url });
//     } catch (error) {
//       return res.status(500).json({ error: "Failed to process the video." });
//     }
//   }

//   res.setHeader("Allow", ["POST"]);
//   res.status(405).end(`Method ${req.method} Not Allowed`);
// }
