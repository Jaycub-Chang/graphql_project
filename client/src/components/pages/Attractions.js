import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "../../schema/schema";
import { PageWrapper } from "./Home";

const taipeiDistric = [
  "中正區",
  "大同區",
  "中山區",
  "松山區",
  "大安區",
  "萬華區",
  "信義區",
  "士林區",
  "北投區",
  "內湖區",
  "南港區",
  "文山區",
];

const attractionCategory = [
  "養生溫泉",
  "單車遊蹤",
  "歷史建築",
  "宗教信仰",
  "藝文館所",
  "公共藝術",
  "戶外踏青",
  "藍色水路",
  "親子共遊",
  "北北基景點",
  "夜市商圈",
  "主題街景",
  "無障礙旅遊推薦景點",
];

const Attractions = () => {
  const [searchNameValue, setSearchNameValue] = useState("");
  const [searchCategory, setSearchCategory] = useState([]);
  const [searchDistric, setSearchDistric] = useState("");
  const { data } = useQuery(GET_LOCATIONS, {
    variables: {
      name: searchNameValue,
      category: searchCategory,
      distric: searchDistric,
    },
  });
  console.log(data?.attractions);
  return (
    <PageWrapper>
      <SearchContainer>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="輸入景點名稱 !  即時搜尋。"
            onChange={(e) => {
              setSearchNameValue(e.target.value);
            }}
          />
        </InputGroup>
        <DistricSearchTitle>以一個行政區篩選：</DistricSearchTitle>
        <BtnWrapper>
          {taipeiDistric.map((item, index) => {
            return (
              <Button
                key={`${index}${item}`}
                variant={searchDistric === item ? "success" : "secondary"}
                style={{ minWidth: "130px", margin: "10px 10px" }}
                onClick={() => {
                  if (searchDistric === item) {
                    setSearchDistric("");
                  } else {
                    setSearchDistric(item);
                  }
                }}
              >
                {item}
              </Button>
            );
          })}
        </BtnWrapper>
        <DistricSearchTitle>以多個類別篩選：</DistricSearchTitle>
        <BtnWrapper>
          {attractionCategory.map((item, index) => {
            return (
              <Button
                key={`${index}${item}`}
                variant={
                  searchCategory.includes(item) ? "success" : "secondary"
                }
                style={{ minWidth: "120px", margin: "10px 10px" }}
                onClick={() => {
                  let newCateFilter = [...searchCategory];
                  if (newCateFilter.indexOf(item) === -1) {
                    newCateFilter.push(item);
                  } else {
                    newCateFilter = newCateFilter.filter(
                      (cate) => cate !== item
                    );
                  }
                  setSearchCategory(newCateFilter);
                  console.log(newCateFilter);
                }}
              >
                {item}
              </Button>
            );
          })}
        </BtnWrapper>
      </SearchContainer>
      <AttractionsContainer>
        {data?.attractions.length ? (
          data?.attractions.map((item, index) => {
            return (
              <Card key={`${item.name}${index}`}>
                <CardImgWrapper>
                  <CardImg
                    src={
                      item?.images[0]?.src ??
                      "https://epaper.gov.taipei/images/photo_default.png"
                    }
                  />
                </CardImgWrapper>
                <CardName>{item.name}</CardName>
                <CardText>{`地址：${item?.address}`}</CardText>
                <CategoryTagArea>
                  {item.category.map((cate, index) => {
                    return (
                      <CategoryTag key={`${cate.name}${index}`}>
                        {cate.name}
                      </CategoryTag>
                    );
                  })}
                </CategoryTagArea>
              </Card>
            );
          })
        ) : (
          <NoMatchText>目前搜尋條件無符合項目</NoMatchText>
        )}
      </AttractionsContainer>
    </PageWrapper>
  );
};

export default Attractions;

const SearchContainer = styled.div`
  max-width: 1080px;
  padding: 30px;
  margin: 0 auto;
  border-bottom: 2px solid #fff;
`;

const DistricSearchTitle = styled.div`
  margin-top: 25px;
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.text_light};
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

const AttractionsContainer = styled.div`
  max-width: 1080px;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: start;
  margin: 0 auto;
`;

const Card = styled.div`
  cursor: pointer;
  margin: 15px 5px;
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;
  color: ${(props) => props.theme.secondary};
  transition: 0.3s;
  :hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 3px 3px ${(props) => props.theme.primary};
  }
`;

const CardImgWrapper = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  box-shadow: 0 1px 1px 1px #bbb;
  position: relative;
  z-index: 10;
`;

const CardImg = styled.img`
  object-fit: cover;
  width: 100%;
`;

const CardName = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
`;

const CardText = styled.div`
  font-size: 16px;
  line-height: 1.5;
  padding: 0 20px 20px 20px;
`;

const CategoryTagArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  padding: 0 20px 0 20px;
  min-height: 80px;
`;

const CategoryTag = styled.div`
  background-color: ${(props) => props.theme.danger};
  color: #fff;
  padding: 5px;
  margin: 0 10px 10px 0;
  border-radius: 5px;
  font-size: 12px;
`;

const NoMatchText = styled.div`
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
  font-size: 32px;
`;
