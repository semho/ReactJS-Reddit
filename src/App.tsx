import React from "react";
import "./main.global.css";
import { hot } from "react-hot-loader/root";
import { Layout } from "./shared/Layout";
import { Header } from "./shared/Header/Header";
import { Content } from "./shared/Content";
import { useToken } from "./hooks/useToken";
import { PostsContextProvider } from "./shared/context/postsContext";
import { PostsList } from "./shared/Content/PostsList";
import { Action, applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer, RootState, setToken} from "./shared/store/store";
import thunk, { ThunkAction } from "redux-thunk";
import { useAppDispatch } from "./hooks/hooks";

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

function AppComponent() {

  const dispatch = useAppDispatch();
  const saveToken = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
    const [token] = useToken();
    dispatch(setToken(token));
  }

  dispatch(saveToken());

  return (
    <Layout>
      <Header/>
      <Content>
        <PostsList />
      </Content>
    </Layout>
  );
}

export const App = hot(() =>
  <Provider store={store}>
    <AppComponent />
  </Provider>
);
