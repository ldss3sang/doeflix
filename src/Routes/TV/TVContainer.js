import React from "react";
import TVPresenter from "./TVPresenter";
import { TVApi } from "api";

export default class extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    try {
      const {
        data: { results: topRated }
      } = await TVApi.topRated();
      const {
        data: { results: popular }
      } = await TVApi.popular();
      const {
        data: { results: airingToday }
      } = await TVApi.airingToday();
      this.setState({ topRated, popular, airingToday });
    } catch {
      this.setState({ error: "Can't find TV show information." });
    } finally {
      this.setState({ loading: false });
    }
  }
  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <TVPresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
