import { gql } from "@apollo/client";

export const GET_HOT_LOCATIONS = gql`
  query getHotLocations {
    hotAttractions {
      id
      name
      introduction
      open_time
      distric
      address
      tel
      email
      official_site
      facebook
      remind
      category {
        name
      }
      images {
        src
      }
    }
  }
`;

export const GET_LATEST_NEWS = gql`
  query getLatestNews {
    latestNews {
      id
      title
      description
      posted
      modified
      url
    }
  }
`;
