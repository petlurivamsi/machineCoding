import { useEffect, useState } from 'react'
import './App.css'

//webpack (treeshacking, plugins, bundleanalyzer, postcss, entrypoint, terser )
//typescript
//Microfrontend
//

import pako from "pako";

const CompressedResponseHandler = ({ response }) => {
    const [decompressedData, setDecompressedData] = useState("");

    const isBase64 = (str) => {
      try {
        return btoa(atob(str)) === str;
      } catch (err) {
        return false;
      }
    };


    useEffect(() => {
      if (
        response?.data?.contentEncoding === "gzip" &&
        isBase64(response.data.string)
      ) {
          try {

          // Decode Base64 to Uint8Array
              const compressedData = base64ToUint8Array(response.data.string);



          // Decompress using pako
              const decompressed = pako.inflate(compressedData, { to: "string" });
               console.log("decompressed", decompressed);

          setDecompressedData(decompressed);
        } catch (error) {
          console.error("Error decompressing response:", error);
          setDecompressedData("Failed to decompress data.");
        }
      } else {
        setDecompressedData(response?.data?.string || "No compressed data");
      }
    }, [response]);

    const base64ToUint8Array = (base64) => {
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    };

  return (
    <div>
      <h3>Decompressed Response</h3>
      <pre>{decompressedData}</pre>
    </div>
  );
};

// Example Usage
const response = {
  statusCode: 200,
  data: {
    contentEncoding: "gzip",
    string:
      "elephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephantelephant"
  },
  message: "Response compressed with gzip",
  success: true,
};

function App() {
    const [apiData, setApiData] = useState({});
    const [uploadImage, setUploadImage] = useState({});

    const formData = new FormData();
    formData.append("image", uploadImage);

    const fetchData = async () => {
        const res = await fetch(
          "http://localhost:8000/api/users/posts/getPost/1",
          {
            method: "get",
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJpYXQiOjE3MzkzMDI2MDYsImV4cCI6MTczOTMyMDYwNn0.wrCipSCyG3vQLP0PbJTxG0CBSEUnPbeSJLuMCKHty8k",
            },
            //body: formData,
          }
        );
        console.log(res.headers.get('Content-Encoding'))

        const data = await res.json();
        console.log("data", data);
        if (data) {
            setApiData(data);
        }
    }


    useEffect(() => {
        if (uploadImage) fetchData();
    }, [uploadImage]);

    apiData && console.log("file upload", uploadImage);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        console.log("file", file);
        if (file) {
            setUploadImage(e.target.files[0]);
        }
    }
console.log("apiData", apiData);

    return (
      <>
        {/* api testing
        <input type="file" onChange={handleFileUpload} />
        <img src={apiData.imageUrl} /> */}

            <div>
      <h2>Gzip Response Handler</h2>
      <CompressedResponseHandler response={response} />
    </div>

      </>
    );
}

export default App
