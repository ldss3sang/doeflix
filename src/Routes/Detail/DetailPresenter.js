import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
`;

const Cover = styled.div`
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  width: 30%;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;
const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;
const IMDBLink = styled.a`
  background-color: #e8b708;
  font-family: "Verdana", Arial, sans-serif;
  font-weight: 600;
  color: black;
  padding: 5px;
  border-radius: 5px;
`;

const Extra = styled.div`
  opacity: 0.7;
  width: 100%;
  height: 100%;
  margin-top: 10px;
`;

const TabList = styled.ul`
  display: flex;
  flex-direction: row;
`;

const TabItem = styled.li`
  background-color: grey;
  padding: 10px;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
`;

const TabInfo = styled.div`
  display: flex;
  flex-direction: row;
  background-color: grey;
  padding: 10px;
  width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
  text-align: center;
  height: 380px;
`;

const Video = styled.iframe`
  margin: 10px;
  height: -webkit-fill-available;
`;

const VideoContainer = styled.div`
  width: 100%;
  margin: 20px;
`;

const ImageCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  width: 100%;
  margin: 10px;
`;
const ImageContainer = styled.div`
  width: 200px;
  height: -webkit-fill-available;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CompanyImageContainer = styled.div`
  width: 200px;
  height: 100px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageName = styled.div`
  width: 220px;
`;

const Production = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductionItem = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductionTitle = styled.div`
  margin: 5px 20px;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
`;

const CountryName = styled.div`
  margin: 0px 20px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  width: min-content;
`;

const DetailPresenter = ({ result, loading, error }) => {
  const [tab, setTab] = useState("video");
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Doeflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Doeflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      ></Backdrop>
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id && (
              <>
                <Divider>•</Divider>
                <Item>
                  <IMDBLink
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                    target="_blank"
                  >
                    IMDb
                  </IMDBLink>
                </Item>
              </>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <Extra>
            <TabList>
              <TabItem onClick={() => setTab("video")} active={tab === "video"}>
                Video
              </TabItem>
              <TabItem
                onClick={() => setTab("production")}
                active={tab === "production"}
              >
                Production
              </TabItem>
              {result.seasons && (
                <TabItem
                  onClick={() => setTab("seasons")}
                  active={tab === "seasons"}
                >
                  Seasons
                </TabItem>
              )}
            </TabList>
            <TabInfo>
              {tab === "video" &&
                result.videos.results.map((video) => (
                  <VideoContainer>
                    <Video
                      key={video.id}
                      title={video.name}
                      src={`https://www.youtube.com/embed/${video.key}`}
                    ></Video>
                  </VideoContainer>
                ))}
              {tab === "production" && (
                <Production>
                  {result.production_companies &&
                    result.production_companies.length > 0 && (
                      <>
                        <ProductionTitle>Companies:</ProductionTitle>
                        <ProductionItem>
                          {result.production_companies.map((company) => (
                            <ImageCard>
                              <CompanyImageContainer>
                                <Image
                                  src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                                  alt={company.name}
                                  onError={(event) =>
                                    (event.currentTarget.src =
                                      "https://dummyimage.com/600x400/000/ffffff.png&text=Image+Not+Found")
                                  }
                                />
                              </CompanyImageContainer>
                              <ImageName>{company.name}</ImageName>
                            </ImageCard>
                          ))}
                        </ProductionItem>
                      </>
                    )}
                  {result.production_countries &&
                    result.production_countries.length > 0 && (
                      <>
                        <ProductionTitle>Countries:</ProductionTitle>
                        <ProductionItem>
                          {result.production_countries.map((country) => (
                            <CountryName>
                              <div>
                                <img
                                  src={`https://www.countryflags.io/${country.iso_3166_1}/shiny/64.png`}
                                  alt={country.name}
                                />
                              </div>
                              {country.name}
                            </CountryName>
                          ))}
                        </ProductionItem>
                      </>
                    )}
                </Production>
              )}
              {tab === "seasons" &&
                result.seasons.map((season) => (
                  <ImageCard>
                    <ImageContainer>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                        alt={season.name}
                        onError={(event) =>
                          (event.currentTarget.src =
                            "https://dummyimage.com/600x400/000/ffffff.png&text=Image+Not+Found")
                        }
                      />
                    </ImageContainer>
                    <ImageName>{season.name}</ImageName>
                  </ImageCard>
                ))}
            </TabInfo>
          </Extra>
        </Data>
      </Content>
    </Container>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
