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
                  if(searchDistric===item){
                    setSearchDistric('');
                  }else{
                    setSearchDistric(item);
                  };
                  
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
    </PageWrapper>
  );
};

export default Attractions;

const SearchContainer = styled.div`
  max-width: 1080px;
  padding: 30px;
  margin: 0 auto;
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
