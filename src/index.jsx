import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <RecoilRoot>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </RecoilRoot>
);
