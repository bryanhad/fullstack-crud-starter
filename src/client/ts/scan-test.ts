import { BrowserMultiFormatReader } from "@zxing/browser";

const video = document.getElementById("video") as HTMLVideoElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

const reader = new BrowserMultiFormatReader();

reader.decodeFromVideoDevice(undefined, video, (result, err) => {
   console.log("me fired!");
   console.log(err);
   if (!err && result) {
      resultDiv.innerText = `Scanned: ${result.getText()}`;
   }
});
