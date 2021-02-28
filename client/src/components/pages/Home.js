import React from "react";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_HOT_LOCATIONS, GET_LATEST_NEWS } from "../../schema/schema";

const Home = () => {
  const { data: slideData } = useQuery(GET_HOT_LOCATIONS);
  const { data: newsData } = useQuery(GET_LATEST_NEWS);

  return (
    <PageWrapper>
      <CarouselWrapper>
        <Carousel>
          {slideData?.hotAttractions.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <SlideImgWrapper>
                  <SliderImg
                    src={item?.images[0]?.src}
                    onClick={() => {
                      window.open(item.official_site);
                    }}
                  />
                </SlideImgWrapper>
                <Carousel.Caption>
                  <SliderImgInfoWrapper>
                    <SliderImgName>{item.name}</SliderImgName>
                    <SliderImgDistrict>{item.distric}</SliderImgDistrict>
                  </SliderImgInfoWrapper>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </CarouselWrapper>
      <NewsWrapper>
        <SectionHeaderNews>最新消息</SectionHeaderNews>
        {newsData?.latestNews.map((item, index) => {
          if (index > 4) return null;
          return (
            <NewsItem key={index} onClick={()=>{window.open(item.url)}}>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsDate>{item.modified}</NewsDate>
            </NewsItem>
          );
        })}
      </NewsWrapper>
    </PageWrapper>
  );
};

export default Home;

export const PageWrapper = styled.div`
  min-height: 100vh;
`;

const CarouselWrapper = styled.div`
  .carousel-indicators {
    bottom: -10px;
  }
  .carousel-caption {
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    padding: 0;
  }
`;

const SlideImgWrapper = styled.div`
  width: 100%auto;
  min-height: 500px;
  overflow: hidden;
  position: relative;
`;

const SliderImg = styled.img`
  width: 100%;
  position: absolute;
  bottom: -50px;
  cursor: pointer;
`;

const SliderImgName = styled.div`
  font-size: 36px;
  font-weight: bolder;
  color: ${(props) => props.theme.primary};
`;

const SliderImgDistrict = styled.p`
  font-size: 20px;
`;

const SliderImgInfoWrapper = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
`;

const SectionHeaderNews = styled.div`
  font-weight: bolder;
  font-size: 32px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  padding: 10px 0;
  margin-bottom: 15px;
`;

const NewsWrapper = styled.div`
  padding: 20px 30px;
  max-width: 60%;
  margin: 0 auto;
`;

const NewsItem = styled.div`
  padding: 10px 25px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 15px 0;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const NewsTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
`;

const NewsDate = styled.div`
  margin-top: 15px;
`;
