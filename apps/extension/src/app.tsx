import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  ClerkProvider,
} from "@clerk/chrome-extension";
import { useNavigate, Routes, Route, MemoryRouter } from "react-router-dom";

let REACT_APP_CLERK_PUBLISHABLE_KEY =
  "pk_test_bmV4dC1nYXJmaXNoLTQ2LmNsZXJrLmFjY291bnRzLmRldiQ";

function HelloUser() {
  return <p> Hello user</p>;
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <div className="w-[600px] h-[600px]">
      <ClerkProvider
        publishableKey={REACT_APP_CLERK_PUBLISHABLE_KEY}
        navigate={(to) => navigate(to)}
        syncSessionWithTab
      >
        <Routes>
          <Route path="/sign-up/*" element={<SignUp signInUrl="/" />} />
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <HelloUser />
                </SignedIn>
                <SignedOut>
                  <SignIn afterSignInUrl="/" signUpUrl="/sign-up" />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </ClerkProvider>
    </div>
  );
}

function App() {
  return (
    <MemoryRouter>
      <ClerkProviderWithRoutes />
    </MemoryRouter>
  );
}

export default App;
