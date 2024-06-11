import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import SearchResultPage from "./pages/SearchResultPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import StandardDetailPage from "./pages/StandardDetailPage";
import ChatBotPage from './pages/ChatBotPage'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChatProvider } from "./contexts/ChatContext";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  const client = new QueryClient({defaultOptions : {
    queries : {refetchOnWindowFocus : false},
    mutations : {}
  }})

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/searchresultpage":
        title = "";
        metaDescription = "";
        break;
      case "/profilepage":
        title = "";
        metaDescription = "";
        break;
      case "/loginpage":
        title = "";
        metaDescription = "";
        break;
      case "/standarddetailpage":
        title = "";
        metaDescription = "";
        break;
      case "/chatbotpage":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <ChatProvider>
      <QueryClientProvider client={client}>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/searchresultpage" element={<SearchResultPage />} />
          <Route path="/searchpage/searchresultpage" element={<SearchResultPage />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/searchresultpage/standarddetailpage" element={<StandardDetailPage />} />
          <Route path="/searchpage/chatbotpage" element={<ChatBotPage />} />
          <Route path="/chatbotpage" element={<ChatBotPage />} />
          <Route path="/searchpage/chatbotpage/standarddetailpage" element={<StandardDetailPage />} />
          <Route path="/chatbotpage/standarddetailpage" element={<StandardDetailPage />} />
        </Routes>
      </QueryClientProvider>
    </ChatProvider>
  );
}
export default App;
