import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import Home from "@/pages/Home";
import Platform from "@/pages/Platform";
import Dashboard from "@/pages/Dashboard";
import Interno from "@/pages/Interno";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";
import NossoFoco from "@/pages/NossoFoco";
import Solucoes from "@/pages/Solucoes";
import Metodologia from "@/pages/Metodologia";
import QuemSomosPage from "@/pages/QuemSomos";
import { isAuthenticated, isInterno } from "./utils/auth";
import { ModalProvider } from "@/context/ModalContext";

function ProtectedClientRoute({ component: Component }: { component: () => JSX.Element }) {
  if (!isAuthenticated()) return <Redirect to="/login" />;
  if (isInterno()) return <Redirect to="/interno" />;
  return <Component />;
}

function ProtectedInternoRoute({ component: Component }: { component: () => JSX.Element }) {
  if (!isAuthenticated()) return <Redirect to="/login" />;
  if (!isInterno()) return <Redirect to="/dashboard" />;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/nosso-foco" component={NossoFoco} />
      <Route path="/solucoes" component={Solucoes} />
      <Route path="/metodologia" component={Metodologia} />
      <Route path="/quem-somos" component={QuemSomosPage} />
      <Route path="/plataforma" component={Platform} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard">
        {() => <ProtectedClientRoute component={Dashboard} />}
      </Route>
      <Route path="/dashboard/:section">
        {() => <ProtectedClientRoute component={Dashboard} />}
      </Route>
      <Route path="/interno">
        {() => <ProtectedInternoRoute component={Interno} />}
      </Route>
      <Route path="/interno/:section">
        {() => <ProtectedInternoRoute component={Interno} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <ModalProvider>
        <Router />
      </ModalProvider>
    </WouterRouter>
  );
}

export default App;
