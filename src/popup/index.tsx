import React from 'react';
import './popup.css';
import { DOMMessage, DOMMessageResponse } from '../types';

export default function Popup() {
  const [title, setTitle] = React.useState('');
  const [headlines, setHeadlines] = React.useState<string[]>([]);

  React.useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      /**
       * Sends a single message to the content script(s) in the specified tab,
       * with an optional callback to run when a response is sent back.
       *
       * The runtime.onMessage event is fired in each content script running
       * in the specified tab for the current extension.
       */
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'GET_DOM' } as DOMMessage,
        (response: DOMMessageResponse) => {
          setTitle(response.title);
          setHeadlines(response.headlines);
        });
    });
  });

  return (
    <div className="App">
      <h1>Browser Extension</h1>
      <div className="Card">
        <div className="CardField">
          <div className="FieldLabel">
            <span className="FieldTitle">Title</span>
            <span className={`FieldStatus ${title.length < 30 || title.length > 65 ? 'Error' : 'Ok'}`}>
              {`${title.length} characters`}
            </span>
          </div>
          <div className="FieldDescription">
            {title}
          </div>
        </div>

        <div className="CardField">
          <div className="FieldLabel">
            <span className="FieldTitle">Main Heading</span>
            <span className={`FieldStatus ${headlines.length !== 1 ? 'Error' : 'Ok'}`}>
              {headlines.length}
            </span>
          </div>
          <div className="FieldDescription">
            {headlines.map((headline, index) => (<div key={index}>{headline}</div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
