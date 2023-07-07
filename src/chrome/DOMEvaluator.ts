import { DOMMessage, DOMMessageResponse } from '../types';

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
  ) => {
    console.log('[content.js]. Message received', msg);
    const productElem = document.getElementById("productTitle") as HTMLElement | null;
    const descElem = document.querySelector("meta[name='description']") as HTMLMetaElement | null;
    const urlElem = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    const bylineElem = document.getElementById("bylineInfo") as HTMLElement | null;

    const thElems = Array.from(document.getElementsByTagName<"th">("th"));
    const asinElems = thElems.filter(el => el.textContent?.includes("ASIN"));
    const brandElems = thElems.filter(el => el.textContent?.includes("Brand Name"));
    const modelElems = thElems.filter(el => el.textContent?.includes("Model Info"));
    const itemElems = thElems.filter(el => el.textContent?.includes("Item model number"));
    const partElems = thElems.filter(el => el.textContent?.includes("Part Number"));

    const specThElems = Array.from(document.querySelectorAll("th.prodDetSectionEntry")).filter(el => !!el.textContent) as HTMLElement[];
    const specExclude = ["Customer Reviews", "Best Sellers Rank", "Date First Available"];
    const specElems = specThElems.filter(el => !specExclude.some(s => el.textContent?.includes(s)));

    const brandMatch = bylineElem?.innerText?.match(/Visit\sthe\s([\w|\s]+)\sStore/);

    const response: DOMMessageResponse = {
      title: (productElem !== null) ? productElem.innerText : document.title,
      description: (descElem !== null) ? descElem.content : "",
      url: (urlElem !== null) ? urlElem.href : "",
      brand: brandMatch && brandMatch[1] ? brandMatch[1].toLowerCase() : "",
      headlines: Array.from(document.getElementsByTagName<"h1">("h1")).map(h1 => h1.innerText),
      links: Array.from(document.getElementsByTagName<"a">("a")).map(el => el.href).filter(u => u.endsWith('.pdf')),
      asin: asinElems.map(el => (el.nextElementSibling as HTMLElement).innerText),
      brandName: brandElems.map(el => (el.nextElementSibling as HTMLElement).innerText),
      modelInfo: modelElems.map(el => (el.nextElementSibling as HTMLElement).innerText),
      itemModelNumber: itemElems.map(el => (el.nextElementSibling as HTMLElement).innerText),
      partNumber: partElems.map(el => (el.nextElementSibling as HTMLElement).innerText),
      specs: specElems.map(el => (el.nextElementSibling as HTMLElement).innerText.trim()),
    };

    console.log('[content.js]. Message response', response);

    sendResponse(response)
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
