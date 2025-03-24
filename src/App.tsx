import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.scss";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Remy</Title>
          <div class="container">
            <nav>
              <ul>
                <li>
                  <strong>
                    <a href="/">
                      <h1>Remy</h1>
                    </a>
                  </strong>
                </li>
              </ul>
            </nav>
            <Suspense>{props.children}</Suspense>
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
