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

export const GET_LOCATIONS = gql`
  query getLocations($distric: String, $category: [String], $name: String) {
    attractions(distric: $distric, category: $category, name: $name) {
      id
      name
      introduction
      open_time
      distric
      address
      tel
      email
      fax
      official_site
      facebook
      ticket
      remind
      category {
        name
      }
      images {
        src
        ext
      }
    }
  }
`;

export const GET_LOCATION = gql`
  query getLocation($id: Int) {
    attraction(id: $id) {
      id
      name
      introduction
      open_time
      distric
      address
      tel
      email
      fax
      official_site
      facebook
      ticket
      remind
      category {
        name
      }
      images {
        src
        ext
      }
    }
  }
`;
