import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SearchResultPage from "./pages/SearchResultPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import StandardDetailPage from "./pages/StandardDetailPage";
import ChatBotPage from './pages/ChatBotPage'
import { QueryClient, QueryClientProvider } from 'react-query';

import { ChatProvider } from "./contexts/ChatContext";
import { SearchProvider } from "./contexts/SearchContext";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
    mutations: {},
  },
});

const AppContent = () => {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

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
        title = "Home Page";
        metaDescription = "";
        break;
      case "/searchpage":
        title = "Search Page";
        metaDescription = "Search for standards and information.";
        break;
      case "/searchresultpage":
        title = "Search Results";
        metaDescription = "View search results for standards.";
        break;
      case "/profilepage":
        title = "Profile Page";
        metaDescription = "View and edit your profile information.";
        break;
      case "/loginpage":
        title = "Login Page";
        metaDescription = "Login to access your account.";
        break;
      case "/standarddetailpage":
        title = "Standard Details";
        metaDescription = "View details about a specific standard.";
        break;
      case "/chatbotpage":
        title = "Chat Bot";
        metaDescription = "Interact with our chat bot for assistance.";
        break;
      default:
        title = "My App";
        metaDescription = "Welcome to my application.";
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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/searchpage" element={<SearchPage />} />
      <Route path="/searchresultpage" element={<SearchResultPage />} />
      <Route path="/searchpage/searchresultpage" element={<SearchResultPage />} />
      <Route path="/profilepage" element={<ProfilePage />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/searchpage/searchresultpage/standarddetailpage" element={<StandardDetailPage />} />
      <Route path="/searchpage/chatbotpage" element={<ChatBotPage />} />
      <Route path="/chatbotpage" element={<ChatBotPage />} />
      <Route path="/searchpage/chatbotpage/standarddetailpage" element={<StandardDetailPage />} />
      <Route path="/chatbotpage/standarddetailpage" element={<StandardDetailPage />} />
    </Routes>
  );
};

function App() {
  return (
    <SearchProvider>
      <ChatProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </ChatProvider>
    </SearchProvider>
  );
}

export default App;
