import { Modal, Button, Carousel } from "react-bootstrap";
import { GET_LOCATION } from "../../schema/schema";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

const SingleAttractionModal = (props) => {
  const { handleClose, show, attractionId } = props;

  // hook
  const { data } = useQuery(GET_LOCATION, {
    variables: {
      id: attractionId,
    },
  });
  console.log(data);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>景點詳細介紹</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AttractionName>{data?.attraction?.name}</AttractionName>
          <CarouselWrapper>
            <Carousel>
              {data?.attraction?.images?.length ? (
                data?.attraction?.images.map((item, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <SlideImgWrapper>
                        <SliderImg src={item?.src} />
                      </SlideImgWrapper>
                    </Carousel.Item>
                  );
                })
              ) : (
                <Carousel.Item>
                  <SlideImgWrapper>
                    <SliderImg src="https://epaper.gov.taipei/images/photo_default.png" />
                  </SlideImgWrapper>
                </Carousel.Item>
              )}
            </Carousel>
          </CarouselWrapper>
          <InfoText>
            <SubTitle>地址：</SubTitle>
            {data?.attraction?.address}
          </InfoText>
          <InfoText>
            <SubTitle>電話：</SubTitle>
            {data?.attraction?.tel}
          </InfoText>
          <InfoText>
            <SubTitle>信箱：</SubTitle>
            {data?.attraction?.email}
          </InfoText>
          <InfoText>
            <SubTitle>註記：</SubTitle>
            {data?.attraction?.remind}
          </InfoText>
          <AttractionIntro>{data?.attraction?.introduction}</AttractionIntro>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
            style={{ borderRadius: "5px" }}
          >
            離開
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SingleAttractionModal;

const AttractionName = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`;

const AttractionIntro = styled.div`
  padding: 20px 60px;
`;

const SlideImgWrapper = styled.div`
  width: 100%auto;
  height: 300px;
  overflow: hidden;
  position: relative;
`;

const SliderImg = styled.img`
  width: 50%;
  position: absolute;
  cursor: pointer;
  left: 50%;
  transform: translate(-50%, 0);
`;

const CarouselWrapper = styled.div`
  padding: 20px 0;
  .carousel-indicators {
    bottom: -10px;
  }
`;

const SubTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const InfoText = styled.div`
  padding: 3px 60px;
`;
